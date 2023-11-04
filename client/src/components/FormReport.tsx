import { createReport } from '@/routes/reportRoutes';
import React, { useState } from 'react';
import type { FormReportState, Toast } from '@/types/types';
import { useAppContext } from '@/context/AppContext';
import { BiLoaderAlt } from 'react-icons/bi';

const FormReport: React.FC<Toast> = ({ toast }) => {
    const { setReport } = useAppContext();
    const [loader, setLoader] = useState<boolean>(false);
    const [formReport, setFormReport] = useState<FormReportState>({
        month: '',
        income: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormReport({ ...formReport, [e.target.name]: e.target.value });
    };

    const handleCreateReport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        const res = await createReport(formReport);
        if (res) {
            toast.success(res.message);
            setLoader(false);
            setReport(prevReport => [...prevReport, res.report]);
        }
    };

    return (
        <form onSubmit={handleCreateReport} className='mt-3 md:m-0 sm:w-full flex flex-col gap-4 rounded-md p-4 md:p-3 bg-gray-200 dark:bg-black'>
            <p className='md:text-start text-2xl font-semibold text-black dark:text-gray-200'>Create Report</p>
            <div className='flex flex-col gap-4 md:flex-row'>
                <div className='flex flex-col gap-1 items-start w-full'>
                    <label
                        htmlFor='Month'
                        className='pl-1 font-semibold text-[15px] dark:text-gray-100'
                    >
                        Month
                    </label>
                    <select
                        className='bg-gray-100 dark:bg-zinc-800 px-2 py-2 rounded-md text-black dark:text-gray-200 w-full'
                        id='Month'
                        name='month'
                        onChange={handleChange}
                    >
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div className='flex flex-col gap-1 items-start w-full'>
                    <label
                        htmlFor='Mount'
                        className='pl-1 font-semibold text-[15px] dark:text-gray-100'
                    >
                        Starting Money
                    </label>
                    <input
                        type='number'
                        id='Mount'
                        name='income'
                        onChange={handleChange}
                        placeholder='Example: 14500..'
                        className='w-full bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-md text-gray-600 placeholder:text-gray-500 dark:text-gray-200'
                    />
                </div>
            </div>
            <button
                type='submit'
                className='self-center md:self-end w-full cursor-pointer text-gray-100 dark:text-black px-5 py-[6px] md:py-[8px] rounded-md md:font-bold font-semibold bg-gradient-to-r from-color-green to-color-green-dark hover:opacity-80'
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

export default FormReport;
