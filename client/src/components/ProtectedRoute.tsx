import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
    children: React.ReactNode
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            if (!storedToken) {
                router.push('/login');
            }
        }
    }, []);

    if (!token) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
