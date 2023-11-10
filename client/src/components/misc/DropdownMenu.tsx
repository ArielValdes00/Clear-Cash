import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface ExpenseCardProps {
    item: any
    handleDelete: (e: React.MouseEvent<HTMLDivElement>, id: number) => Promise<void>
    loader: boolean
    className: string
    toggleMenu: (e: React.MouseEvent<HTMLDivElement>, id: number) => void
}

const DropdownMenu: React.FC<ExpenseCardProps> = ({ handleDelete, loader, item, className, toggleMenu }) => {
    return (
        <div className={`${className} z-50 absolute mt-[.2rem] bg-gray-100 dark:bg-zinc-800 border border-gray-400 rounded-l-lg rounded-br-lg shadow-md`}>
            <ul>
                <li
                    tabIndex={0}
                    onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                            toggleMenu(e, item.id);
                            handleDelete(e, item.id);
                        }
                    }}
                    onClick={async (e: any) => {
                        await handleDelete(e, item.id);
                        toggleMenu(e, item.id);
                    }}
                    className='w-24 border-2 text-center py-[.4rem] text-sm hover:bg-gray-200 dark:hover:bg-black cursor-pointer rounded-l-lg rounded-br-lg'>
                    {loader
                        ? <BiLoaderAlt size={20} className="mx-auto animate-spin" />
                        : 'Delete'
                    }
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;
