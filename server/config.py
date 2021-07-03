from datetime import timedelta
import os


class BaseConfig:
    # Statement for enabling the development environment
    DEBUG = False

    # Define the application directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    # Define app database
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "sqlite:///" + os.path.join(BASE_DIR, "database.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key for signing cookies
    SECRET_KEY = os.environ.get("SECRET_KEY", "secret")

    # JWT CONFIGURATION
    # Enable protection agains *Cross-site Request Forgery (CSRF)*
    CSRF_ENABLED = True
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "super secret")

    # Token expiration
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    # Cookies only (double submit token)
    JWT_TOKEN_LOCATION = ["cookies"]

    # Only sent over HTTPS
    JWT_COOKIE_SECURE = True

    # Enable cross site
    JWT_COOKIE_SAMESITE = "None"

    # Client only pass refresh cookie over refresh route
    JWT_REFRESH_COOKIE_PATH = "/api/refresh"

    # True = deleted when browser is closed
    JWT_SESSION_COOKIE = False

    JWT_COOKIE_CSRF_PROTECT = True

    JWT_CSRF_IN_COOKIES = False

    # CORS CONFIG
    # Origins that allowed
    # CORS_ORIGINS = ["http://localhost:3000"]
    CORS_ORIGINS = ["https://meetdoc.netlify.app"]

    # Allow pass cookies
    CORS_SUPPORTS_CREDENTIALS = True

    # Disable WTForm CSRF check (already use jwt)
    WTF_CSRF_ENABLED = False
