import { getReports } from '@/routes/reportRoute';
import type { ReportWithExpensives } from '@/types/types';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
const AppContext = createContext<{
    report: ReportWithExpensives[] | []
    setReport: React.Dispatch<React.SetStateAction<any[]>>
}>({
    report: [],
    setReport: () => null
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const router: NextRouter = useRouter();
    const [report, setReport] = useState<any[]>([]);

    useEffect(() => {
        const handleGetReport = async () => {
            const res = await getReports();
            setReport(res);
        };
        handleGetReport();
    }, [router.asPath]);

    return (
        <AppContext.Provider value={{ report, setReport }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
