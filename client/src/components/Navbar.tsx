import React from 'react';
import { BsCoin } from 'react-icons/bs';
import ButtonDarkMode from './misc/ButtonDarkMode';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
    const { user } = useAppContext();
    const router = useRouter();

    const logOut = () => {
        localStorage.clear();
        router.push('/');
    };
    return (
        <div className='grid grid-cols-3 items-center px-4 lg:px-5 py-1'>
            <div className='flex gap-1 text-sm text-color-green font-bold uppercase'>
                <BsCoin size={24} />
                <div className='flex flex-col leading-3 text-gradient'>
                    <p>Clear</p>
                    <p>Cash</p>
                </div>
            </div>
            <div className='mt-[15px] mx-auto'>
                <ButtonDarkMode />
            </div>
            <div className='ml-auto capitalize'>
                {user
                    ? (
                        <div className='font-semibold dark:text-gray-100 flex gap-3'>
                            <p>{user.name}</p>
                            <button type='button' onClick={logOut} className='rounded-md px-5 py-2 bg-red-600 hover:bg-red-700'>Log Out</button>
                        </div>
                    )
                    : (
                        <button className='shadow bg-gradient-to-r from-color-green to-color-green-dark px-4 lg:py-2 py-[6px] font-semibold rounded-md text-gray-100 dark:text-black text-sm hover:opacity-80'>
                            Log In
                        </button>
                    )
                }
            </div>
        </div >

    );
};

export default Navbar;
