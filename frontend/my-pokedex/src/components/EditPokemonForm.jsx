/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function EditPokemonForm({ pokemon, onSave, onCancel }) {
    const [name, setName] = useState(pokemon.name);
    const [type, setType] = useState(pokemon.type);
    const [height, setHeight] = useState(pokemon.height);
    const [weight, setWeight] = useState(pokemon.weight);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...pokemon, name, type, height, weight });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
                <h2 className="text-xl font-bold mb-4">Edit Pokémon</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block mb-1">Name:</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Type:</label>
                        <input 
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Height:</label>
                        <input 
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Weight:</label>
                        <input 
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button"
                            onClick={onCancel}
                            className="p-2 bg-gray-500 text-white rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPokemonForm;
