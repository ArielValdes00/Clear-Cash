import { getReports } from '@/routes/reportRoute';
import type { ReportWithExpensives, User } from '@/types/types';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
const AppContext = createContext<{
    report: ReportWithExpensives[] | []
    setReport: React.Dispatch<React.SetStateAction<any[]>>
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({
    report: [],
    setReport: () => null,
    user: null,
    setUser: () => null
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const router: NextRouter = useRouter();
    const [report, setReport] = useState<ReportWithExpensives[] | []>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const handleGetReport = async () => {
            if (user) {
                const res = await getReports(user?.id);
                setReport(res);
            }
        };
        handleGetReport();
    }, [router.asPath, user]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser) as User;
            setUser(user);
        }
    }, []);

    return (
        <AppContext.Provider value={{ report, setReport, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
