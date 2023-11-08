import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FormReportState, ReportResponse } from '@/types/types';

export const createReport = async (reportData: FormReportState): Promise<ReportResponse> => {
    try {
        const res: AxiosResponse<ReportResponse> = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report`,
            reportData
        );
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message
        );
    }
};

export const getReports = async () => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report`
        );
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message
        );
    }
};

export const getReport = async (id: number) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/report/${id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

export const deleteReport = async (id: number): Promise<ReportResponse> => {
    try {
        const res: AxiosResponse<ReportResponse> = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report/${id}`
        );
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message
        );
    }
};
