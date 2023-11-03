import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ButtonsPagination: React.FC = () => {
    return (
        <div className="flex justify-center gap-3 items-center mt-4">
            <button
                type='button'
                className="text-gray-100 dark:text-black bg-gradient-to-r from-color-green to-color-green-dark p-2 rounded-md hover:opacity-80"
            >
                <FaArrowLeft size={15} />
            </button>
            <p className='text-gray-600 dark:text-gray-400'>1 of 3</p>
            <button
                type='button'
                className="text-gray-100 dark:text-black bg-gradient-to-r from-color-green to-color-green-dark p-2 rounded-md hover:opacity-80"
            >
                <FaArrowRight size={15} />
            </button>
        </div>
    );
};

export default ButtonsPagination;
