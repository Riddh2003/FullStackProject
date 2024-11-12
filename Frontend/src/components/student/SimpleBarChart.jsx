import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const xLabels = [
    'Discipline',
    'Test Performance',
    'Regularity',
    'Communication',
];

const yLabels = [0, 1, 2, 3, 4, 5];

export default function SimpleBarChart({ uData }) {
    return (
        <div style={{
            padding: 0, margin: 0, display: 'flex', justifyContent:
                'center', alignItems: 'center', height: '250px'
        }}>
            {/* Wrapper with no padding/margin */}
            <BarChart
                width={500}
                height={300}
                series={[
                    {
                        data: uData,
                        id: 'uvId',
                        color: '#ff8d8d',
                    },
                ]}
                xAxis={[
                    {
                        data: xLabels,
                        scaleType: 'band',
                        labelOffset: 0,
                    },
                ]}
                yAxis={[
                    {
                        data: yLabels,
                        scaleType: 'linear',
                        labelOffset: 0,
                    },
                ]}
                style={{
                    padding: 0,
                    margin: 0,
                }}
            />
        </div>
    );
}