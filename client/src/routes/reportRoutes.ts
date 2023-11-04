import axios from 'axios';
import type { FormReportState } from '@/types/types';

export const createReport = async (reportData: FormReportState) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/report`, reportData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getReport = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/report`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteReport = async (id: number) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/report/${id}`);
        return res.data;
    } catch (error) {
       console.log(error);
    }
};
