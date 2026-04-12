import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-secret-key")
DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.staticfiles",
    "corsheaders",
    "app",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "app.urls"
WSGI_APPLICATION = "app.wsgi.application"
ASGI_APPLICATION = "app.asgi.application"
APPEND_SLASH = False

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.static",
            ],
        },
    },
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

if os.environ.get("DJANGO_DB_ENGINE") == "mssql":
    DATABASES["default"] = {
        "ENGINE": "mssql",
        "NAME": os.environ.get("MSSQL_DATABASE", "onlineBookstore"),
        "USER": os.environ.get("MSSQL_USER", ""),
        "PASSWORD": os.environ.get("MSSQL_PASSWORD", ""),
        "HOST": os.environ.get("MSSQL_HOST", "localhost"),
        "PORT": os.environ.get("MSSQL_PORT", "1433"),
        "OPTIONS": {
            "driver": os.environ.get("MSSQL_DRIVER", "ODBC Driver 17 for SQL Server"),
            "trusted_connection": os.environ.get("MSSQL_TRUSTED_CONNECTION", "yes").lower() == "yes",
        },
    }

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"

CORS_ALLOW_ALL_ORIGINS = True

# EMAIL_BACKEND = "django.core.mail.backends.con.EmailBackend"
# EMAIL_HOST = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
# EMAIL_PORT = int(os.environ.get("EMAIL_PORT", "587"))
# EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS", "True") == "True"
# EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "")
# EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = '' # email to use
EMAIL_HOST_PASSWORD = '' # Set this to app password generated from Google account
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER or "webmaster@localhost")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
