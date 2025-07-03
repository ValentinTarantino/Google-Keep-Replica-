import { createContext, useState, useEffect, useContext } from 'react';
import i18n from '../i18n';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Aplicamos el tema al body
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const value = {
        theme,
        toggleTheme,
        changeLanguage,
        currentLanguage: i18n.language
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};