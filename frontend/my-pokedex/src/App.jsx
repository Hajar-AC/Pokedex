/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import PokemonEvolution from './components/PokemonEvolution';  
import PokemonStats from './components/PokemonStats'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [darkMode, setDarkMode] = useState(false); 

    return (
        <div className={darkMode ? 'dark' : ''}>  
            <Router>
                <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
                    <button
                        onClick={() => setDarkMode(!darkMode)}  
                        className="p-2 bg-gray-800 text-white rounded mb-4"
                    >
                        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                    <Routes>
                        <Route path="/" element={<PokemonList />} />
                        <Route path="/pokemon/:id" element={<PokemonDetails />} />
                        <Route path="/pokemon/:id/evolution" element={<PokemonEvolution />} />
                        <Route path="/pokemon/:id/stats" element={<PokemonStats />} /> 
                    </Routes>
                </div>
            </Router>
            <ToastContainer /> 
        </div>
    );
}

export default App;
