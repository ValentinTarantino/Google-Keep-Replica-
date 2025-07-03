import "./Header.css";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SideMenu from '../SideMenu/SideMenu';


function Header({ onSearch }) {
    const { t } = useTranslation();
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <>
            <header className="header">
                <div className="leftSection">
                    <span
                        className="material-icons-outlined"
                        onClick={() => setShowMenu(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        menu
                    </span>
                    <img
                        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                        alt="Google Keep Logo"
                        className="logo"
                    />
                    <h2>Keep</h2>
                </div>
                <div className="searchSection">
                    <button className="searchButton">
                        <span className="material-icons-outlined">search</span>
                    </button>
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="rightSection">
                    <span className="material-icons-outlined">refresh</span>
                    <span className="material-icons-outlined">view_agenda</span>
                    <span className="material-icons-outlined" onClick={() => setShowSettings(true)}>
                        settings
                    </span>
                </div>
            </header>
            {showSettings && <SettingsMenu closeMenu={() => setShowSettings(false)} />}
            {showMenu && (
                <div
                    className="side-menu-overlay"
                    onClick={() => setShowMenu(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 998,
                        background: 'transparent'
                    }}
                />
            )}
            <SideMenu forcedOpen={showMenu} onClose={() => setShowMenu(false)} />
        </>
    );
}

export default Header;
