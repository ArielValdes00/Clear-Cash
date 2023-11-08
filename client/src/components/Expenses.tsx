import { deleteExpense } from '@/routes/expenseRoute';
import type { Expense } from '@/types/types';
import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { BiLoaderAlt } from 'react-icons/bi';

const Expenses: React.FC<{ reportData: Expense[], setExpenses: React.Dispatch<React.SetStateAction<Expense[]>> }> =
    ({ reportData, setExpenses }) => {
        const [menuOpen, setMenuOpen] = useState<number>(0);
        const [loader, setLoader] = useState<boolean>(false);

        const toggleMenu = (cardId: number) => {
            if (menuOpen === cardId) {
                setMenuOpen(0);
            } else {
                setMenuOpen(cardId);
            }
        };

        const handleDeleteExpense = async (id: number) => {
            setLoader(true);
            const res = await deleteExpense(id);
            if (res) {
                const filteredData = reportData.filter(item => item.id !== id);
                setExpenses(filteredData);
                setLoader(false);
            }
        };
        return (
            <div className='mb-5'>
                <div className='flex justify-between items-center mb-3'>
                    <p className='font-semibold text-xl'>Your Expensives</p>
                    <select className='rounded-lg px-2 py-[5px] dark:text-black bg-gray-100 dark:bg-gray-200 w-1/3 shadow'>
                        <option value="All">All</option>
                        <option value="Investments">Investments</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="travels">travels</option>
                    </select>
                </div>
                <div>
                    {reportData?.map((card: Expense) => {
                        const date = new Date(card.created_at);
                        const formattedDate = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

                        return (
                            <div key={card.id} className='grid grid-cols-3 bg-gray-100 dark:text-gray-100 dark:bg-zinc-800 rounded-md pl-3 py-3 pr-2 my-2 text-black text-[15px] shadow'>
                                <div className='col-span-2 flex flex-col gap-'>
                                    <p>Expensive: <strong>${card.amount}</strong></p>
                                    <p>{card.description}</p>
                                </div>
                                <div className='ml-auto text-end flex gap-1'>
                                    <div className='flex flex-col'>
                                        <p className='font-semibold'>{card.category}</p>
                                        <p className='text-sm'>{formattedDate}</p>
                                    </div>
                                    <div className='relative'>
                                        <div className='flex gap-1'>
                                            <SlOptionsVertical
                                                size={18}
                                                onClick={() => { toggleMenu(card.id); }}
                                                className='mt-[0.4rem] cursor-pointer text-zinc-800 dark:text-gray-200'
                                            />
                                        </div>
                                        {menuOpen === card.id && (
                                            <div className='absolute right-2 mt-[.2rem] bg-gray-100 dark:bg-zinc-800 border border-gray-400 rounded-l-lg rounded-br-lg shadow-md'>
                                                <ul>
                                                    <li
                                                        onClick={async () => {
                                                            await handleDeleteExpense(card.id);
                                                        }}
                                                        className='w-24 text-center py-[.4rem] text-sm hover:bg-gray-200 dark:hover:bg-black cursor-pointer rounded-l-lg rounded-br-lg'>
                                                        {loader
                                                            ? <BiLoaderAlt size={20} className="mx-auto animate-spin" />
                                                            : 'Delete'
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

export default Expenses;
