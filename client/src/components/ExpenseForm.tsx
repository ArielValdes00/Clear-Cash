import React from 'react';

const ExpenseForm: React.FC = () => {
    return (
        <form className='rounded-md flex flex-col gap-3 mt-2 md:m-0'>
            <p className='text-xl font-semibold'>Add Expensive</p>
            <div className='grid grid-cols-2 gap-3 text-sm items-center 2xl:text-lg'>
                <textarea className='resize-none rounded-md p-2 2xl:p-4 h-full bg-gray-100 dark:bg-zinc-800 text-black shadow' placeholder='Description' />
                <div className='flex flex-col gap-2'>
                    <input type='text' className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow' placeholder='Amount Spent' />
                    <select className='rounded-lg p-2 py-3 2xl:p-4 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 shadow'>
                        <option value="Investments">Investments</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="travels">travels</option>
                    </select>
                </div>
            </div>
            <button
                type='submit'
                className='w-full text-gray-100 dark:text-black text-sm font-semibold bg-gradient-to-r from-color-green to-color-green-dark px-4 py-2 2xl:py-4 2xl:text-lg rounded-md hover:opacity-80'
            >
                Send
            </button>
        </form>
    );
};

export default ExpenseForm;
