import type { toast } from 'react-toastify';

export interface FormReportState {
    month: string
    income: number | null
};

export interface Report {
    id: number
    month: string
    income: number
    created_at: string
    updated_at: string
  }

export interface Toast {
  toast: typeof toast
};
