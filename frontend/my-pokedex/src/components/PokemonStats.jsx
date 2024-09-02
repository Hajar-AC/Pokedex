/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PokemonStats() {
    const { id } = useParams();  
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then(data => {
                const statLabels = data.stats.map(stat => stat.stat.name);
                const statValues = data.stats.map(stat => stat.base_stat);

                const chartData = {
                    labels: statLabels,
                    datasets: [{
                        label: `${data.name} Stats`,
                        data: statValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }]
                };

                setStats(chartData);
            })
            .catch(error => console.error("Erreur lors de la récupération des statistiques :", error));
    }, [id]);

    if (!stats) {
        return <div>Loading statistics...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Statistiques de {stats.datasets[0].label}</h1>
            <div className="w-3/4 mx-auto"> 
                <Bar data={stats} options={{ maintainAspectRatio: false }} height={400} />
            </div>
        </div>
    );
}

export default PokemonStats;
