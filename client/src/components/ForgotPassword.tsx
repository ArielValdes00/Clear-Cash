import React, { useState } from 'react';
import LoadingButton from './misc/LoadingButton';
import { FaArrowLeft } from 'react-icons/fa';
import type { toast } from 'react-toastify';
import { isEmailValid } from '@/utils/validations';
import { forgotPassword } from '@/routes/authRoute';

interface ForgotPasswordProp {
    toast: typeof toast
    setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
    showForgotPassword: boolean
}

const ForgotPassword: React.FC<ForgotPasswordProp> = ({ setForgotPassword, showForgotPassword, toast }) => {
    const [email, setEmail] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true);
        if (!email) {
            toast.error('Please complete the field');
            setLoader(false);
            return;
        }
        if (!isEmailValid(email)) {
            toast.error('Invalid email format');
            setLoader(false);
        }
        try {
            const res = await forgotPassword(email);
            toast.success(res.status);
            setLoader(false);
        } catch (error: any) {
            toast.error(error.message);
            setLoader(false);
        }
    };

    const handleChange = (e: any) => {
        setEmail(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-3'>
            <div className='flex items-center gap-1 text-gray-700 dark:text-gray-400 2xl:mb-2'>
                <FaArrowLeft size={11} />
                <strong
                    onClick={() => { setForgotPassword(false); }}
                    className='underline cursor-pointer'>Back</strong>
            </div>
            <h3 className='font-bold text-5xl 2xl:text-6xl text-center dark:text-gray-200 mb-7'>Forgot Password?</h3>
            <div className='flex flex-col gap-2 dark:text-gray-200'>
                <label htmlFor='email' className='font-semibold ms-1'>Email</label>
                <input
                    name='email'
                    id='email'
                    type="email"
                    onChange={handleChange}
                    value={email}
                    placeholder='Email'
                    className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                />
            </div>
            <LoadingButton
                isLoading={loader}
                label="Send Reset Link"
            />
            <p className='mx-auto text-center text-[14px] dark:text-gray-200 max-w-sm'>Please enter your email address. We will send you a link to reset your password.</p>
        </form>
    );
};

export default ForgotPassword;
