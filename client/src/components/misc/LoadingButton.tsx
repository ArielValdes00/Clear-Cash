import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface LoadingButtonProps {
    isLoading: boolean
    label: string
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, label }) => {
    return (
        <button
            type="submit"
            className='w-full text-gray-100 dark:text-black font-semibold bg-gradient-to-r from-color-green to-color-green-dark px-4 py-2 2xl:py-3 2xl:text-lg rounded-md hover:opacity-80'
            disabled={isLoading}
        >
            {isLoading
                ? <BiLoaderAlt size={24} className='animate-spin mx-auto' />
                : label
            }
        </button>
    );
};

export default LoadingButton;
