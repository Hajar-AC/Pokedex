/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PokemonEvolution() {
    const { id } = useParams();  // Récupère l'ID du Pokémon depuis l'URL
    const [evolutionChain, setEvolutionChain] = useState(null);

    useEffect(() => {
        // Premièrement, récupérer les données du Pokémon pour obtenir son évolution_chain url
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then(response => response.json())
            .then(data => {
                return fetch(data.evolution_chain.url);
            })
            .then(response => response.json())
            .then(data => setEvolutionChain(data))
            .catch(error => console.error("Erreur lors de la récupération des évolutions :", error));
    }, [id]);

    // **Fonction de rendu des évolutions**
    const renderEvolutions = (chain) => {
        const evolutions = [];
        let current = chain;

        while (current && current.species) {  // Vérifiez que 'species' est défini
            evolutions.push(current);
            if (current.evolves_to.length > 0) {
                current = current.evolves_to[0];
            } else {
                current = null;
            }
        }

        return evolutions.map((evolution, index) => {
            const pokemonId = evolution.species.url.split('/').filter(Boolean).pop();  // Récupérer l'ID du Pokémon depuis l'URL

            return (
                <div key={index} className="p-4 bg-white rounded shadow mb-2">
                    <h2 className="text-xl font-bold capitalize">{evolution.species.name}</h2>
                    <img 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} 
                        alt={evolution.species.name}
                        className="w-20 h-20 mx-auto"
                    />
                </div>
            );
        });
    };

    if (!evolutionChain) {
        return <div>Loading evolution data...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Evolution Chain</h1>
            <div>
                {renderEvolutions(evolutionChain.chain)}
            </div>
        </div>
    );
}

export default PokemonEvolution;
