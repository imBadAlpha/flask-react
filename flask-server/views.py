from flask import Blueprint, jsonify, request
from models import Book
from models import db

books_bp = Blueprint('books', __name__)

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
