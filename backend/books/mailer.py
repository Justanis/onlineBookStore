from django.conf import settings
from django.core.mail import EmailMessage


class SMTPMailer:
    def send_email(self, to, subject, body):
        if not settings.EMAIL_HOST_USER or not settings.DEFAULT_FROM_EMAIL:
            raise ValueError("Mail settings are not configured.")
        message = EmailMessage(subject, body, settings.DEFAULT_FROM_EMAIL, [to])
        message.send(fail_silently=False)
        return "Email sent successfully!"
