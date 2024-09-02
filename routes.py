from flask import jsonify, request
from app import app, db
from models import Pokemon

@app.route('/api/pokemons', methods=['GET'])
def get_pokemons():
    pokemons = Pokemon.query.all()
    return jsonify([{
        'id': pokemon.id,
        'name': pokemon.name,
        'type': pokemon.type,
        'height': pokemon.height,
        'weight': pokemon.weight
    } for pokemon in pokemons])

@app.route('/api/pokemon/<identifier>', methods=['GET'])
def get_pokemon(identifier):
    # Vérifier un nombre (ID) ou une chaîne de caractères (nom)
    if identifier.isdigit():
        pokemon = Pokemon.query.get_or_404(int(identifier))
    else:
        pokemon = Pokemon.query.filter_by(name=identifier.lower()).first_or_404()
    
    return jsonify({
        'id': pokemon.id,
        'name': pokemon.name,
        'type': pokemon.type,
        'height': pokemon.height,
        'weight': pokemon.weight
    })
@app.route('/api/pokemon', methods=['POST'])
def add_pokemon():
    data = request.json
    new_pokemon = Pokemon(
        name=data['name'],
        type=data['type'],
        height=data['height'],
        weight=data['weight']
    )
    db.session.add(new_pokemon)
    db.session.commit()
    return jsonify({'message': 'Pokemon added!'}), 201


@app.route('/api/pokemon/<int:id>', methods=['PUT'])
def update_pokemon(id):
    pokemon = Pokemon.query.get_or_404(id)
    data = request.json

    pokemon.name = data['name']
    pokemon.type = data['type']
    pokemon.height = data['height']
    pokemon.weight = data['weight']

    db.session.commit()
    return jsonify({'message': 'Pokemon updated!'}), 200


@app.route('/api/pokemon/<int:id>', methods=['DELETE'])
def delete_pokemon(id):
    pokemon = Pokemon.query.get_or_404(id)
    db.session.delete(pokemon)
    db.session.commit()
    return jsonify({'message': 'Pokemon deleted!'}), 200
