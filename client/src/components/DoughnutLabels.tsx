import { useTheme } from '@/context/ThemeContext';
import { darkModeColors, lightModeColors } from '@/utils/colors';
import React, { useEffect, useState } from 'react';

const DoughnutLabels: React.FC = () => {
    const { toggleButton } = useTheme();

    const labels = ['Investments', 'Clothes', 'Food'];
    const [colors, setColors] = useState(toggleButton ? darkModeColors : lightModeColors);

    useEffect(() => {
        setColors(toggleButton ? darkModeColors : lightModeColors);
    }, [toggleButton]);

    return (
        <div>
            {labels.map((label, index) => (
                <div key={index} className="flex items-center my-2">
                    <div style={{ backgroundColor: colors[index] }} className="w-4 h-3 mr-2"></div>
                    <span className="text-sm">{label}</span>
                </div>
            ))}
        </div>
    );
};

export default DoughnutLabels;
