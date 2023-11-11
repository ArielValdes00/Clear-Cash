import BoardReport from '@/components/BoardReport';
import FormReport from '@/components/FormReport';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAppContext } from '@/context/AppContext';

const index = (): JSX.Element => {
    const { user } = useAppContext();
    const [currentMoney, setCurrentMoney] = useState<number>(0);

    return (
        <ProtectedRoute>
            <div className='bg-gray-200 dark:bg-black flex flex-grow'>
                <div className='flex flex-col justify-evenly mx-auto w-[90%] lg:w-[85%]'>
                    <div className='flex flex-col md:items-center md:grid grid-cols-2'>
                        <div className='text-center md:text-start md:ml-4'>
                            <h4 className='text-[43px] md:text-[44px] font-extrabold text-black dark:text-gray-200 capitalize'>
                                Welcome, {user?.name}!
                            </h4>
                            <p className='text-lg text-gray-600 dark:text-gray-300 capitalize'>
                                you currently have
                                <strong className='text-gradient dark:text-color-green'> ${currentMoney}</strong>
                            </p>
                        </div>
                        <FormReport toast={toast} />
                    </div>
                    <div className='w-full mx-auto rounded-md px-4'>
                        <BoardReport setCurrentMoney={setCurrentMoney} toast={toast} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default index;
