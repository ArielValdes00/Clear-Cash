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

export interface ReportResponse {
    message?: string
    report?: Report
}

export interface FormExpenseState {
    report_id: number
    amount: number | null
    description: string
    category: string
}

export interface Expense {
    id: number
    report_id: number
    amount: number
    description: string
    category: string
    created_at: string
    updated_at: string
}

export interface ExpenseFormProps {
    reportId: number
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export interface ExpenseResponse {
    message?: string
    expense?: Expense[]
}

export interface Toast {
  toast: typeof toast
};

export interface ReportWithExpensives {
    id: number
    income: number
    month: string
    expenses: Expense[]
    created_at: string
    updated_at: string
}
