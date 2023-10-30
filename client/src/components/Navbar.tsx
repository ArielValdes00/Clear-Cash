import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/router';
import React from 'react';
import { BsFillMoonFill, BsFillSunFill, BsCoin } from 'react-icons/bs';

const Navbar: React.FC = () => {
    const { handleChangeTheme, toggleButton } = useTheme();
    const router = useRouter();
    const isDashboardRoute: boolean = router.pathname === '/dashboard';

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
                    htmlFor={'check'}
                    className={'py-2 cursor-pointer relative mb-3 w-[75px] lg:w-20 h-[33px] shadow lg:h-9 rounded-full flex items-center border-gray-300 dark:border-color-green border gap-2'}
                >
                    <input
                        type='checkbox'
                        id={'check'}
                        className='sr-only peer'
                        onClick={handleChangeTheme}
                    />
                    <span className='w-[27px] lg:w-[28px] shadow h-[27px] lg:h-[28px] bg-color-green absolute rounded-full left-[3px] lg:top-[3px] top-[2px] peer-checked:left-[44px] lg:peer-checked:left-[47px] transition-all duration-500'>
                        <span className='absolute text-gray-100 dark:text-black top-[4px] lg:top-1 left-[4px]'>
                            {toggleButton ? <BsFillMoonFill size={19} /> : <BsFillSunFill size={19} />}
                        </span>
                    </span>
                </label>
            </div>
            {isDashboardRoute
                ? ''
                : (
                    <button className='shadow ml-auto md:col-start-9 px-4 lg:py-2 py-[6px] font-semibold rounded-md bg-color-green text-gray-100 dark:text-black text-sm hover-bg-opacity-80'>
                        Log In
                    </button>
                )}
        </div>

    );
};

export default Navbar;
