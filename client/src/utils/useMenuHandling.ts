import { useState, useEffect } from 'react';

interface MenuHandlingProps<T> {
    initialMenuState?: T | null
}

const useMenuHandling = <T>({ initialMenuState = null }: MenuHandlingProps<T>) => {
    const [menuOpen, setMenuOpen] = useState<T | null>(initialMenuState);

    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>, id: T) => {
        e.stopPropagation();
        setMenuOpen((prevMenuOpen) => (prevMenuOpen === id ? null : id));
    };

    const closeMenuOnOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (menuOpen !== null && !target.closest('.close-menu')) {
            setMenuOpen(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenuOnOutsideClick);

        return () => {
            document.removeEventListener('click', closeMenuOnOutsideClick);
        };
    }, [menuOpen]);

    return { menuOpen, toggleMenu };
};

export default useMenuHandling;
