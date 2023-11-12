import React from 'react';
import { BsCoin } from 'react-icons/bs';
import ButtonDarkMode from './misc/ButtonDarkMode';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
    const { user, setUser } = useAppContext();
    const router = useRouter();
    const loginRoute = router.pathname;

    const logOut = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        router.push('/');
        setUser(null);
    };

    return (
        <div className={`${loginRoute !== '/login' ? 'grid-cols-3' : 'grid grid-cols-2'} grid items-center px-4 lg:px-5 py-1`}>
            <div className='flex gap-1 text-sm text-color-green font-bold uppercase'>
                <BsCoin size={24} />
                <div className='flex flex-col leading-3 text-gradient'>
                    <p>Clear</p>
                    <p>Cash</p>
                </div>
            </div>
            <div className={`${loginRoute !== '/login' ? 'mx-auto' : 'ml-auto'} mt-[15px]`}>
                <ButtonDarkMode />
            </div>
            {loginRoute !== '/login' && (
                <div className='ml-auto capitalize'>
                    {user
                        ? (
                            <div className='font-semibold dark:text-gray-100 flex gap-3'>
                                <p>{user.name}</p>
                                <button type='button' onClick={logOut} className='rounded-md px-5 py-2 bg-red-600 hover:bg-red-700'>Log Out</button>
                            </div>
                        )
                        : (
                            <Link
                                href={'/login'}
                                className='shadow bg-gradient-to-r from-color-green to-color-green-dark px-4 lg:py-2 py-[6px] font-semibold rounded-md text-gray-100 dark:text-black text-sm hover:opacity-80'>
                                Log In
                            </Link>
                        )
                    }
                </div>
            )}
        </div >

    );
};

export default Navbar;
