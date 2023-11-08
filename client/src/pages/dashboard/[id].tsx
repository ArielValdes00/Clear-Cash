import React, { useState } from 'react';
import DoughnutChart from '@/components/DoughnutChart';
import DoughnutLabels from '@/components/DoughnutLabels';
import ExpenseForm from '@/components/ExpenseForm';
import Expenses from '@/components/Expenses';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import { getReport, getReports } from '@/routes/reportRoute';
import type { ParsedUrlQuery } from 'querystring';
import type { ReportWithExpensives } from '@/types/types';
import { useAppContext } from '@/context/AppContext';

const ReportPage: React.FC<{ reportData: ReportWithExpensives }> = ({ reportData }) => {
    const router = useRouter();
    const { report } = useAppContext();
    const id = Number(router.query.id);
    const [expenses, setExpenses] = useState(reportData.expenses);
    const month: any = report.find(item => item.id === id);

    return (
        <div className='flex mt-6 md:m-0 bg-gray-200 dark:bg-black items-center md:flex-grow dark:text-white'>
            <div className={`${expenses.length > 0 ? 'grid md:grid-cols-2 gap-10 w-[80%]' : 'w-[40%]'} mx-auto`}>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-1 text-gray-700 dark:text-gray-400 text-sm'>
                        <Link href='/dashboard' className='flex items-center gap-1'>
                            <FaArrowLeft size={11} />
                            <strong className='underline'>Back</strong>
                        </Link>
                    </div>
                    <h3 className='text-2xl font-semibold mt-2'>{month?.month} Report</h3>
                    <div className='flex justify-between py-2'>
                        <div className='2xl:text-2xl'>
                            <p>Current Money:</p>
                            <span className='font-bold'>$265</span>
                            <DoughnutLabels />
                        </div>
                        <DoughnutChart />
                    </div>
                    <ExpenseForm reportId={id} setExpenses={setExpenses} />
                </div>
                {expenses.length > 0 && <Expenses setExpenses={setExpenses} reportData={expenses} />}
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const reports = await getReports();

    const paths = reports.map((report: any) => ({
        params: { id: report.id.toString() }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }: { params: ParsedUrlQuery }) {
    if (!params.id) {
        console.log('params not found');
    } else {
        const id = parseInt(params.id as string, 10);

        const reportData = await getReport(id);
        if (!reportData.expenses) {
            reportData.expenses = [];
        }

        return {
            props: {
                reportData
            }
        };
    }
}

export default ReportPage;