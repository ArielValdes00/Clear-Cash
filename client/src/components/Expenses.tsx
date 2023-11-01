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
        }
    ];

    return (
        <div className='border rounded-md border-black dark:border-color-green p-5'>
            <div className='flex justify-between items-center'>
                <p>Your Expensives</p>
                <select className='rounded-lg p-1 dark:text-black'>
                    <option value="Todos">All</option>
                    <option value="Inversiones">Investments</option>
                    <option value="Ropa">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="travels">travels</option>
                </select>
            </div>
            <div>
                {data.map((card: ExpensiveData, index: number) => (
                    <div key={index} className='grid grid-cols-2 border border-black dark:border-color-green rounded-md p-3 my-3'>
                        <div>
                            <p>Expensive: ${card.expenses}</p>
                            <p>Description: {card.description}</p>
                        </div>
                        <div className='ml-auto'>
                            <p>{card.category}</p>
                            <p>{card.date.toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expenses;
