import React from 'react';

const ExpenseForm: React.FC = () => {
    return (
        <form className='rounded-md flex flex-col gap-3 mt-2'>
            <p className='text-xl font-semibold'>Add Expensive</p>
            <div className='grid grid-cols-2 gap-3 text-sm'>
                <input type='text' className='rounded-md p-2 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-200' placeholder='Description' />
                <div className='flex flex-col gap-2'>
                    <input type='text' className='rounded-md p-2 py-3 bg-gray-100 dark:bg-zinc-800' placeholder='Amount Spent' />
                    <select className='rounded-lg p-2 py-3 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800'>
                        <option value="Investments">Investments</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="travels">travels</option>
                    </select>
                </div>
            </div>
            <button
                type='submit'
                className='w-full text-gray-100 text-sm font-semibold bg-color-green px-4 py-2 rounded-md hover:opacity-80'
            >
                Send
            </button>
        </form>
    );
};

export default ExpenseForm;
