import { createExpense } from '@/routes/expenseRoute';
import type { ExpenseFormProps, FormExpenseState } from '@/types/types';
import React, { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const ExpenseForm: React.FC<ExpenseFormProps> = ({ reportId, setExpenses }) => {
    const [loader, setLoader] = useState<boolean>(false);
    const [formExpense, setFormExpense] = useState<FormExpenseState>({
        report_id: reportId,
        amount: 0,
        description: '',
        category: 'Investments'
    });

    const handleCreateExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        const res = await createExpense(formExpense);
        setLoader(false);
        if (res.expense) {
            const newExpenses = Array.isArray(res.expense) ? res.expense : [res.expense];
            setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
        } else {
            console.error('Error');
        }
    };

    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormExpense({ ...formExpense, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleCreateExpense} className='rounded-md flex flex-col gap-3 mt-2 md:m-0'>
            <p className='text-xl font-semibold'>Add Expense</p>
            <div className='grid grid-cols-2 gap-3 text-sm items-center 2xl:text-lg'>
                <textarea
                    onChange={handlechange}
                    name='description'
                    className='resize-none rounded-md p-2 2xl:p-4 h-full bg-gray-100 dark:bg-zinc-800 shadow'
                    placeholder='Description'
                />
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        name='amount'
                        onChange={handlechange}
                        className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                        placeholder='Amount Spent'
                    />
                    <select
                        onChange={handlechange}
                        name='category'
                        className='rounded-lg p-2 py-3 2xl:p-4 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 shadow'
                    >
                        <option value="Investments">Investments</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="travels">Travels</option>
                    </select>
                </div>
            </div>
            <button
                type='submit'
                className='w-full text-gray-100 dark:text-black text-sm font-semibold bg-gradient-to-r from-color-green to-color-green-dark px-4 py-2 2xl:py-4 2xl:text-lg rounded-md hover:opacity-80'
            >
                {loader
                    ? <BiLoaderAlt
                        size={20}
                        className='animate-spin mx-auto'
                    />
                    : 'Create'
                }
            </button>
        </form>
    );
};

export default ExpenseForm;
