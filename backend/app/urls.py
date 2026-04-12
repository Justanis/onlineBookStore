from django.urls import path
from . import views

urlpatterns = [
    path("api/users", views.users_collection),
    path("api/users/", views.users_collection),
    path("api/users/<int:user_id>", views.users_detail),
    path("api/users/<int:user_id>/", views.users_detail),
    path("api/users/confirm", views.confirm_user),
    path("api/users/confirm/", views.confirm_user),
    path("api/login", views.login),
    path("api/login/", views.login),
]
