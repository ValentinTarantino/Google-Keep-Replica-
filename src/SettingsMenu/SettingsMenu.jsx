import "./SettingsMenu.css";
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';

function SettingsMenu({ closeMenu }) {
    const { theme, toggleTheme, changeLanguage, currentLanguage } = useSettings();
    const { t } = useTranslation();

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
    };

    return (
        <div className="menuOverlay" onClick={closeMenu}>
            <div className="menu" onClick={(e) => e.stopPropagation()}>
                <h3>{t('settings_title')}</h3>
                <div className="option">
                    <span>{t('dark_mode_label')}</span>
                    <label className="switch">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="option">
                    <span>{t('language_label')}</span>
                    <div className="langButtons">
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={currentLanguage.startsWith('en') ? "active" : ""}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => handleLanguageChange('es')}
                            className={currentLanguage.startsWith('es') ? "active" : ""}
                        >
                            ES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsMenu;