import "./Note.css";
import { useSettings } from '../context/SettingsContext';
import { useState, useRef } from 'react';

const COLORS = ["#FFFFFF", "#F28B82", "#FBBC04", "#FFF475", "#CCFF90", "#A7FFEB", "#CBF0F8", "#AECBFA", "#D7AEFB"];

function Note({ note, onDelete, onUpdate }) {
    const { theme } = useSettings();
    const [showPalette, setShowPalette] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editNote, setEditNote] = useState({ title: note.title, content: note.content });
    const leaveTimer = useRef(null);

    let noteBackgroundColor;
    if ((note.colorIndex === 0 || note.colorIndex === undefined) && theme === "dark") {
        noteBackgroundColor = "#232323";
    } else if (note.colorIndex === 99 && theme === "dark") {
        noteBackgroundColor = "#232323";
    } else {
        noteBackgroundColor = COLORS[note.colorIndex ?? 0];
    }

    // Determina si el fondo es oscuro
    function isDarkColor(color) {
        return color === "#232323" || color === "#202124";
    }

    let textColor = "#202124"; // por defecto oscuro
    if (theme === "dark" && (note.colorIndex === 0 || note.colorIndex === undefined || note.colorIndex === 99)) {
        textColor = "#fff";
    } else if (isDarkColor(noteBackgroundColor)) {
        textColor = "#fff";
    }

    const handleUpdate = (updatedFields) => {
        onUpdate(note.id, updatedFields);
    };

    // Lógica de hover para la paleta de colores
    const handleMouseEnter = () => {
        clearTimeout(leaveTimer.current);
        setShowPalette(true);
    };

    const handleMouseLeave = () => {
        leaveTimer.current = setTimeout(() => {
            setShowPalette(false);
        }, 200);
    };

    // --- Manejo de edición ---
    const handleDoubleClick = () => {
        setEditNote({ title: note.title, content: note.content });
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditNote(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = () => {
        handleUpdate(editNote);
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    return (
        <div
            className="note"
            style={{
                backgroundColor: noteBackgroundColor,
                color: textColor
            }}
            onDoubleClick={handleDoubleClick}
        >
            <div className="pinContainer" onClick={() => handleUpdate({ isPinned: !note.isPinned })}>
                <span className={`material-icons-outlined${note.isPinned ? " pinned" : ""}`}>
                    push_pin
                </span>
            </div>

            <div className="content">
                {isEditing ? (
                    <>
                        <input
                            name="title"
                            value={editNote.title}
                            onChange={handleEditChange}
                            className="edit-title"
                            autoFocus
                        />
                        <textarea
                            name="content"
                            value={editNote.content}
                            onChange={handleEditChange}
                            className="edit-content"
                        />
                        <div className="edit-actions">
                            <button onClick={handleEditSave}>Guardar</button>
                            <button onClick={handleEditCancel}>Cancelar</button>
                        </div>
                    </>
                ) : (
                    <>
                        {note.title && <h1>{note.title}</h1>}
                        <p>{note.content}</p>
                    </>
                )}
            </div>

            {!isEditing && (
                <div className="actions">
                    <span className="material-icons-outlined">notifications_add</span>
                    <span className="material-icons-outlined">person_add</span>
                    <div
                        className="paletteContainer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="material-icons-outlined">
                            palette
                        </span>
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdate({ colorIndex: index });
                                            setShowPalette(false);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <span className="material-icons-outlined">image</span>
                    <span className="material-icons-outlined">archive</span>
                    <span className="material-icons-outlined" onClick={() => onDelete(note.id)}>delete</span>
                </div>
            )}
        </div>
    );
}

export default Note;