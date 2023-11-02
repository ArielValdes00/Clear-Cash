import DoughnutChart from '@/components/DoughnutChart';
import DoughnutLabels from '@/components/DoughnutLabels';
import ExpenseForm from '@/components/ExpenseForm';
import Expenses from '@/components/Expenses';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';

const monthPage = (): JSX.Element => {
    const router: NextRouter = useRouter();
    const { month } = router.query as { month: string };
    return (
        <div className='flex mt-6 md:m-0 bg-gray-200 dark:bg-black items-center md:flex-grow dark:text-white'>
            <div className='grid md:grid-cols-2 gap-10 w-[80%] mx-auto'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-2xl font-semibold'>{month} Report</h3>
                    <div className='flex justify-between py-2'>
                        <div className=''>
                            <p>Current Money:</p>
                            <span className='font-bold'>$265</span>
                            <DoughnutLabels />
                        </div>
                        <DoughnutChart />
                    </div>
                    <ExpenseForm />
                </div>
                <div>
                    <Expenses />
                </div>
            </div>
        </div>
    );
};

export default monthPage;
