import BoardReport from '@/components/BoardReport';
import FormReport from '@/components/FormReport';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

 const index = (): JSX.Element => {
    return (
        <div className='bg-gray-200 dark:bg-black flex flex-grow'>
            <div className='flex flex-col gap-5 justify-center mx-auto w-[90%] lg:w-[70%]'>
                <div className='flex flex-col md:items-center md:grid grid-cols-2'>
                    <div className='text-center md:text-start md:ml-4'>
                        <h4 className='text-[43px] md:text-[44px] font-extrabold text-black dark:text-gray-200'>Welcome, Ariel!</h4>
                        <p className='text-lg text-gray-600 dark:text-gray-300 capitalize'>you currently have <strong className='text-gradient dark:text-color-green'>$275</strong></p>
                    </div>
                    <FormReport toast={toast}/>
                </div>
                <div className='w-full mx-auto rounded-md px-4'>
                    <BoardReport toast={toast}/>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
        </div>
    );
};

export default index;
