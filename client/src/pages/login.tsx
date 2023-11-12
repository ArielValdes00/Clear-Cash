import Login from '@/components/Login';
import Register from '@/components/Register';
import type { GetServerSidePropsContext } from 'next';
import React from 'react';
import { toast } from 'react-toastify';

const login = (): JSX.Element => {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <Login toast={toast} />
            <Register toast={toast} />
        </div>
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
