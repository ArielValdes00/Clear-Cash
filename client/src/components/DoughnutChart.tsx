import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { useTheme } from '@/context/ThemeContext';
import { darkModeColors, lightModeColors } from '@/utils/colors';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface DoughnutChartProps {
    totalExpenses: number[]
    totalAmount: number
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ totalExpenses, totalAmount }) => {
    const { toggleButton } = useTheme();
    const darkModeColor = '#27272a';
    const lightModeColor = '#3f3f46';

    const [colors, setColors] = useState<string[]>(toggleButton ? darkModeColors : lightModeColors);

    useEffect(() => {
        setColors(toggleButton ? darkModeColors : lightModeColors);
    }, [toggleButton]);

    const data = {
        datasets: [
            {
                data: totalExpenses,
                backgroundColor: colors,
                hoverOffset: 2,
                borderWidth: 0
            }
        ],
        redraw: true
    };

    if (!totalExpenses || totalExpenses.length === 0) {
        return (
            <div className='w-[140px] md:w-[200px] 2xl:w-[300px]'>
                <Doughnut data={{
                    datasets:
                        [{
                            data: [totalAmount],
                            backgroundColor: [toggleButton ? darkModeColor : lightModeColor],
                            hoverOffset: 2,
                            borderWidth: 0
                        }]
                }} />
            </div>
        );
    }

    return (
        <div className='w-[140px] md:w-[200px] 2xl:w-[300px]'>
            <Doughnut data={data} />
        </div>
    );
};

export default DoughnutChart;
