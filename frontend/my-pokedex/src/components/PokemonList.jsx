/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importer les icônes
import EditPokemonForm from './EditPokemonForm';  // Importer le formulaire d'édition
import CustomDialog from './CustomDialog'; // Importer le composant de dialogue personnalisé
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // État pour gérer l'ouverture du dialogue
    const [newPokemon, setNewPokemon] = useState({ name: '', type: '', height: '', weight: '' });
    const [editingPokemon, setEditingPokemon] = useState(null);
    const [expandedPokemonId, setExpandedPokemonId] = useState(null); // État pour gérer l'accordéon
    const [pokemonToDelete, setPokemonToDelete] = useState(null); // État pour gérer la suppression

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/pokemons')
            .then(response => response.json())
            .then(data => {
                setPokemons(data);
                setFilteredPokemons(data);  // Initialement, tous les Pokémon sont affichés
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPokemons(pokemons);
        } else {
            const filtered = pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pokemon.id.toString().includes(searchTerm)
            );
            setFilteredPokemons(filtered);
        }
    }, [searchTerm, pokemons]);

    // Declare a global toastId
let toastId = null;

const handleAddPokemon = (newPokemon) => {
    fetch('http://127.0.0.1:5000/api/pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add Pokémon');
        }
        return response.json();
    })
    .then(data => {
        setPokemons([...pokemons, data]);
        setNewPokemon({ name: '', type: '', height: '', weight: '' });
        setOpenDialog(false); // Fermer le dialogue après l'ajout
        toast.success("Pokémon added successfully!", {
            onClose: () => {
                window.location.reload(); // Recharger la page après la fermeture du toast
            }
        }); 
    })
    .catch(error => {
        console.error("Error adding Pokémon:", error);
        toast.error("Failed to add Pokémon.");
    });
};


    const confirmDeletePokemon = (id) => {
        fetch(`http://127.0.0.1:5000/api/pokemon/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
                setPokemonToDelete(null); // Fermer le dialogue après suppression
                toast.success("Pokémon deleted successfully!"); // Afficher le toast de succès
            })
            .catch(error => {
                console.error("Error deleting Pokémon:", error);
                toast.error("Failed to delete Pokémon.");
            });
    };

    const handleDeleteClick = (pokemon) => {
        setPokemonToDelete(pokemon);
    };

    const cancelDelete = () => {
        setPokemonToDelete(null);
    };

    const toggleAccordion = (id) => {
        setExpandedPokemonId(expandedPokemonId === id ? null : id);
    };

    return (
        <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900">  {/* Utilisation de la classe dark */}
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    className="border rounded p-1 w-full sm:w-1/5 text-sm"  // Réduction supplémentaire de la largeur et de la hauteur
                    placeholder="Search by ID or name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => setOpenDialog(true)}
                    className="p-1 border border-green-500 text-green-500 rounded ml-4 hover:bg-green-500 hover:text-white transition"
                >
                    Add Pokémon
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemons.map(pokemon => (
                    <div 
                        key={pokemon.id} 
                        className="relative p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow-lg dark:shadow-cyan-900 hover:shadow-2xl dark:hover:shadow-cyan-700 transition-transform transform hover:scale-105"
                    >
                        {/* Icônes Edit et Delete en haut à gauche */}
                        <div className="absolute top-2 left-2 flex space-x-2">
                            <FaEdit 
                                onClick={() => setEditingPokemon(pokemon)} 
                                className="text-yellow-500 cursor-pointer hover:text-yellow-600 transition"
                            />
                            <FaTrash 
                                onClick={() => handleDeleteClick(pokemon)}
                                className="text-red-500 cursor-pointer hover:text-red-600 transition"
                            />
                        </div>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.name}
                            className="w-24 h-24 mx-auto mb-4"
                        />
                        {/* Séparateur */}
                        <div className="border-t-2 border-cyan-700 dark:border-cyan-700 my-4"></div>
                        <h2 className="text-xl font-bold capitalize text-center mb-2">{pokemon.name}</h2>
                        <button 
                            onClick={() => toggleAccordion(pokemon.id)} 
                            className="text-sm text-blue-500 hover:underline mb-4 block mx-auto">
                            {expandedPokemonId === pokemon.id ? "Hide details" : "Show details"}
                        </button>
                        {expandedPokemonId === pokemon.id && (
                            <div className="mt-2 text-sm text-center mb-4">
                                <p>Type: {pokemon.type}</p>
                                <p>Height: {pokemon.height} m</p>
                                <p>Weight: {pokemon.weight} kg</p>
                            </div>
                        )}
                        <div className="mt-4 flex space-x-2 justify-center">
                            <Link to={`/pokemon/${pokemon.id}/evolution`}>
                                <button className="px-2 py-1 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                                    Evolutions
                                </button>
                            </Link>
                            <Link to={`/pokemon/${pokemon.id}/stats`}>
                                <button className="px-2 py-1 text-xs border border-teal-500 text-teal-500 rounded hover:bg-teal-500 hover:text-white transition">
                                    Statistics
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <CustomDialog 
                open={openDialog} 
                handleClose={() => setOpenDialog(false)} 
                onSave={handleAddPokemon} 
            />

            {/* Dialogue de Confirmation pour la Suppression */}
            {pokemonToDelete && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete {pokemonToDelete.name}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => confirmDeletePokemon(pokemonToDelete.id)}
                                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingPokemon && (
                <EditPokemonForm
                    pokemon={editingPokemon}
                    // eslint-disable-next-line no-undef
                    onSave={handleSavePokemon}
                    onCancel={() => setEditingPokemon(null)}  // Fermer le formulaire
                />
            )}
        </div>
    );
}

export default PokemonList;
