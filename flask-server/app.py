from flask import Flask
from flask_cors import CORS
from models import db, User, Role
from views import books_bp
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'mysecretkey'
db.init_app(app)

# Define the user datastore
user_datastore = SQLAlchemyUserDatastore(db, User, Role)

# Initialize the Flask-Security extension
security = Security(app, user_datastore)

app.register_blueprint(books_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
