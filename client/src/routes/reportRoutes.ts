import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FormReportState, Report } from '@/types/types';

interface ReportResponse {
    message: string
    report?: Report
}

interface GetReportResponse extends Array<Report> {}

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

export const getReport = async (): Promise<GetReportResponse> => {
    try {
        const res: AxiosResponse<GetReportResponse> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report`
        );
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message
        );
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
