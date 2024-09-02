import requests
from app import db
from models import Pokemon
from app import app

API_URL = "https://pokeapi.co/api/v2/pokemon/"

def fetch_pokemon_data(identifier):
    response = requests.get(f"{API_URL}{identifier}")
    if response.status_code == 200:
        data = response.json()
        return {
            "name": data["name"],
            "type": data["types"][0]["type"]["name"],
            "height": data["height"] / 10,  # Convertir en mètres
            "weight": data["weight"] / 10  # Convertir en kilogrammes
        }
    return None

def populate_db():
    with app.app_context():
        for pokemon_id in range(1, 151):  
            pokemon_data = fetch_pokemon_data(pokemon_id)
            if pokemon_data:
                pokemon = Pokemon(
                    name=pokemon_data["name"],
                    type=pokemon_data["type"],
                    height=pokemon_data["height"],
                    weight=pokemon_data["weight"]
                )
                db.session.add(pokemon)
                print(f"Ajouté {pokemon_data['name']} à la base de données")
        db.session.commit()
        print("Base de données remplie avec succès !")

if __name__ == '__main__':
    populate_db()
