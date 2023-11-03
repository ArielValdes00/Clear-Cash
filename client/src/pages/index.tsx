import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
    return (
        <div className='bg-gray-200 dark:bg-black flex flex-grow'>
            <div className='mb-5 flex flex-col text-center mx-auto justify-center gap-6 items-center max-w-[90%] sm:max-w-sm md:max-w-lg'>
                <h1 className='text-6xl lg:text-7xl font-extrabold text-gradient'>Take control of your finances</h1>
                <p className='max-w-xs lg:max-w-md dark:text-gray-400 text-gray-700'>
                    With ClearCash, managing your expenses has never been easier. Track your spending, set budgets, and achieve your financial goals all in one place.
                </p>
                <Link href={'/dashboard'} className='cursor-pointer bg-gradient-to-r from-color-green to-color-green-dark text-gray-100 dark:text-black shadow flex items-center gap-3 px-7 py-4 rounded-full font-extrabold lg:font-bold uppercase hover:bg-opacity-80'>
                    <p>Get Started</p>
                    <FaArrowRight size={17} />
                </Link>
            </div>
        </div>
    );
}
