import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface ButtonsPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => void
}

const ButtonsPagination: React.FC<ButtonsPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
    };

    return (
        <div className="flex justify-center gap-3 items-center mt-4">
            <button
                type="button"
                className="text-gray-100 dark:text-black bg-gradient-to-r from-color-green to-color-green-dark p-2 rounded-md hover:opacity-80"
                onClick={() => { handlePageChange(currentPage - 1); }}
                disabled={currentPage <= 1}
            >
                <FaArrowLeft size={15} />
            </button>
            <p className="text-gray-600 dark:text-gray-400">
                {currentPage} of {totalPages}
            </p>
            <button
                type="button"
                className="text-gray-100 dark:text-black bg-gradient-to-r from-color-green to-color-green-dark p-2 rounded-md hover:opacity-80"
                onClick={() => { handlePageChange(currentPage + 1); }}
                disabled={currentPage >= totalPages}
            >
                <FaArrowRight size={15} />
            </button>
        </div>
    );
};

export default ButtonsPagination;
