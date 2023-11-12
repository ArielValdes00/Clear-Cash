import { createExpense } from '@/routes/expenseRoute';
import type { ExpenseFormProps, FormExpenseState } from '@/types/types';
import { isDescriptionValid, isValueValid } from '@/utils/validations';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from './misc/LoadingButton';

const ExpenseForm: React.FC<ExpenseFormProps> = ({ reportId, setExpenses }) => {
    const [loader, setLoader] = useState<boolean>(false);
    const [formExpense, setFormExpense] = useState<FormExpenseState>({
        report_id: reportId,
        amount: null,
        description: '',
        category: 'Investments'
    });

    const handleCreateExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        try {
            const incomeValue = formExpense.amount !== null ? formExpense.amount.toString() : '';
            if (!isValueValid(incomeValue)) {
                toast.error('The amount is not valid. It cannot be empty, start with 0, or contain symbols.');
                setLoader(false);
                return;
            }

            if (!isDescriptionValid(formExpense.description)) {
                toast.error('The description is not valid. It can only contain letters and spaces.');
                setLoader(false);
                return;
            }

            const res = await createExpense(formExpense);
            if (res.expense) {
                setLoader(false);
                const newExpenses = Array.isArray(res.expense) ? res.expense : [res.expense];
                setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
                setFormExpense({ category: formExpense.category, description: '', amount: null, report_id: formExpense.report_id });
            }
        } catch (error: any) {
            toast.error(error.message);
            setLoader(false);
        }
    };

    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormExpense({ ...formExpense, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleCreateExpense} className='rounded-md flex flex-col gap-3 mt-2 md:m-0 2xl:mt-4'>
            <p className='text-xl font-semibold'>Add Expense</p>
            <div className='grid grid-cols-2 gap-3 text-sm items-center 2xl:text-lg'>
                <textarea
                    onChange={handlechange}
                    name='description'
                    value={formExpense.description}
                    className='resize-none rounded-md p-2 2xl:p-4 h-full bg-gray-100 dark:bg-zinc-800 shadow'
                    placeholder='Description'
                    aria-label="Expense description"
                />
                <div className='flex flex-col gap-2'>
                    <input
                        type='number'
                        name='amount'
                        onChange={handlechange}
                        value={formExpense.amount === null ? '' : formExpense.amount.toString()}
                        className='rounded-md p-2 py-3 2xl:p-4 bg-gray-100 dark:bg-zinc-800 shadow'
                        placeholder='Amount Spent'
                        aria-label="Amount Spent"
                    />
                    <select
                        onChange={handlechange}
                        name='category'
                        aria-label="Expense Category"
                        className='rounded-lg p-2 py-3 2xl:p-4 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 shadow'
                    >
                        <option value="Investments">Investments</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="Travels">Travels</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Home">Home</option>
                        <option value="Savings">Savings</option>
                    </select>
                </div>
            </div>
            <LoadingButton
                isLoading={loader}
                label="Create"
            />
        </form>
    );
};

export default ExpenseForm;
