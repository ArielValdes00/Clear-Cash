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

const DoughnutChart: React.FC = () => {
    const { toggleButton } = useTheme();

    const [colors, setColors] = useState<string[]>(toggleButton ? darkModeColors : lightModeColors);

    useEffect(() => {
        setColors(toggleButton ? darkModeColors : lightModeColors);
    }, [toggleButton]);

    const data = {
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: colors,
                hoverOffset: 2,
                borderWidth: 0
            }
        ],
        redraw: true
    };

    return (
        <div className='w-[140px] md:w-[200px] 2xl:w-[300px]'>
            <Doughnut data={data} />
        </div>
    );
};

export default DoughnutChart;
