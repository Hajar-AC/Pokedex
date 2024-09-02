from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Configuration de la base de données SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Importer les routes
from routes import *

from models import Pokemon  # Importer le modèle Pokemon que nous allons définir

# Créer la base de données
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def index():
    return "Pokedex API is running!", 200
