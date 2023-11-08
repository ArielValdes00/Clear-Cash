import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';
import Head from 'next/head';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
    const customStyle = {
        width: '400px'
    };
    const [theme, setTheme] = useState<string>('light');
    const [toggleButton, setToggleButton] = useState<boolean>(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html')?.classList.add('dark');
        } else {
            document.querySelector('html')?.classList.remove('dark');
        }
    }, [theme]);

    const themeContextValue = {
        theme,
        toggleButton,
        handleChangeTheme: () => {
            setTheme((prevTheme: string) => prevTheme === 'dark' ? 'light' : 'dark');
            setToggleButton(!toggleButton);
        }
    };

    return (
        <ThemeProvider value={themeContextValue}>
            <AppProvider>
                <div className='h-screen bg-gray-200 dark:bg-black flex flex-col'>
                    <Head>
                        <title>Clear Cash</title>
                        <link rel="icon" href="https://img.icons8.com/4BB42D/cheap-2.png" />
                    </Head>
                    <Navbar />
                    <Component {...pageProps} />
                    <ToastContainer
                        style={customStyle}
                        position="bottom-right"
                        autoClose={2300}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                        theme={theme === 'dark' ? 'dark' : 'light'}
                        pauseOnHover={false}
                    />
                </div>
            </AppProvider>
        </ThemeProvider>
    );
}
