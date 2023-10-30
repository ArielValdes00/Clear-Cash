import BoardReport from '@/components/BoardReport';
import FormReport from '@/components/FormReport';
import React from 'react';

const Index = (): JSX.Element => {
    return (
        <div className='bg-gray-200 dark:bg-black flex flex-grow'>
            <div className='flex flex-col gap-5 md:gap-10 justify-center mx-auto w-[90%] lg:w-[70%]'>
                <div className='flex flex-col md:grid grid-cols-2 gap-1 md:gap-6'>
                    <div className='text-center md:text-start'>
                        <h4 className='text-[43px] md:text-[44px] font-extrabold text-color-green shadow-text'>Welcome, Ariel!</h4>
                        <p className='text-lg text-gray-600 dark:text-gray-400'>Currently has no money.</p>
                    </div>
                    <FormReport />
                </div>
                <div className='border border-color-green w-full mx-auto rounded-md px-4 py-1 shadow'>
                    <BoardReport />
                </div>
            </div>
        </div>
    );
};

export default Index;
