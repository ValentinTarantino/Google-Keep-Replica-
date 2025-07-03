import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Los recursos (traducciones)
const resources = {
    en: {
        translation: {
            "search_placeholder": "Search",
            "take_note_placeholder": "Take a note...",
            "title_placeholder": "Title",
            "close_button": "Close",
            "pinned": "Pinned",
            "others": "Others",
            "settings_title": "Settings",
            "dark_mode_label": "Dark Mode",
            "language_label": "Language",
            "notes": "Notes",
            "reminders": "Reminders",
            "edit_labels": "Edit labels",
            "archive": "Archive",
            "bin": "Bin"
        }
    },
    es: {
        translation: {
            "search_placeholder": "Buscar",
            "take_note_placeholder": "Escribe una nota...",
            "title_placeholder": "Título",
            "close_button": "Cerrar",
            "pinned": "Fijado",
            "others": "Otros",
            "settings_title": "Configuración",
            "dark_mode_label": "Modo Oscuro",
            "language_label": "Idioma",
            "notes": "Notas",
            "reminders": "Recordatorios",
            "edit_labels": "Editar etiquetas",
            "archive": "Archivo",
            "bin": "Papelera"
        }
    }
};

i18n
    .use(initReactI18next) 
    .init({
        resources,
        lng: "en", 
        fallbackLng: "en",
        interpolation: {
            escapeValue: false 
        }
    });

export default i18n;