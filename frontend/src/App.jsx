import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import CreateModal from './CreateModal';

function App() {
  const [notes, setNotes] = useState([]);
  const [viewArchived, setViewArchived] = useState(false);
  const [view, setView] = useState('notes');

  const [form, setForm] = useState({ title: '', content: '', tagId: null, tagName: '' });
  const [showCreate, setShowCreate] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);

  const fetchNotes = async () => {
    let url = `http://localhost:3000/notes?archived=${viewArchived}`;
    if (selectedTagId) url += `&tagId=${selectedTagId}`;
    const res = await fetch(url);
    const data = await res.json();
    setNotes(data);
  };

  const fetchTags = async () => {
    const res = await fetch('http://localhost:3000/tags');
    const data = await res.json();
    setTags(data);
  };

  const createNote = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ title: '', content: '', tagId: null, tagName: '' });
    setShowCreate(false);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const toggleArchive = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}/archive`, { method: 'PATCH' });
    fetchNotes();
  };

  const openEditModal = (note) => {
    setEditNote(note);
    setEditMode(true);
  };

  const closeEditModal = () => {
    setEditNote(null);
    setEditMode(false);
  };

  const updateNote = async () => {
    await fetch(`http://localhost:3000/notes/${editNote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editNote.title,
        content: editNote.content,
        tagId: editNote.tagId
      })
    });
    closeEditModal();
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, [viewArchived, selectedTagId]);

  const renderSidebar = () => (
    <div style={{
      width: '200px',
      backgroundColor: '#f0f0f0',
      padding: '1rem',
      height: '100vh',
      boxSizing: 'border-box',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><button onClick={() => { setView('notes'); setViewArchived(false); }}>View My Notes</button></li>
        <li><button onClick={() => { setView('archived'); setViewArchived(true); }}>View Archived Notes</button></li>
        <li><button onClick={() => setView('tags')}>My Tags</button></li>
      </ul>
    </div>
  );

  return (
    <div style={{ paddingLeft: '220px', padding: '2rem', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      {renderSidebar()}

      {view === 'notes' || view === 'archived' ? (
        <>
          <h1>{viewArchived ? 'Archived Notes' : 'Active Notes'}</h1>

          <div style={{ marginBottom: '1rem' }}>
            <label>Filter by Category:</label>{' '}
            <select onChange={e => setSelectedTagId(e.target.value)} value={selectedTagId ?? ''}>
              <option value=''>All</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>

          {!viewArchived && <button onClick={() => setShowCreate(true)}>Create New Note</button>}

          <ul>
            {notes.map(note => (
              <li key={note.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <strong>{note.title}</strong>
                <p>{note.content}</p>
                {note.tag && <small>Category: {note.tag.name}</small>}<br />
                <button onClick={() => toggleArchive(note.id)}>{viewArchived ? 'Unarchive' : 'Archive'}</button>{' '}
                {!viewArchived && (
                  <>
                    <button onClick={() => deleteNote(note.id)}>Delete</button>{' '}
                    <button onClick={() => openEditModal(note)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : view === 'tags' ? (
        <>
          <h2>My Tags</h2>
          <div style={{ marginTop: '1rem' }}>
            <input
              placeholder="New tag name"
              value={form.tagName || ''}
              onChange={e => setForm({ ...form, tagName: e.target.value })}
            />
            <button onClick={async () => {
              if (!form.tagName?.trim()) return;
              await fetch('http://localhost:3000/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.tagName })
              });
              setForm({ ...form, tagName: '' });
              fetchTags();
            }}>
              Create Tag
            </button>
          </div>
          <ul>
            {tags.map(tag => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
          
        </>
      ) : null}

      {showCreate && (
        <CreateModal
          form={form}
          onChange={setForm}
          onClose={() => setShowCreate(false)}
          onCreate={createNote}
          tags={tags}
        />
      )}

      {editMode && (
        <EditModal
          note={editNote}
          onChange={setEditNote}
          onClose={closeEditModal}
          onSave={updateNote}
          tags={tags}
        />
      )}
    </div>
  );
}

export default App;