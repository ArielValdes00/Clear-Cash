import { getReport } from '@/routes/reportRoutes';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext<{
    report: any[]
    setReport: React.Dispatch<React.SetStateAction<any[]>>
    expense: any[]
    setExpense: React.Dispatch<React.SetStateAction<any[]>>
}>({
    report: [],
    setReport: () => null,
    expense: [],
    setExpense: () => null
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [report, setReport] = useState<any[]>([]);
    const [expense, setExpense] = useState<any[]>([]);

    useEffect(() => {
        const handleGetReport = async () => {
            const res = await getReport();
            setReport(res);
        };
        handleGetReport();
    }, []);

    return (
        <AppContext.Provider value={{ report, setReport, expense, setExpense }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
