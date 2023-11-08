import { getReports } from '@/routes/reportRoute';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext<{
    report: any[]
    setReport: React.Dispatch<React.SetStateAction<any[]>>
}>({
    report: [],
    setReport: () => null
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [report, setReport] = useState<any[]>([]);

    useEffect(() => {
        const handleGetReport = async () => {
            const res = await getReports();
            setReport(res);
        };
        handleGetReport();
    }, []);

    return (
        <AppContext.Provider value={{ report, setReport }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
