import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import User
from .mailer import SMTPMailer
from .utils import generate_confirmation_code


def get_request_data(request):
    try:
        return json.loads(request.body.decode("utf-8")) if request.body else {}
    except json.JSONDecodeError:
        return {}


@csrf_exempt
def users_collection(request):
    if request.method == "GET":
        users = User.objects.all()
        return JsonResponse([user.to_dict() for user in users], safe=False)

    if request.method == "POST":
        user_data = get_request_data(request)
        if User.validate_user_data(user_data):
            confirmation_code = generate_confirmation_code()
            new_user = User.objects.create(
                name=user_data["name"],
                email=user_data["email"],
                password=user_data["password"],
                confirmationCode=confirmation_code,
            )
            SMTPMailer().send_email(
                to=user_data["email"],
                subject="Confirmation Code",
                body=f"Confirmation Code is {confirmation_code}",
            )
            return JsonResponse({"status": 200, "user": new_user.to_dict()})
        return JsonResponse({"status": 401, "error": "Invalid Informations"}, status=401)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def users_detail(request, user_id):
    user = get_object_or_404(User, pk=user_id)

    if request.method == "GET":
        return JsonResponse(user.to_dict())

    if request.method == "PUT":
        data = get_request_data(request)
        if "name" in data:
            user.name = data["name"]
        if "email" in data:
            user.email = data["email"]
        user.save()
        return JsonResponse(user.to_dict())

    if request.method == "DELETE":
        user.delete()
        return JsonResponse({"message": "User deleted"}, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def confirm_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    data = get_request_data(request)
    if "email" not in data or "code" not in data:
        return JsonResponse({"error": "Missing email or code"}, status=400)
    try:
        user = User.objects.get(email=data["email"])
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    if user.confirmationCode == data["code"]:
        user.isConfirmed = True
        user.save()
        return JsonResponse({"message": "User has been Confirmed thank you !"})
    return JsonResponse({"error": "Provided Code is not correct please check your email"}, status=400)


@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    data = get_request_data(request)
    try:
        user = User.objects.get(email=data.get("email", ""))
    except User.DoesNotExist:
        return JsonResponse({"status": 401, "error": "Invalid Informations"}, status=401)
    if data.get("password") == user.password:
        return JsonResponse({"status": 200, "user": user.to_dict()})
    return JsonResponse({"status": 401, "error": "Invalid Informations"}, status=401)
