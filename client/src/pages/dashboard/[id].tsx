import React, { useEffect, useState } from 'react';
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

const ReportPage: React.FC<{ reportData: ReportWithExpensives }> = ({ reportData }) => {
    const router = useRouter();
    const id = Number(router.query.id);
    const [expenses, setExpenses] = useState(reportData?.expenses || []);
    const month: string = reportData?.month;
    const [categories, setCategories] = useState<string[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number[]>([]);
    const [totalAmount, setTotalAmount] = useState<any>(0);

    useEffect(() => {
        const totalSpend = expenses?.reduce((total: any, expense: any) => total + Number(expense.amount), 0);
        const remainingAmount = reportData?.income - totalSpend;
        setTotalAmount(remainingAmount);
        let newExpensesByCategory: { [key: string]: number } = {};
        newExpensesByCategory = expenses?.reduce((acc: { [key: string]: number }, curr) => {
            if (!acc[curr.category]) {
                acc[curr.category] = 0;
            }
            acc[curr.category] += Number(curr.amount);
            return acc;
        }, {}) || {};

        setCategories(Object.keys(newExpensesByCategory));
        setTotalExpenses(Object.values(newExpensesByCategory));
    }, [expenses]);

    return (
        <div className='flex mt-6 md:m-0 bg-gray-200 dark:bg-black items-center md:flex-grow dark:text-white'>
            <div className={`${expenses?.length > 0 ? 'grid lg:grid-cols-2 gap-10 md:w-[60%] lg:w-[85%] xl:w-[80%]' : 'md:w-[60%] lg:w-[40%]'} w-[90%] mx-auto`}>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-1 text-gray-700 dark:text-gray-400 text-sm'>
                        <Link href='/dashboard' className='flex items-center gap-1'>
                            <FaArrowLeft size={11} />
                            <strong className='underline'>Back</strong>
                        </Link>
                    </div>
                    <h3 className='text-2xl font-semibold mt-2'>{month} Report</h3>
                    <div className='flex justify-between py-2'>
                        <div className='2xl:text-2xl'>
                            <p>Current Money:</p>
                            <span className='font-bold'>${totalAmount}</span>
                            <DoughnutLabels categories={categories} />
                        </div>
                        <DoughnutChart totalExpenses={totalExpenses} totalAmount={totalAmount} />
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
        fallback: true
    };
}

export async function getStaticProps({ params }: { params: ParsedUrlQuery }) {
    if (!params.id) {
        console.log('params not found');
        return { props: { error: 'params not found' } };
    } else {
        const id = parseInt(params.id as string, 10);

        const reportData = await getReport(id);
        const month = reportData?.month;
        if (!reportData) {
            console.log('report not found');
            return { props: { error: 'report not found' } };
        }

        return {
            props: {
                reportData,
                month
            }
        };
    }
}

export default ReportPage;
