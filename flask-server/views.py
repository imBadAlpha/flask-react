from flask import Blueprint, jsonify, request, current_app
from models import Book, db, User, Role
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

books_bp = Blueprint('books', __name__)

@books_bp.route('/register', methods=['POST'])
def register():
    user_data = request.get_json()
    email = user_data.get('email')
    password = user_data.get('password')

    # Check if the email is already registered
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered.'}), 409

    # Create a new user with default role as 'user'
    role = Role.query.filter_by(name='user').first()
    new_user = User(email=email, password=generate_password_hash(password), roles=[role])

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully.'}), 201

@books_bp.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    email = user_data.get('email')
    password = user_data.get('password')

    # Check if the email is registered
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Invalid email or password.'}), 401

    # Check if the password is correct
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password.'}), 401

    # Create a JWT token
    token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)}, current_app.config['SECRET_KEY'])

    return jsonify({'token': token.decode('UTF-8')}), 200

@books_bp.route('/books', methods=['GET', 'POST'])
def books():
    if request.method == 'GET':
        books = Book.query.all()
        return jsonify([{'id': book.id, 'title': book.title, 'author': book.author} for book in books])
    elif request.method == 'POST':
        book_data = request.get_json()
        new_book = Book(title=book_data['title'], author=book_data['author'])
        db.session.add(new_book)
        db.session.commit()
        return {'id': new_book.id}

@books_bp.route('/books/<id>', methods=['GET', 'PUT', 'DELETE'])
def book(id):
    book = Book.query.get_or_404(id)
    if request.method == 'GET':
        return {'id': book.id, 'title': book.title, 'author': book.author}
    elif request.method == 'PUT':
        book_data = request.get_json()
        book.title = book_data['title']
        book.author = book_data['author']
        db.session.commit()
        return {'message': 'Book updated successfully!'}
    elif request.method == 'DELETE':
        db.session.delete(book)
        db.session.commit()
        return {'message': 'Book deleted successfully!'}
