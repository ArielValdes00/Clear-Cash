import DoughnutChart from '@/components/DoughnutChart';
import { useRouter } from 'next/router';
import React from 'react';

const monthPage = (): JSX.Element => {
    const router = useRouter();
    const { month } = router.query;
    return (
        <div>
            <h3>{month} Report</h3>
            <div className='flex'>
                <div>
                    <p>Current Money:</p>
                    <span>$265</span>
                </div>
                <DoughnutChart />
            </div>
        </div>
    );
};

export default monthPage;
