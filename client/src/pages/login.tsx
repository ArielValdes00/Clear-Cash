import ForgotPassword from '@/components/ForgotPassword';
import Login from '@/components/Login';
import Register from '@/components/Register';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const login = (): JSX.Element => {
    const [changeForm, setchangeForm] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);

    const toggleForm = (): void => {
        setchangeForm(!changeForm);
    };

    return (
        <div className='flex flex-grow'>
            <div className='flex flex-col w-[90%] md:w-[60%] lg:w-[40%] justify-center mx-auto'>
                {!forgotPassword && (
                    <Link
                        href='/'
                        className='flex items-center gap-1 text-gray-700 dark:text-gray-400 2xl:mb-2'
                    >
                        <FaArrowLeft size={11} />
                        <strong className='underline'>Back</strong>
                    </Link>
                )}
            {forgotPassword
                ? <ForgotPassword toast={toast} setForgotPassword={setForgotPassword} />
                : (
                    changeForm
                        ? <Register toast={toast} toggleForm={toggleForm} />
                        : <Login toast={toast} toggleForm={toggleForm} setForgotPassword={setForgotPassword} />
                )}
        </div>
        </div >
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const { cookies } = req;

    if (cookies.token) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
}

export default login;
