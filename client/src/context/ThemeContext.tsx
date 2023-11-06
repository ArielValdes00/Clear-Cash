import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextProps {
    theme: string
    toggleButton: boolean
    handleChangeTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode, value: ThemeContextProps }> = ({ children, value }) => {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
