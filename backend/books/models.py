from django.db import models


class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=250)
    isConfirmed = models.BooleanField(default=False)
    confirmationCode = models.CharField(max_length=6, unique=True, null=True, blank=True)

    class Meta:
        db_table = "users"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "isConfirmed": int(self.isConfirmed),
            "confirmationCode": self.confirmationCode,
        }

    @staticmethod
    def validate_user_data(user_data):
        if not isinstance(user_data, dict):
            return False
        if "name" in user_data and "email" in user_data and "password" in user_data:
            return all(str(user_data[key]).strip() for key in ["name", "email", "password"])
        return False


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    total_copies = models.IntegerField(default=1)
    available_copies = models.IntegerField(default=1)
    image_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "books"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "category": self.category,
            "description": self.description,
            "total_copies": self.total_copies,
            "available_copies": self.available_copies,
            "image_url": self.image_url,
        }


class BorrowedBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="borrowed_books")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="borrowed_books")
    borrowed_at = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, default="borrowed")

    class Meta:
        db_table = "borrowed_books"

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "borrowed_at": self.borrowed_at.isoformat(),
            "return_date": self.return_date.isoformat() if self.return_date else None,
            "status": self.status,
        }