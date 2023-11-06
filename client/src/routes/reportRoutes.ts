import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FormReportState, Report } from '@/types/types';

interface ApiResponse {
    message: string
    report?: Report
}

export const createReport = async (reportData: FormReportState): Promise<ApiResponse> => {
    try {
        const res: AxiosResponse<ApiResponse> = await axios.post(
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

export const getReport = async (): Promise<ApiResponse> => {
    try {
        const res: AxiosResponse<ApiResponse> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report`
        );
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message
        );
    }
};

export const deleteReport = async (id: number): Promise<ApiResponse> => {
    try {
        const res: AxiosResponse<ApiResponse> = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report/${id}`
        );
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message
        );
    }
};
