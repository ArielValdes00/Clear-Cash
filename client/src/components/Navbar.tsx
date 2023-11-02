import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill, BsCoin } from 'react-icons/bs';

const Navbar: React.FC = () => {
    const { handleChangeTheme, toggleButton } = useTheme();
    const router: NextRouter = useRouter();
    const isDashboardRoute: boolean = router.pathname.includes('/dashboard');

    return (
        <div className={`${isDashboardRoute ? 'grid-cols-2' : 'md:grid-cols-9 grid-cols-3'} grid items-center px-4 lg:px-5 py-1`}>
            <div className='flex gap-1 text-sm text-color-green font-bold uppercase'>
                <BsCoin size={24} />
                <div className='flex flex-col leading-3'>
                    <p>Clear</p>
                    <p>Cash</p>
                </div>
            </div>
            <div className={`mt-[15px] ${isDashboardRoute ? 'ml-auto' : 'mx-auto md:ml-auto lg:ml-12 xl:ml-24 md:col-start-8'}`}>
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
                        <span className='absolute p-[0.1rem] text-color-green top-[0.09rem] lg:top-[0.25rem] left-[0.09rem] lg:left-[0.26rem]'>
                            {toggleButton ? <BsFillMoonFill size={19} /> : <BsFillSunFill size={19} />}
                        </span>
                    </span>
                </label>
            </div>
            {isDashboardRoute
                ? ''
                : (
                    <button className='shadow ml-auto md:col-start-9 px-4 lg:py-2 py-[6px] font-semibold rounded-md bg-color-green text-gray-100 text-sm hover:bg-opacity-80'>
                        Log In
                    </button>
                )}
        </div>

    );
};

export default Navbar;
