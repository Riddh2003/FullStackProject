// Piechart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({finalScore}) => {
    // Data for the Pie chart
    const data = {
        datasets: [
            {
                label: 'Score Percentage',
                data: [finalScore,100-finalScore], // Replace with your actual data
                backgroundColor: ['#ff8d8d', '#8d8dff'],
                hoverBackgroundColor: ['#ff4848', '#4848ff'],
            },
        ],
        hoveroffset: 4,
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Can be 'top', 'bottom', 'left', or 'right'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}%`,
                },
            },
        },
    };
    return (
        <div>
            <Pie data={data} options={options}/>
        </div>
    );
};

export default Piechart;
