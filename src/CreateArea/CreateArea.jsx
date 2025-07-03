import { useState, useRef, useEffect } from 'react';
import "./CreateArea.css";
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

const COLORS = ["#FFFFFF", "#F28B82", "#FBBC04", "#FFF475", "#CCFF90", "#A7FFEB", "#CBF0F8", "#AECBFA", "#D7AEFB"];

function CreateArea({ onAdd }) {
    const { t } = useTranslation();
    const { theme } = useSettings();
    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({ title: '', content: '', colorIndex: 0 });
    const [showPalette, setShowPalette] = useState(false);
    const formRef = useRef();
    const leaveTimer = useRef(null);

    function handleChange(event) {
        const { name, value } = event.target;
        setNote(prev => ({ ...prev, [name]: value }));
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            formRef.current.querySelector('textarea').focus();
        }
    }

    function submitAndClose() {
        if (note.title.trim() !== '' || note.content.trim() !== '') {
            onAdd(note);
        }
        setNote({ title: '', content: '', colorIndex: 0 });
        setExpanded(false);
    }

    function handleExpand() {
        setExpanded(true);
    }

    const handleColorChange = (index) => {
        setNote(prev => ({ ...prev, colorIndex: index }));
        setShowPalette(false);
    };

    const handleMouseEnter = () => {
        clearTimeout(leaveTimer.current);
        setShowPalette(true);
    };

    const handleMouseLeave = () => {
        leaveTimer.current = setTimeout(() => setShowPalette(false), 200);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                submitAndClose();
            }
        }
        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [note, isExpanded]);

    const getBackgroundColor = () => {
        if ((note.colorIndex === 0 || note.colorIndex === undefined) && theme === "dark") {
            return "#232323";
        } else if (note.colorIndex === 99 && theme === "dark") {
            return "#232323";
        } else {
            return COLORS[note.colorIndex ?? 0];
        }
    };

    function isDarkColor(color) {
        return color === "#232323" || color === "#202124";
    }

    const backgroundColor = getBackgroundColor();
    let textColor = "#202124"; // por defecto oscuro
    if (theme === "dark" && (note.colorIndex === 0 || note.colorIndex === undefined || note.colorIndex === 99)) {
        textColor = "#fff";
    } else if (isDarkColor(backgroundColor)) {
        textColor = "#fff";
    }

    return (
        <div className="container">
            <form
                ref={formRef}
                className="createNote"
                onFocus={handleExpand}
                onSubmit={(e) => { e.preventDefault(); submitAndClose(); }}
                style={{ backgroundColor, color: textColor }}
            >
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={note.title}
                        placeholder={t('title_placeholder')}
                        autoComplete="off"
                    />
                )}
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder={t('take_note_placeholder')}
                    rows={isExpanded ? 3 : 1}
                />
                {isExpanded && (
                    <div className="footer">
                        <div className="icons">
                            <span className="material-icons-outlined">notifications_add</span>
                            <span className="material-icons-outlined">person_add</span>
                            <div
                                className="paletteContainer"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="material-icons-outlined">palette</span>
                                {showPalette && (
                                    <div
                                        className="colorPalette"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {(theme === "dark"
                                    ? ["#232323", ...COLORS.slice(1)]
                                    : COLORS
                                    ).map((color, index) => (
                                            <div
                                                key={color}
                                                className="colorSwatch"
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleColorChange(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <span className="material-icons-outlined">image</span>
                            <span className="material-icons-outlined">archive</span>
                        </div>
                        <button type="button" onClick={submitAndClose} className="closeButton">
                            {t('close_button')}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreateArea;