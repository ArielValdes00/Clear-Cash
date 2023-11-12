import { deleteExpense } from '@/routes/expenseRoute';
import type { Expense } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import ArrayMapper from './misc/ArrayMapper';
import ButtonsPagination from './misc/ButtonsPagination';
import DropdownMenu from './misc/DropdownMenu';
import useMenuHandling from '@/utils/useMenuHandling';

const Expenses: React.FC<{ reportData: Expense[], setExpenses: React.Dispatch<React.SetStateAction<Expense[]>> }> =
    ({ reportData, setExpenses }) => {
        const { menuOpen, toggleMenu } = useMenuHandling<number>({ initialMenuState: null });
        const [loader, setLoader] = useState<boolean>(false);
        const [currentPage, setCurrentPage] = useState<number>(1);
        const [itemsPerPage, setItemsPerPage] = useState(5);
        const [selectedCategory, setSelectedCategory] = useState<string>('All');

        const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedCategory(e.target.value);
        };

        const filteredReportData = selectedCategory === 'All' ? reportData : reportData.filter(item => item.category === selectedCategory);

        const indexOfLastItem: number = currentPage * itemsPerPage;
        const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
        const reportDataReverse: Expense[] = [...filteredReportData].reverse();
        const currentItems: any[] = reportDataReverse?.slice(indexOfFirstItem, indexOfLastItem);

        useEffect(() => {
            const handleResize = () => {
                if (window.innerHeight >= 1000) {
                    setItemsPerPage(6);
                } else if (window.innerHeight >= 800) {
                    setItemsPerPage(5);
                } else {
                    setItemsPerPage(5);
                }
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        const handlePageChange = (newPage: number) => {
            setCurrentPage(newPage);
        };

        const handleDeleteExpense = async (e: React.MouseEvent<HTMLDivElement>, id: number) => {
            setLoader(true);
            const res = await deleteExpense(id);
            if (res) {
                const filteredData = reportData.filter(item => item.id !== id);
                setExpenses(filteredData);
                setLoader(false);
                if (currentItems.length <= 1 && currentPage > 1) {
                    handlePageChange(currentPage - 1);
                }
            }
        };

        return (
            <div className='mb-5 w-full select-none'>
                <div className='flex justify-between items-center mb-3'>
                    <p className='font-semibold text-xl'>Your Expensives</p>
                    <select
                        aria-label='Filter Categories'
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className='rounded-lg px-2 py-[5px] dark:text-black bg-gray-100 dark:bg-gray-200 w-1/3 shadow'>
                        <option value="All">All</option>
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
                <ArrayMapper data={currentItems} textPosition="" as="div">
                    {(card: any) => {
                        const date = new Date(card.created_at);
                        const formattedDate = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

                        return (
                            <div key={card.id} className='grid grid-cols-3 bg-gray-100 dark:text-gray-100 dark:bg-zinc-800 rounded-md pl-3 py-3 pr-2 my-3 text-black text-[15px] shadow'>
                                <div className='col-span-2 flex flex-col gap-'>
                                    <p>Expensive: <strong>${card.amount}</strong></p>
                                    <p>{card.description}</p>
                                </div>
                                <div className='ml-auto text-end flex gap-1'>
                                    <div className='flex flex-col'>
                                        <p className='font-semibold capitalize'>{card.category}</p>
                                        <p className='text-sm'>{formattedDate}</p>
                                    </div>
                                    <div className='relative'>
                                        <div className='flex gap-1'>
                                            <SlOptionsVertical
                                                size={18}
                                                tabIndex={0}
                                                onKeyDown={(e: any) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        toggleMenu(e, card.id);
                                                    }
                                                }}
                                                onClick={(e: React.MouseEvent<HTMLDivElement>) => { toggleMenu(e, card.id); }}
                                                className='mt-[0.4rem] cursor-pointer text-zinc-800 dark:text-gray-200 ml-auto'
                                            />
                                        </div>
                                        {menuOpen === card.id && (
                                            <DropdownMenu
                                                className='right-2 close-menu'
                                                item={card}
                                                handleDelete={handleDeleteExpense}
                                                loader={loader}
                                                toggleMenu={toggleMenu}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </ArrayMapper>
                {reportData.length > 5 && (
                    <ButtonsPagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(reportData.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        );
    };

export default Expenses;
