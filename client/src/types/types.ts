import type { toast } from 'react-toastify';

export interface FormReportState {
    month: string
    income: number
};

export interface Toast {
  toast: typeof toast
};
