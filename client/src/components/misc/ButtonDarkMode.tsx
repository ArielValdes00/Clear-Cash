import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ButtonDarkMode: React.FC = () => {
    const { handleChangeTheme, toggleButton } = useTheme();

    return (
        <label
            htmlFor='check'
            className={'py-2 cursor-pointer relative mb-3 w-14 lg:w-16 h-[31px] shadow lg:h-[34px] rounded-full flex items-center border-gray-300 bg-zinc-400 dark:bg-zinc-800 gap-2'}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleChangeTheme();
                }
            }}
        >
            <input
                type='checkbox'
                tabIndex={-1}
                id='check'
                className='sr-only peer'
                aria-label={toggleButton ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={handleChangeTheme}
            />
            <span
                className={`w-[25px] lg:w-[28px] shadow h-[25px] lg:h-[28px] bg-gray-200 dark:bg-black absolute rounded-full left-[3px] lg:top-[0.21rem] top-[3px] transition-all duration-500 ${toggleButton ? '-translate-x-[-25px] lg:-translate-x-[-31px]' : '-translate-x-[0px]'}`}
            >
                <span className='absolute text-color-green top-[0.21rem] lg:top-[0.2588rem] left-[0.17rem] lg:left-[0.28rem]'>
                    {toggleButton ? <BsFillMoonFill size={18} /> : <BsFillSunFill size={18} />}
                </span>
            </span>
        </label>
    );
};

export default ButtonDarkMode;
