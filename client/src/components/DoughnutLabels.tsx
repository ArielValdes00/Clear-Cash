import { useTheme } from '@/context/ThemeContext';
import { darkModeColors, lightModeColors } from '@/utils/colors';
import React, { useEffect, useState } from 'react';

interface CategoriesProp {
    categories: string[]
}
const DoughnutLabels: React.FC<CategoriesProp> = ({ categories }) => {
    const { toggleButton } = useTheme();

    const [colors, setColors] = useState(toggleButton ? darkModeColors : lightModeColors);

    useEffect(() => {
        setColors(toggleButton ? darkModeColors : lightModeColors);
    }, [toggleButton]);

    return (
        <div className={`${categories.length > 4 ? 'grid-cols-2' : 'grid-cols-1 '} grid gap-2 mt-2`}>
            {categories.map((label, index) => (
                <div key={index} className="flex items-center">
                    <div style={{ backgroundColor: colors[index] }} className="w-3 h-3 mr-2"></div>
                    <span className='text-sm 2xl:text-lg capitalize'>{label}</span>
                </div>
            ))}
        </div>
    );
};

export default DoughnutLabels;
