import React from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import ButtonsPagination from './misc/ButtonsPagination';

interface TableData {
    month: string
    initialMoney: string
    spentMoney: string
    currentMoney: string
    spentPercentage: string
}

const BoardReport: React.FC = () => {
    const router: NextRouter = useRouter();
    const data: TableData[] = [
        {
            month: 'January',
            initialMoney: '$1000',
            spentMoney: '$20',
            currentMoney: '$800',
            spentPercentage: '20%'
        },
        {
            month: 'February',
            initialMoney: '$800',
            spentMoney: '$150',
            currentMoney: '$650',
            spentPercentage: '18.75%'
        },
        {
            month: 'March',
            initialMoney: '$650',
            spentMoney: '$100',
            currentMoney: '$550',
            spentPercentage: '15.38%'
        }
    ];

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
                    {data.map((item: TableData, index: number) => (
                        <tr
                            onClick={async () => { await router.push(`/dashboard/${item.month}`); }}
                            key={index}
                            className="border-b border-black dark:border-gray-100 cursor-pointer bg-gray-100 dark:bg-zinc-800 text-black dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-opacity-80"
                        >
                            <td className="p-2 py-3 md:p-4">{item.month}</td>
                            <td className="p-2 py-3 md:p-4">{item.initialMoney}</td>
                            <td className="p-2 py-3 md:p-4 hidden md:block">{item.spentMoney}</td>
                            <td className="p-2 py-3 md:p-4">{item.currentMoney}</td>
                            <td className="p-2 py-3 md:p-4 hidden md:block">{item.spentPercentage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ButtonsPagination />
        </div>
    );
};

export default BoardReport;
