/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import PokemonEvolution from './components/PokemonEvolution';  // Importer le composant d'évolution
import PokemonStats from './components/PokemonStats';  // Importer le composant de statistiques
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);  // État pour gérer le mode sombre

    return (
        <div className={darkMode ? 'dark' : ''}>  {/* Applique la classe "dark" si darkMode est vrai */}
            <Router>
                <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen"> {/* Conteneur principal */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}  // Bascule le mode sombre
                        className="p-2 bg-gray-800 text-white rounded mb-4"
                    >
                        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                    <Routes>
                        <Route path="/" element={<PokemonList />} />
                        <Route path="/pokemon/:id" element={<PokemonDetails />} />
                        <Route path="/pokemon/:id/evolution" element={<PokemonEvolution />} />  {/* Nouvelle route */}
                        <Route path="/pokemon/:id/stats" element={<PokemonStats />} />  {/* Nouvelle route pour les statistiques */}
                    </Routes>
                </div>
            </Router>
            <ToastContainer />  {/* Conteneur pour afficher les notifications */}
        </div>
    );
}

export default App;
