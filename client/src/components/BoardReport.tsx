import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import ButtonsPagination from './misc/ButtonsPagination';
import { deleteReport } from '@/routes/reportRoute';
import type { ReportWithExpensives } from '@/types/types';
import ArrayMapper from './misc/ArrayMapper';
import { useTheme } from '@/context/ThemeContext';
import type { toast } from 'react-toastify';
import DropdownMenu from './misc/DropdownMenu';
import { SlOptionsVertical } from 'react-icons/sl';
import useMenuHandling from '@/utils/useMenuHandling';

interface BoardProps {
    toast: typeof toast
    setCurrentMoney: React.Dispatch<React.SetStateAction<number>>
    report: ReportWithExpensives[]
    setReport: React.Dispatch<React.SetStateAction<any[]>>
}

const BoardReport: React.FC<BoardProps> = ({ toast, setCurrentMoney, report, setReport }) => {
    const { theme } = useTheme();
    const router: NextRouter = useRouter();
    const { menuOpen, toggleMenu } = useMenuHandling<number>({ initialMenuState: null });
    const [loader, setLoader] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const reportReverse: ReportWithExpensives[] = [...report].reverse();
    const currentItems: any[] = reportReverse?.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight >= 1000) {
                setItemsPerPage(6);
            } else if (window.innerHeight >= 800) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [report]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleDeleteReport = async (e: React.MouseEvent<HTMLDivElement>, id: number) => {
        e.stopPropagation();
        setLoader(true);
        try {
            const res = await deleteReport(id);
            if (res) {
                const filterDelete = report.filter((item) => item.id !== id);
                setReport(filterDelete);
                if (currentItems.length <= 1 && currentPage > 1) {
                    handlePageChange(currentPage - 1);
                }
            }
            toast.error(res.message);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    const totalCurrent: any = report.reduce((total, item) => {
        const totalSpent = item.expenses?.reduce((total: any, expense: any) => total + Number(expense.amount), 0);
        const current = item.income - totalSpent;
        return total + current;
    }, 0);

    const getColor = (percentage: number, theme: string) => {
        const hue: any = ((1 - percentage / 100) * 120).toString(10);
        return theme === 'dark' ? ['hsl(', hue, ',100%,50%)'].join('') : ['hsl(', hue, ',100%,40%)'].join('');
    };
    useEffect(() => {
        setCurrentMoney(totalCurrent);
    }, [currentItems]);

    return (
        <>
            {report?.length > 0 && (
                <div className="w-full rounded-md select-none">
                    <table className="table-auto w-full">
                        <thead className="text-end border-black dark:border-gray-100 border-b dark:text-gray-100">
                            <tr>
                                <th className="p-3 md:p-4">Month</th>
                                <th className="p-3 md:p-4">Initial Money</th>
                                <th className="p-3 md:p-4 hidden md:block">Spent Money</th>
                                <th className="p-3 md:p-4">Current Money</th>
                                <th className="p-3 md:p-4 hidden md:block">Spent Percentage</th>
                            </tr>
                        </thead>
                        <ArrayMapper data={currentItems} textPosition='text-end' as='tbody'>
                            {(item: ReportWithExpensives) => {
                                const totalSpent = item.expenses?.reduce((total: any, expense: any) => total + Number(expense.amount), 0);
                                const percentageSpent = Math.round((totalSpent / item.income) * 100);
                                return (
                                    <tr
                                        tabIndex={0}
                                        onKeyDown={(e: any) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                router.push(`/dashboard/${item.id}`);
                                            }
                                        }}
                                        onClick={async () => {
                                            await router.push(`/dashboard/${item.id}`);
                                        }}
                                        key={item.id}
                                        className="border-b border-black dark:border-gray-100 cursor-pointer bg-gray-100 dark:bg-zinc-800 text-black dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-opacity-80"
                                    >
                                        <td className="p-2 py-3 md:p-4">{item.month}</td>
                                        <td className="p-2 py-3 md:p-4">${item.income}</td>
                                        <td className="p-2 py-3 md:p-4 hidden md:block">${totalSpent}</td>
                                        <td className="p-2 py-3 md:p-4">${item.income - totalSpent}</td>
                                        <td className="p-2 py-3 md:p-4 hidden md:block font-semibold"
                                            style={{ color: getColor(percentageSpent, theme) }}
                                        >{percentageSpent}%</td>
                                        <td className="p-2 py-3 md:p-4 relative">
                                            <div>
                                                <SlOptionsVertical
                                                    size={18}
                                                    tabIndex={0}
                                                    onKeyDown={(e: any) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            toggleMenu(e, item.id);
                                                        }
                                                    }}
                                                    onClick={(e: any) => { toggleMenu(e, item.id); }}
                                                    className='mt-[0.4rem] cursor-pointer text-zinc-800 dark:text-gray-200 ml-auto'
                                                />
                                            </div>
                                            {menuOpen === item.id && (
                                                <DropdownMenu
                                                    className='right-4 md:right-6 close-menu'
                                                    item={item}
                                                    handleDelete={handleDeleteReport}
                                                    loader={loader}
                                                    toggleMenu={toggleMenu}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                );
                            }}
                        </ArrayMapper>
                    </table>
                    {reportReverse.length > 3 && (
                        <ButtonsPagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(report.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default BoardReport;
