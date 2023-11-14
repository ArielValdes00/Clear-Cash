import { register } from '@/routes/authRoute';
import type { FormRegister } from '@/types/types';
import { isEmailValid, isNameValid, isPasswordValid } from '@/utils/validations';
import React, { useState } from 'react';
import type { toast } from 'react-toastify';
import LoadingButton from './misc/LoadingButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface RegisterProps {
    toast: typeof toast
    toggleForm: () => void
}

const Register: React.FC<RegisterProps> = ({ toast, toggleForm }) => {
    const [loader, setLoader] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [formRegister, setFormRegiser] = useState<FormRegister>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: any) => {
        setFormRegiser({ ...formRegister, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);

        if (!formRegister.name || !formRegister.email || !formRegister.password || !formRegister.confirmPassword) {
            toast.error('Please fill in all fields');
            setLoader(false);
            return;
        }
        if (!isNameValid(formRegister.name)) {
            toast.error('Invalid name format');
            setLoader(false);
            return;
        }

        if (!isEmailValid(formRegister.email)) {
            toast.error('Invalid email format');
            setLoader(false);
            return;
        }

        if (!isPasswordValid(formRegister.password)) {
            toast.error('Password must be at least 8 characters long and can only contain letters and numbers');
            setLoader(false);
            return;
        }
        if (formRegister.password !== formRegister.confirmPassword) {
            toast.error('Passwords do not match');
            setLoader(false);
            return;
        }
        try {
            const res = await register(formRegister);
            setLoader(false);
            toast.success(res.message);
            location.reload();
        } catch (error: any) {
            toast.error(error.message);
            setLoader(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 2xl:gap-3 p-3'>
            <h3 className='font-bold text-5xl 2xl:text-6xl text-center dark:text-gray-100 2xl:mb-6'>Register</h3>
            <div className='flex flex-col gap-1 dark:text-gray-200'>
                <label htmlFor='name' className='font-semibold ms-1'>Name</label>
                <input
                    name='name'
                    id='name'
                    type="text"
                    onChange={handleChange}
                    value={formRegister.name}
                    placeholder='Name'
                    className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                />
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-200'>
                <label htmlFor='email' className='font-semibold ms-1'>Email</label>
                <input
                    name='email'
                    id='email'
                    type='email'
                    onChange={handleChange}
                    value={formRegister.email}
                    placeholder='Email'
                    className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                />
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-200 relative'>
                <label htmlFor='password' className='font-semibold ms-1'>Password</label>
                <div className='relative'>
                    <input
                        name='password'
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        value={formRegister.password}
                        placeholder='Password'
                        className='rounded-md w-full p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow pr-12'
                    />
                    <span
                        className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                        onClick={() => { setShowPassword(!showPassword); }}
                    >
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </span>
                </div>
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-200 mb-2 2xl:mb-3'>
                <label htmlFor='confirmPassword' className='font-semibold ms-1'>Confirm Password</label>
                <div className='relative'>
                    <input
                        name='confirmPassword'
                        id='Confirm Password'
                        type={showPassword2 ? 'text' : 'password'}
                        onChange={handleChange}
                        value={formRegister.confirmPassword}
                        placeholder='Confirm Password'
                        className='rounded-md w-full p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow pr-12'
                    />
                    <span
                        className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                        onClick={() => { setShowPassword2(!showPassword2); }}
                    >
                        {showPassword2 ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </span>
                </div>
            </div>
            <LoadingButton
                isLoading={loader}
                label="Create Account"
            />
            <p onClick={toggleForm} className='ms-1 dark:text-gray-200 text-sm'>Already have an account? <strong className='underline cursor-pointer'>Log in</strong></p>
        </form>
    );
};

export default Register;
