import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useSettings } from './context/SettingsContext'; 
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import Header from "./Header/Header";
import Note from './Note/Note';
import CreateArea from './CreateArea/CreateArea';
import './App.css';

function App() {
  const { t } = useTranslation();
  const { theme } = useSettings();
  
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Error al leer las notas de localStorage", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error("Error al guardar las notas en localStorage", error);
    }
  }, [notes]);

  function addNote(newNote) {
    setNotes(prevNotes => [
      {
        id: uuidv4(),
        title: newNote.title,
        content: newNote.content,
        colorIndex: newNote.colorIndex, 
        isPinned: false
      },
      ...prevNotes
    ]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  function updateNote(id, updatedFields) {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  }

  // Función para reordenar el array de notas
  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    // Si se mueve dentro de la misma sección
    if (source.droppableId === destination.droppableId) {
      const list = source.droppableId === "pinned" ? pinnedNotes : otherNotes;
      const reordered = Array.from(list);
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);

      setNotes([
        ...(source.droppableId === "pinned" ? reordered : pinnedNotes),
        ...(source.droppableId === "others" ? reordered : otherNotes)
      ]);
    }
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  const showPinnedSection = pinnedNotes.length > 0;
  const showOthersSection = showPinnedSection && otherNotes.length > 0;

  return (
    <div>
      <Header onSearch={setSearchTerm} />
      <CreateArea onAdd={addNote} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="notes-area">
          {showPinnedSection && (
            <div className="notes-section">
              <div className="notes-section-title">{t('pinned')}</div>
              <Droppable droppableId="pinned">
                {(provided) => (
                  <div className="notes-container" ref={provided.innerRef} {...provided.droppableProps}>
                    {pinnedNotes.map((note, index) => (
                      <Draggable key={note.id} draggableId={note.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Note note={note} onDelete={deleteNote} onUpdate={updateNote} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
          {showOthersSection && (
            <div className="notes-section">
              <div className="notes-section-title">{t('others')}</div>
              <Droppable droppableId="others">
                {(provided) => (
                  <div className="notes-container" ref={provided.innerRef} {...provided.droppableProps}>
                    {otherNotes.map((note, index) => (
                      <Draggable key={note.id} draggableId={note.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Note note={note} onDelete={deleteNote} onUpdate={updateNote} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
          {!showPinnedSection && !showOthersSection && (
            <div className="notes-section">
              <Droppable droppableId="others">
                {(provided) => (
                  <div className="notes-container" ref={provided.innerRef} {...provided.droppableProps}>
                    {otherNotes.map((note, index) => (
                      <Draggable key={note.id} draggableId={note.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Note note={note} onDelete={deleteNote} onUpdate={updateNote} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;