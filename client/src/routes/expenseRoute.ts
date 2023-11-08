import type { ExpenseResponse, FormExpenseState } from '@/types/types';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

export const createExpense = async (expenseData: FormExpenseState) => {
    try {
        const res: AxiosResponse<ExpenseResponse> = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/expense`, expenseData);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

export const deleteExpense = async (id: number): Promise<ExpenseResponse> => {
    try {
        const res: AxiosResponse<ExpenseResponse> = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/expense/${id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};
