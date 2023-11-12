import React, { useState } from 'react';
import type { FormLogin } from '@/types/types';
import { login } from '@/routes/authRoute';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import type { toast } from 'react-toastify';
import { isEmailValid, isPasswordValid } from '@/utils/validations';
import LoadingButton from './misc/LoadingButton';

interface LoginProps {
    toast: typeof toast
    toggleForm: () => void
}

const Login: React.FC<LoginProps> = ({ toast, toggleForm }) => {
    const [loader, setLoader] = useState<boolean>(false);
    const router = useRouter();
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        setLoader(true);
        e.preventDefault();
        if (!formLogin.email || !formLogin.password) {
            toast.error('Please fill in all fields');
            setLoader(false);
            return;
        }
        if (!isEmailValid(formLogin.email)) {
            toast.error('Invalid email format');
            setLoader(false);
            return;
        }
        if (!isPasswordValid(formLogin.password)) {
            toast.error('Password must be at least 8 characters long and can only contain letters and numbers');
            setLoader(false);
            return;
        }
        try {
            const res = await login(formLogin);
            if (res) {
                Cookies.set('token', res.access_token);
                Cookies.set('user', JSON.stringify(res.user));
                toast.success(res.message);
                if (res.user.name) {
                    router.push('/dashboard');
                    setLoader(false);
                }
            }
        } catch (error: any) {
            toast.error(error.message);
            setLoader(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-3'>
            <h3 className='font-bold text-5xl 2xl:text-6xl text-center dark:text-gray-200 mb-7'>Log in</h3>
            <div className='flex flex-col gap-1 dark:text-gray-200'>
                <label htmlFor='email' className='font-semibold ms-1'>Email</label>
                <input
                    name='email'
                    id='email'
                    type="email"
                    onChange={handleChange}
                    value={formLogin.email}
                    placeholder='Email'
                    className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                />
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-200'>
                <label htmlFor='password' className='font-semibold ms-1'>Password</label>
                <input
                    name='password'
                    id='password'
                    type="password"
                    onChange={handleChange}
                    value={formLogin.password}
                    placeholder='Password'
                    className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                />
                <strong className='text-end text-sm underline mr-1 mt-1 cursor-pointer'>Forgot Password?</strong>
            </div>
            <LoadingButton
                isLoading={loader}
                label="Submit"
            />
            <p onClick={toggleForm} className='ms-1 dark:text-gray-200 text-sm'>New on Clear Clash? <strong className='underline cursor-pointer'>Register Now</strong></p>
        </form>
    );
};

export default Login;
