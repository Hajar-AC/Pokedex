/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/pokemon/${id}`)
            .then(response => response.json())
            .then(data => setPokemon(data));
    }, [id]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
            <p>Type: {pokemon.type}</p>
            <p>Height: {pokemon.height} m</p>
            <p>Weight: {pokemon.weight} kg</p>
        </div>
    );
}

export default PokemonDetails;
