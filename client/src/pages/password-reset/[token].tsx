import LoadingButton from '@/components/misc/LoadingButton';
import { resetPassword } from '@/routes/authRoute';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const passwordReset = (): JSX.Element => {
    const [loader, setLoader] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const router = useRouter();
    const { email, token } = router.query;

    const [formPassword, setFormPassword] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
    });

    useEffect(() => {
        if (email && token) {
            setFormPassword(prevState => ({
                ...prevState,
                email: email as string,
                token: token as string
            }));
        }
    }, [email, token]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true);
        if (!formPassword.password || !formPassword.password_confirmation) {
            toast.error('Please complete all the fields');
            setLoader(false);
            return;
        }
        if (formPassword.password !== formPassword.password_confirmation) {
            toast.error('Passwords do not match');
            setLoader(false);
            return;
        }
        try {
            const res = await resetPassword(formPassword);
            toast.success(res.status);
            setLoader(false);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message);
            setLoader(false);
        }
    };

    const handleChange = (e: any) => {
        setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
    };

    return (
        <div className='flex flex-grow'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-[90%] md:w-[60%] lg:w-[40%] justify-center mx-auto'>
                <h3 className='font-bold text-5xl 2xl:text-6xl text-center dark:text-gray-200 mb-7'>Reset Password</h3>
                <div className='flex flex-col gap-2 dark:text-gray-200'>
                    <label htmlFor='password' className='font-semibold ms-1'>Password</label>
                    <div className='relative'>
                        <input
                            name='password'
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChange}
                            value={formPassword.password}
                            placeholder='Password'
                            className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow pr-12 w-full'
                        />
                        <span
                            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                            onClick={() => { setShowPassword(!showPassword); }}
                        >
                            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 dark:text-gray-200'>
                    <label htmlFor='Confirm Password' className='font-semibold ms-1'>Confirm Password</label>
                    <div className='relative'>
                        <input
                            name='password_confirmation'
                            id='password_confirmation'
                            type={showPassword2 ? 'text' : 'password'}
                            onChange={handleChange}
                            value={formPassword.password_confirmation}
                            placeholder='Confirm Password'
                            className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow pr-12 w-full'
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
                    label="Confirm New Password"
                />
                <p className='mx-auto text-center text-[14px] dark:text-gray-200 max-w-sm'>
                    Please provide your new password. Make sure it's secure and you've confirmed it correctly before submitting.
                </p>
            </form>
        </div>
    );
};

export default passwordReset;
