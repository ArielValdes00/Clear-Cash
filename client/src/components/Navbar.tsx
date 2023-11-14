import React, { useState, useEffect } from 'react';
import { BsCoin } from 'react-icons/bs';
import ButtonDarkMode from './misc/ButtonDarkMode';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import type { User } from '@/types/types';

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const router = useRouter();
    const loginRoute = router.pathname;

    useEffect(() => {
        const getUser: string | undefined = Cookies.get('user');
        const parsedUser: User = JSON.parse(getUser ?? '{}');
        setUser(parsedUser);
    }, [loginRoute]);

    const logOut = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        router.push('/');
        setUser(null);
    };

    const toggleMenu = () => {
        setTimeout(() => {
            setMenuOpen(!menuOpen);
        }, 1);
    };

    const closeMenuOnOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (menuOpen && !target.closest('.close-menu')) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenuOnOutsideClick);

        return () => {
            document.removeEventListener('click', closeMenuOnOutsideClick);
        };
    }, [menuOpen]);

    return (
        <div className={`${loginRoute !== '/login' && !loginRoute.includes('/password') ? 'grid-cols-3' : 'grid grid-cols-2'} select-none grid items-center px-4 lg:px-5 py-1`}>
            <div className='flex gap-1 text-sm text-color-green font-bold uppercase'>
                <BsCoin size={24} />
                <div className='flex flex-col leading-3 text-gradient'>
                    <p>Clear</p>
                    <p>Cash</p>
                </div>
            </div>
            <div className={`${loginRoute !== '/login' && !loginRoute.includes('/password') ? 'mx-auto' : 'ml-auto'} mt-[15px]`}>
                <ButtonDarkMode />
            </div>
            {loginRoute !== '/login' && !loginRoute.includes('/password') && (
                <div className='ml-auto capitalize'>
                    {!user?.name
                        ? (
                            <Link
                                href={'/login'}
                                aria-label='Login'
                                className='shadow bg-gradient-to-r from-color-green to-color-green-dark px-4 py-2 font-semibold rounded-md text-gray-100 dark:text-black text-sm hover:opacity-80'>
                                Log In
                            </Link>
                        )
                        : (
                            <div
                                tabIndex={0}
                                aria-label='openMenu'
                                onClick={toggleMenu}
                                onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        toggleMenu();
                                    }
                                }}
                                className='shadow bg-gradient-to-r cursor-pointer from-color-green to-color-green-dark px-4 lg:py-2 py-[6px] font-semibold rounded-md text-gray-100 dark:text-black text-sm hover:opacity-80'>
                                <p className='relative tracking-wide text-[15px]'>{user?.name}</p>
                                {menuOpen && (
                                    <ul className='absolute z-50 right-5 top-14 cursor-pointer close-menu'>
                                        <li
                                            onClick={logOut}
                                            onKeyDown={(e: any) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    logOut();
                                                }
                                            }}
                                            tabIndex={0}
                                            aria-label='logout'
                                            className='text-black dark:text-white w-28 text-center py-2 text-sm border bg-gray-100 hover:bg-opacity-70 dark:bg-zinc-800 dark:hover:bg-black cursor-pointer rounded-l-lg rounded-br-lg shadow'>
                                            Logout
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )
                    }
                </div>
            )}
        </div >

    );
};

export default Navbar;
