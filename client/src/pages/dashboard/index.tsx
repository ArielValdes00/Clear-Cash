import BoardReport from '@/components/BoardReport';
import FormReport from '@/components/FormReport';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { getReports } from '@/routes/reportRoute';
import type { ReportWithExpensives } from '@/types/types';

interface DashboardProps {
    user: any
    reports: ReportWithExpensives[]
}

const index: React.FC<DashboardProps> = ({ user, reports }) => {
    const [currentMoney, setCurrentMoney] = useState<number>(0);
    const [report, setReport] = useState<ReportWithExpensives[] | []>(reports);
    return (
        <div className='bg-gray-200 dark:bg-black flex flex-grow'>
            <div className='flex flex-col justify-evenly mx-auto w-[90%] lg:w-[85%]'>
                <div className='flex flex-col md:items-center md:grid grid-cols-2'>
                    <div className='text-center md:text-start md:ml-4'>
                        <h4 className='text-[43px] md:text-[44px] font-extrabold text-black dark:text-gray-200 capitalize'>
                            Welcome, {user.name}!
                        </h4>
                        <p className='text-lg text-gray-600 dark:text-gray-300 capitalize'>
                            you currently have
                            <strong className='text-gradient dark:text-color-green'> ${currentMoney}</strong>
                        </p>
                    </div>
                    <FormReport toast={toast} setReport={setReport} user={user}/>
                </div>
                <div className='w-full mx-auto rounded-md px-4'>
                    <BoardReport setCurrentMoney={setCurrentMoney} toast={toast} report={report} setReport={setReport}/>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const { cookies } = req;
    const user = JSON.parse(cookies.user ?? '{}');
    const reports = await getReports(user.id);

    if (!cookies.token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    return {
        props: {
            reports,
            user
        }
    };
}

export default index;
