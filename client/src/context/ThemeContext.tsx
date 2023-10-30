import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface NavbarProps {
    handleChangeTheme: () => void
    toggleButton: boolean
}

const ThemeContext = createContext<NavbarProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode, value: NavbarProps }> = ({ children, value }) => {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
