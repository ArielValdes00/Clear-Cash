import { register } from '@/routes/authRoute';
import type { FormRegister, Toast } from '@/types/types';
import React, { useState } from 'react';

const Register: React.FC<Toast> = ({ toast }) => {
    const [formRegister, setFormRegiser] = useState<FormRegister>({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        setFormRegiser({ ...formRegister, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await register(formRegister);
            toast.success(res.message);
            console.log(res);
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-3'>
            <h3 className='font-bold text-center'>REGISTER</h3>
            <input
                name='name'
                type="text"
                onChange={handleChange}
                value={formRegister.name}
                placeholder='name'
                className='p-2 border border-black'
            />
            <input
                name='email'
                type="email"
                onChange={handleChange}
                value={formRegister.email}
                placeholder='email'
                className='p-2 border border-black'
            />
            <input
                name='password'
                type="password"
                onChange={handleChange}
                value={formRegister.password}
                placeholder='password'
                className='p-2 border border-black'
            />
            <button
                type='submit'
                className='px-5 py-2 bg-black text-white rounded-full'
            >
                Register
            </button>
        </form>
    );
};

export default Register;
