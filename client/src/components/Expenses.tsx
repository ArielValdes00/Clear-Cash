import React from 'react';

interface ExpensiveData {
    expenses: number
    description: string
    category: string
    date: Date
}

const Expenses: React.FC = () => {
    const data: ExpensiveData[] = [
        {
            expenses: 100.0,
            description: 'Investment in stocks',
            category: 'Investments',
            date: new Date('2023-10-15')
        },
        {
            expenses: 50.0,
            description: 'New pair of jeans',
            category: 'Clothing',
            date: new Date('2023-10-20')
        },
        {
            expenses: 20.0,
            description: 'Lunch at a restaurant',
            category: 'Food',
            date: new Date('2023-10-25')
        },
        {
            expenses: 300.0,
            description: 'Weekend trip',
            category: 'Travel',
            date: new Date('2023-10-28')
        },
        {
            expenses: 250.0,
            description: 'Pizza with friends',
            category: 'Food',
            date: new Date('2023-10-12')
        }
    ];

    return (
        <div className='mb-5'>
            <div className='flex justify-between items-center mb-3'>
                <p className='font-semibold text-xl'>Your Expensives</p>
                <select className='rounded-lg px-2 py-[5px] dark:text-black bg-gray-100 dark:bg-gray-200 w-1/3 shadow'>
                    <option value="All">All</option>
                    <option value="Investments">Investments</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="travels">travels</option>
                </select>
            </div>
            <div>
                {data.map((card: ExpensiveData, index: number) => (
                    <div key={index} className='grid grid-cols-3 bg-gray-100 dark:text-gray-100 dark:bg-zinc-800 rounded-md p-3 my-2 text-black text-[15px] shadow'>
                        <div className='col-span-2 flex flex-col gap-1'>
                            <p>Expensive: <strong>${card.expenses}</strong></p>
                            <p>{card.description}</p>
                        </div>
                        <div className='ml-auto text-end flex flex-col gap-1'>
                            <p className='font-semibold'>{card.category}</p>
                            <p className='text-sm'>{card.date.toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expenses;
