import { createReport } from '@/routes/reportRoute';
import React, { useState } from 'react';
import type { FormReportState, User } from '@/types/types';
import type { toast } from 'react-toastify';
import { isValueValid } from '@/utils/validations';
import LoadingButton from './misc/LoadingButton';

interface FormReportProps {
    toast: typeof toast
    setReport: React.Dispatch<React.SetStateAction<any[]>>
    user: User | null
}

const FormReport: React.FC<FormReportProps> = ({ toast, setReport, user }) => {
    const [loader, setLoader] = useState<boolean>(false);
    const [formReport, setFormReport] = useState<FormReportState>({
        month: 'January',
        income: null,
        expenses: [],
        user_id: user?.id
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormReport({ ...formReport, [e.target.name]: e.target.value });
    };

    const handleCreateReport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        try {
            const incomeValue = formReport.income !== null ? formReport.income.toString() : '';
            if (!isValueValid(incomeValue)) {
                toast.error('Income is not valid. It cannot be empty, start with 0, or contain symbols.');
                setLoader(false);
                return;
            }
            if (user) {
                const res = await createReport(formReport);
                if (res) {
                    toast.success(res.message);
                    setLoader(false);
                    setReport(prevReport => [...prevReport, res.report]);
                    setFormReport({ month: formReport.month, income: null, expenses: [], user_id: user?.id });
                }
            }
        } catch (error: any) {
            toast.error(error.message);
            setLoader(false);
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
                        aria-label='Select Month'
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
                        value={formReport.income === null ? '' : formReport.income.toString()}
                        onChange={handleChange}
                        aria-label='Starting Money'
                        placeholder='Example: 14500..'
                        className='w-full bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-md text-gray-600 placeholder:text-gray-500 dark:text-gray-200'
                    />
                </div>
            </div>
            <LoadingButton
                isLoading={loader}
                label="Submit"
            />
        </form>
    );
};

export default FormReport;
