import DoughnutChart from '@/components/DoughnutChart';
import DoughnutLabels from '@/components/DoughnutLabels';
import ExpenseForm from '@/components/ExpenseForm';
import Expenses from '@/components/Expenses';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const monthPage = (): JSX.Element => {
    const router: NextRouter = useRouter();
    const { month } = router.query as { month: string };
    const [data, setData] = useState<number>(0);
    console.log(setData);
    return (
        <div className='flex mt-6 md:m-0 bg-gray-200 dark:bg-black items-center md:flex-grow dark:text-white'>
            <div className={`${data === 0 ? 'grid md:grid-cols-2 gap-10' : 'w-[41%]'} w-[80%] mx-auto`}>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-1 text-gray-700 dark:text-gray-400 text-sm'>
                        <Link href={'/dashboard'} className='flex items-center gap-1'>
                            <FaArrowLeft size={11} />
                            <strong className='underline'>Back</strong>
                        </Link>
                    </div>
                    <h3 className='text-2xl font-semibold mt-2'>{month} Report</h3>
                    <div className='flex justify-between py-2'>
                        <div className='2xl:text-2xl'>
                            <p>Current Money:</p>
                            <span className='font-bold'>$265</span>
                            <DoughnutLabels />
                        </div>
                        <DoughnutChart />
                    </div>
                    <ExpenseForm />
                </div>
                <Expenses />
            </div>
        </div>
    );
};

export default monthPage;
