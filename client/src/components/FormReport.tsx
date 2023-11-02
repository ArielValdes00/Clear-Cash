import React from 'react';

const FormReport: React.FC = () => {
    return (
        <form className='mt-3 md:m-0 sm:w-full flex flex-col gap-5 rounded-md p-4 md:p-3 bg-gray-200 dark:bg-black'>
            <p className='md:text-start text-2xl font-semibold text-black dark:text-gray-200'>Create Report</p>
            <div className='flex flex-col gap-4 md:flex-row'>
                <div className='flex flex-col gap-1 items-start w-full'>
                    <label
                        htmlFor='Month'
                        className='pl-1 font-semibold text-[15px] dark:text-gray-100'
                    >
                        Month
                    </label>
                    <select
                        className='bg-gray-100 px-2 py-2 rounded-md text-black w-full'
                        id='Month'
                    >
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div className='flex flex-col gap-1 items-start w-full'>
                    <label
                        htmlFor='Mount'
                        className='pl-1 font-semibold text-[15px] dark:text-gray-100'
                    >
                        Starting Money
                    </label>
                    <input
                        type='number'
                        id='Mount'
                        placeholder='Example: 14500..'
                        className='w-full bg-gray-100 px-3 py-2 rounded-md text-gray-600 placeholder:text-gray-500 dark:text-gray-700'
                    />
                </div>
            </div>
            <button
                type='submit'
                className='self-center md:self-end w-full cursor-pointer text-gray-100 px-5 py-[6px] md:py-[8px] rounded-md font-extrabold lg:font-bold bg-color-green hover:bg-opacity-80'
            >
                Create
            </button>
        </form>
    );
};

export default FormReport;
