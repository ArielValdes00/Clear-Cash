import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<string>('light');
    const [toggleButton, setToggleButton] = useState<boolean>(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html')?.classList.add('dark');
        } else {
            document.querySelector('html')?.classList.remove('dark');
        }
    }, [theme]);

    const handleChangeTheme = (): void => {
        setTheme((prevTheme: string) => prevTheme === 'dark' ? 'light' : 'dark');
        setToggleButton(!toggleButton);
    };

    return (
        <ThemeProvider value={{ handleChangeTheme, toggleButton }}>
            <div className='h-screen bg-gray-200 dark:bg-black flex flex-col'>
                <Navbar />
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    );
}
