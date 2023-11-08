import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import ButtonsPagination from './misc/ButtonsPagination';
import { useAppContext } from '@/context/AppContext';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteReport } from '@/routes/reportRoute';
import type { ReportWithExpensives, Toast } from '@/types/types';
import { BiLoaderAlt } from 'react-icons/bi';
import ArrayMapper from './misc/ArrayMapper';
import { useTheme } from '@/context/ThemeContext';

interface LoaderState {
    [key: number]: boolean
}

const BoardReport: React.FC<Toast> = ({ toast }) => {
    const { report, setReport } = useAppContext();
    const { theme } = useTheme();
    const [loader, setLoader] = useState<LoaderState>({});
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

    const router: NextRouter = useRouter();

    const handleDeleteReport = async (id: number) => {
        setLoader((prevLoader) => ({
            ...prevLoader,
            [id]: true
        }));

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
            setLoader((prevLoader) => ({
                ...prevLoader,
                [id]: false
            }));
        }
    };

    return (
        <>
            {report?.length > 0 && (
                <div className="w-full rounded-md">
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
                            {(item: any) => {
                                const totalSpent = item.expenses?.reduce((total: any, expense: any) => total + Number(expense.amount), 0);
                                const percentageSpent = Math.round((totalSpent / item.income) * 100);
                                const getColor = (percentage: number, theme: string) => {
                                    const hue: any = ((1 - percentage / 100) * 120).toString(10);
                                    return theme === 'dark' ? ['hsl(', hue, ',100%,50%)'].join('') : ['hsl(', hue, ',100%,40%)'].join('');
                                };
                                return (
                                    <tr
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
                                        <td className="p-2 py-3 md:p-4">
                                            {loader[item.id]
                                                ? (
                                                    <BiLoaderAlt size={20} className="ml-auto animate-spin" />
                                                )
                                                : (
                                                    <BsFillTrashFill
                                                        size={20}
                                                        className="ml-auto text-red-600 hover:text-red-700"
                                                        onClick={async (e: any) => {
                                                            e.stopPropagation();
                                                            await handleDeleteReport(item.id);
                                                        }}
                                                    />
                                                )}
                                        </td>
                                    </tr>
                                );
                            }}
                        </ArrayMapper>
                    </table>
                    <ButtonsPagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(report.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </>
    );
};

export default BoardReport;
