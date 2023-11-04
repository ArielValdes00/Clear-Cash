import React from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import ButtonsPagination from './misc/ButtonsPagination';
import { useAppContext } from '@/context/AppContext';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteReport } from '@/routes/reportRoutes';
import type { Toast } from '@/types/types';

const BoardReport: React.FC<Toast> = ({ toast }) => {
    const { report, setReport } = useAppContext();

    const router: NextRouter = useRouter();

    const handleDeleteReport = async (id: number) => {
        const res = await deleteReport(id);
        toast.error(res.message);
        const filterDelete = report.filter(item => item.id !== id);
        setReport(filterDelete);
    };

    return (
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
                <tbody className="text-end">
                    {report?.map((item: any) => (
                        <tr
                            onClick={async () => { await router.push(`/dashboard/${item.month}`); }}
                            key={item.id}
                            className="border-b border-black dark:border-gray-100 cursor-pointer bg-gray-100 dark:bg-zinc-800 text-black dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-opacity-80"
                        >
                            <td className="p-2 py-3 md:p-4">{item.month}</td>
                            <td className="p-2 py-3 md:p-4">${item.income}</td>
                            <td className="p-2 py-3 md:p-4 hidden md:block">${!item.spentMoney && 0}</td>
                            <td className="p-2 py-3 md:p-4">${!item.currentMoney ? item.income : 0}</td>
                            <td className="p-2 py-3 md:p-4 hidden md:block">{!item.spentPercentage && 0}%</td>
                            <td
                                className="p-2 py-3 md:p-4 text-red-600">
                                <BsFillTrashFill size={20}
                                    onClick={async (e: any) => {
                                        e.stopPropagation();
                                        await handleDeleteReport(item.id);
                                    }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ButtonsPagination />
        </div>
    );
};

export default BoardReport;
