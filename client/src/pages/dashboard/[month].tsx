import DoughnutChart from '@/components/DoughnutChart';
import DoughnutLabels from '@/components/DoughnutLabels';
import Expenses from '@/components/Expenses';
import { useRouter } from 'next/router';

const monthPage = (): JSX.Element => {
    const router = useRouter();
    const { month } = router.query;
    return (
        <div className='flex bg-gray-200 dark:bg-black items-center md:flex-grow dark:text-white'>
            <div className='grid md:grid-cols-2 gap-10 w-[80%] mx-auto'>
                <div>
                    <h3 className='text-3xl'>{month} Report</h3>
                    <div className='flex justify-between py-2'>
                        <div className=''>
                            <p>Current Money:</p>
                            <span className='font-bold'>$265</span>
                            <DoughnutLabels />
                        </div>
                        <DoughnutChart />
                    </div>
                </div>
                <div>
                    <Expenses />
                </div>
            </div>
        </div>
    );
};

export default monthPage;
