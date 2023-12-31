import React, { useEffect, useState } from 'react';
import DoughnutChart from '@/components/DoughnutChart';
import DoughnutLabels from '@/components/DoughnutLabels';
import ExpenseForm from '@/components/ExpenseForm';
import Expenses from '@/components/Expenses';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import { getReport } from '@/routes/reportRoute';
import type { ReportWithExpensives } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';

interface ReportIdPageProps {
    reportData: ReportWithExpensives
    month: string
}

const ReportPage: React.FC<ReportIdPageProps> = ({ reportData, month }) => {
    const router = useRouter();
    const id = Number(router.query.id);
    const [expenses, setExpenses] = useState(reportData?.expenses || []);
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
                        <Link href={'/dashboard'} className='flex items-center gap-1'>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, params } = context;
    const { cookies } = req;

    if (cookies.token) {
        const reportId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

        if (reportId) {
            const reportData = await getReport(reportId);
            const month = reportData.month;
            return {
                props: {
                    reportData,
                    month
                }
            };
        }
    }

    return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    };
}

export default ReportPage;
