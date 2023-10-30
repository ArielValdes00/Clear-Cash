import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface TableData {
    month: string
    initialMoney: string
    spentMoney: string
    currentMoney: string
    spentPercentage: string
}

const BoardReport: React.FC = () => {
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
        <div className="w-full">
            <table className="table-auto text-white w-full">
                <thead className="text-color-green">
                    <tr>
                        <th className="p-3 md:p-4 text-center">Month</th>
                        <th className="p-3 md:p-4 text-center">Initial Money</th>
                        <th className="p-3 md:p-4 text-center hidden md:block">Spent Money</th>
                        <th className="p-3 md:p-4 text-center">Current Money</th>
                        <th className="p-3 md:p-4 text-center hidden md:block">Spent Percentage</th>
                    </tr>
                </thead>
                <tbody className="text-center text-gray-600 dark:text-gray-400">
                    {data.map((item, index) => (
                        <tr key={index} className="border-t border-color-green">
                            <td className="p-2 py-3 md:p-4">{item.month}</td>
                            <td className="p-2 py-3 md:p-4">{item.initialMoney}</td>
                            <td className="p-2 py-3 md:p-4 hidden md:block">{item.spentMoney}</td>
                            <td className="p-2 py-3 md:p-4">{item.currentMoney}</td>
                            <td className="p-2 py-3 md:p-4 hidden md:block">{item.spentPercentage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center gap-3 items-center my-3">
                <button className="bg-color-green dark:text-black text-white p-2 rounded-md hover:bg-opacity-80">
                    <FaArrowLeft size={17} />
                </button>
                <p className='text-gray-600 dark:text-gray-400'>1 of 3</p>
                <button className="bg-color-green dark:text-black text-white p-2 rounded-md hover-bg-opacity-80">
                    <FaArrowRight size={17} />
                </button>
            </div>
        </div>
    );
};

export default BoardReport;