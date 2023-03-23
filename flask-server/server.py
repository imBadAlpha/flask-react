from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Book {self.id}>'

@app.route('/books', methods=['GET', 'POST'])
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

@app.route('/books/<id>', methods=['GET', 'PUT', 'DELETE'])
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
    
