import './SideMenu.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function SideMenu({ forcedOpen = false, onClose }) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    // Si está abierto por hamburguesa, mostrar overlay y menú expandido
    if (forcedOpen) {
        return (
            <>
                <div
                    className="side-menu expanded"
                    // No hover en modo hamburguesa
                >
                    <div className="menu-item active">
                        <span className="material-icons-outlined">lightbulb</span>
                        <span>{t('notes') || 'Notes'}</span>
                    </div>
                    <div className="menu-item">
                        <span className="material-icons-outlined">notifications</span>
                        <span>{t('reminders') || 'Reminders'}</span>
                    </div>
                    <div className="menu-item">
                        <span className="material-icons-outlined">edit</span>
                        <span>{t('edit_labels') || 'Edit labels'}</span>
                    </div>
                    <div className="menu-item">
                        <span className="material-icons-outlined">archive</span>
                        <span>{t('archive') || 'Archive'}</span>
                    </div>
                    <div className="menu-item">
                        <span className="material-icons-outlined">delete</span>
                        <span>{t('bin') || 'Bin'}</span>
                    </div>
                </div>
                <div className="side-menu-overlay" onClick={onClose}></div>
            </>
        );
    }

    // Modo barra lateral normal (hover)
    return (
        <div
            className={`side-menu${expanded ? ' expanded' : ''}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className="menu-item active">
                <span className="material-icons-outlined">lightbulb</span>
                {expanded && <span>{t('notes') || 'Notes'}</span>}
            </div>
            <div className="menu-item">
                <span className="material-icons-outlined">notifications</span>
                {expanded && <span>{t('reminders') || 'Reminders'}</span>}
            </div>
            <div className="menu-item">
                <span className="material-icons-outlined">edit</span>
                {expanded && <span>{t('edit_labels') || 'Edit labels'}</span>}
            </div>
            <div className="menu-item">
                <span className="material-icons-outlined">archive</span>
                {expanded && <span>{t('archive') || 'Archive'}</span>}
            </div>
            <div className="menu-item">
                <span className="material-icons-outlined">delete</span>
                {expanded && <span>{t('bin') || 'Bin'}</span>}
            </div>
        </div>
    );
}

export default SideMenu;