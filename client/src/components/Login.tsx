import React, { useState, useEffect } from 'react';
import type { FormLogin, Toast } from '@/types/types';
import { login } from '@/routes/authRoute';
import { useRouter } from 'next/router';

const Login: React.FC<Toast> = ({ toast }) => {
    const router = useRouter();
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await login(formLogin);
            if (res) {
                console.log(res);
                localStorage.setItem('token', JSON.stringify(res.access_token));
                localStorage.setItem('user', JSON.stringify(res.user));
                toast.success(res.message);
                router.push('/dashboard');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                router.push('/dashboard');
            }
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-3'>
            <h3 className='font-bold text-center uppercase'>Login</h3>
            <input
                name='email'
                type="email"
                onChange={handleChange}
                value={formLogin.email}
                placeholder='email'
                className='p-2 border border-black'
            />
            <input
                name='password'
                type="password"
                onChange={handleChange}
                value={formLogin.password}
                placeholder='password'
                className='p-2 border border-black'
            />
            <button
                type='submit'
                className='px-5 py-2 bg-black text-white rounded-full'
            >
                Login
            </button>
        </form>
    );
};

export default Login;
