import React from 'react';

const FormReport: React.FC = () => {
    return (
        <form className='mt-3 md:m-0 sm:w-full flex flex-col gap-5 rounded-md p-4 md:p-3 bg-gray-200 dark:bg-black border border-color-green shadow'>
            <p className='text-center md:text-start text-2xl font-semibold md:mb-2 text-gray-600 dark:text-color-green'>Create Report</p>
            <div className='flex flex-col gap-4 md:flex-row'>
                <div className='flex flex-col gap-1 items-start'>
                    <label
                        htmlFor='Month'
                        className='pl-1 font-semibold text-color-green text-[15px]'
                    >
                        Month
                    </label>
                    <select
                        className='bg-gray-300 dark:bg-black px-2 py-2 rounded-md text-gray-600 dark:text-gray-400 border border-color-green w-full'
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
                <div className='flex flex-col gap-1 items-start'>
                    <label
                        htmlFor='Mount'
                        className='pl-1 font-semibold text-color-green text-[15px]'
                    >
                        Starting Money
                    </label>
                    <input
                        type='number'
                        id='Mount'
                        placeholder='Example: 14500..'
                        className='w-full bg-gray-300 dark:bg-black px-3 py-2 rounded-md text-gray-600 placeholder:text-gray-500 dark:text-gray-700 border border-color-green'
                    />
                </div>
                <button
                    type='submit'
                    className='self-center md:self-end cursor-pointer text-gray-100 dark:text-black px-5 py-[6px] md:py-[8px] rounded-md font-extrabold lg:font-bold bg-color-green uppercase hover:bg-opacity-80'
                >
                    Create
                </button>
            </div>
        </form>
    );
};

export default FormReport;
