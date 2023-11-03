import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ButtonDarkMode: React.FC = () => {
    const { handleChangeTheme, toggleButton } = useTheme();

    return (
        <label
            htmlFor='check'
            className={'py-2 cursor-pointer relative mb-3 w-14 lg:w-16 h-[31px] shadow lg:h-[34px] rounded-full flex items-center border-gray-300 bg-zinc-400 dark:bg-zinc-800 gap-2'}
        >
            <input
                type='checkbox'
                id='check'
                className='sr-only peer'
                onClick={handleChangeTheme}
            />
            <span className='w-[25px] lg:w-[28px] shadow h-[25px] lg:h-[28px] bg-gray-200 dark:bg-black absolute rounded-full left-[3px] lg:top-[0.21rem] top-[3px] peer-checked:left-[29px] lg:peer-checked:left-[33px] transition-all duration-500'>
                <span className='absolute text-color-green top-[0.21rem] lg:top-[0.2588rem] left-[0.19rem] lg:left-[0.28rem]'>
                    {toggleButton ? <BsFillMoonFill size={18} /> : <BsFillSunFill size={18} />}
                </span>
            </span>
        </label>
    );
};

export default ButtonDarkMode;
