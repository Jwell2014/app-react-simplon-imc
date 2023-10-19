import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartsProps {
    showChart: boolean,
    mesureData: {
        Id: number;
        taille: number;
        poids: number;
        imc: number;
    }[]
}



function Charts({ showChart, mesureData }: ChartsProps) {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (showChart) {
            const canvasElement = document.getElementById('imcChartContainer') as HTMLCanvasElement | null;

            if (canvasElement) {
                // Détruire le graphique existant s'il y en a un
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Créer un nouveau graphique
                chartRef.current = new Chart(canvasElement, {
                    type: 'bar',
                    data: {
                        labels: mesureData.slice(0, 7).map((item, index) => `JOUR ${index + 1}`),
                        datasets: [
                            {
                                label: 'IMC',
                                data: mesureData.slice(-7).map(item => item.imc),
                                backgroundColor: 'rgba(75, 75, 192, 0.2)',
                                borderColor: 'rgba(75, 75, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            x: { stacked: true },
                            y: { stacked: true },
                        },

                    },
                });
            } else {
                console.error("Élément HTML avec l'ID 'imcChartContainer' non trouvé ou n'est pas un élément canvas.");
            }
        }
    }, [showChart, mesureData]);

    return (
        <div className="container">
            <h2>Graphique sur 7 jours</h2>

            <div className="chart-container">

                {showChart && (
                    <div className="charts">
                        <canvas id="imcChartContainer"></canvas>
                    </div>)}
            </div>
        </div>

    );
}

export default Charts;
