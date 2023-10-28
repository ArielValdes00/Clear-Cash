import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function Home () {
    const [theme, setTheme] = useState<string>('');
    const [toggleButton, setToggleButton] = useState<boolean>(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html')?.classList.add('dark');
        } else {
            document.querySelector('html')?.classList.remove('dark');
        }
    }, [theme]);

    const handleChangeTheme = (): void => {
        setTheme((prevTheme: string) => prevTheme === 'dark' ? 'light' : 'dark');
        setToggleButton(!toggleButton);
    };
    return (
        <div className='bg-gray-200 dark:bg-black flex flex-col h-screen'>
            <Navbar handleChangeTheme={handleChangeTheme} toggleButton={toggleButton} />
            <div className='mb-5 flex flex-col max-w-[350px] sm:max-w-sm lg:max-w-md text-center mx-auto flex-grow justify-center gap-6 items-center'>
                <h1 className='text-6xl lg:text-7xl font-extrabold text-color-green shadow-text'>Take control of your finances</h1>
                <p className='max-w-xs lg:max-w-md dark:text-gray-400 text-[15px] text-gray-500'>
                    With ClearCash, managing your expenses has never been easier. Track your spending, set budgets, and achieve your financial goals all in one place.
                </p>
                <Link href={'/dashboard'} className='cursor-pointer text-gray-100 dark:text-black shadow flex items-center gap-3 px-7 py-4 rounded-full font-extrabold lg:font-bold bg-color-green uppercase hover:bg-opacity-80'>
                    <p>Get Started</p>
                    <FaArrowRight size={17} />
                </Link>
            </div>
        </div>
    );
}
