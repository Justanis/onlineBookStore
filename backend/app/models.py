from . import db
from sqlalchemy.orm import relationship
from datetime import datetime

from . import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(50), unique=False, nullable=False)# REQUIRED
    email = db.Column(db.String(100), unique=True, nullable=False)# REQUIRED
    password = db.Column(db.String(250), nullable=False) # REQUIRED
    
    # 0 => is not confirmed yet and 1 if the user has confirmed
    isConfirmed = db.Column(db.Integer, unique=False, nullable=False, default=0) # REQUIRED
    confirmationCode = db.Column(db.String(6), unique=True, nullable=True)
    
    def to_dict(self):
        """Convert the User object to a dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "isConfirmed": self.isConfirmed,
            "confirmationCode": self.confirmationCode,
        }


    def ValidateUserData(UserData):
        if ('name' in UserData) and ('email' in UserData) and ('password' in UserData):
            if  UserData['name'] != '' and UserData['email'] != '' and UserData['password'] != '':
                return True
        return False
         
class BorrowedBook(db.Model):
    __tablename__ = 'borrowed_books'

    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id    = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    borrowed_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    return_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='borrowed')  # 'borrowed' or 'returned'

    user       = relationship('User', back_populates='borrowed_books')
    book       = relationship('Book', back_populates='borrowed_books')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "borrowed_at": self.borrowed_at.isoformat(),
            "return_date": self.return_date.isoformat() if self.return_date else None,
            "status": self.status
        }

class Books(db.Model):
    __tablename__ = 'books'

    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(200), nullable=False)
    author      = db.Column(db.String(100), nullable=False)
    category    = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)
    total_copies = db.Column(db.Integer, nullable=False, default=1)
    available_copies = db.Column(db.Integer, nullable=False, default=1)
    image_url   = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "category": self.category,
            "description": self.description,
            "total_copies": self.total_copies,
            "available_copies": self.available_copies,
            "image_url": self.image_url
        }