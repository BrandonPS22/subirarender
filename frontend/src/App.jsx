import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import CreateModal from './CreateModal';
import './index.css';

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
    let url = `${import.meta.env.VITE_API_URL}/notes?archived=${viewArchived}`;
    if (selectedTagId) url += `&tagId=${selectedTagId}`;
    const res = await fetch(url);
    const data = await res.json();
    setNotes(data);
  };

  const fetchTags = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tags`);
    const data = await res.json();
    setTags(data);
  };

  const createNote = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', content: '', tagId: null, tagName: '' });
    setShowCreate(false);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const toggleArchive = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}/archive`, { method: 'PATCH' });
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
    await fetch(`${import.meta.env.VITE_API_URL}/notes/${editNote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editNote.title,
        content: editNote.content,
        tagId: editNote.tagId,
      }),
    });
    closeEditModal();
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, [viewArchived, selectedTagId]);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">

      {/* Sidebar */}
      <aside className="w-60 bg-gray-200 p-6 fixed top-0 left-0 h-full shadow-md">
        <h1 className="text-center text-2xl font-bold mb-8">AppNote</h1> 
        <h3 className="text-xl font-bold mb-4">Menu</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setView('notes');
                setViewArchived(false);
              }}
              className="text-left w-full hover:text-blue-600"
            >
              View My Notes
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setView('archived');
                setViewArchived(true);
              }}
              className="text-left w-full hover:text-blue-600"
            >
              View Archived Notes
            </button>
          </li>
          <li>
            <button
              onClick={() => setView('tags')}
              className="text-left w-full hover:text-blue-600"
            >
              My Categories
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-8">
        {view === 'notes' || view === 'archived' ? (
          <>
            <h1 className="text-2xl font-bold mb-4">
              {viewArchived ? 'Archived Notes' : 'Active Notes'}
            </h1>

            <div className="mb-4">
              <label className="mr-2 font-medium">Filter by Category:</label>
              <select
                onChange={(e) => setSelectedTagId(e.target.value)}
                value={selectedTagId ?? ''}
                className="border px-2 py-1 rounded"
              >
                <option value="">All</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            {!viewArchived && (
              <button
                onClick={() => setShowCreate(true)}
                className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Create New Note
              </button>
            )}

            <div className="flex flex-wrap gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-yellow-100 border border-yellow-300 rounded-lg shadow p-4 w-64 break-words flex flex-col"
                >
                  <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-800 mb-3">{note.content}</p>
                  {note.tag && (
                    <p className="text-xs text-gray-500 italic mb-2">
                      Category: {note.tag.name}
                    </p>
                  )}
                  <div className="flex flex-wrap justify-center gap-2 mt-auto pt-2 border-t border-yellow-300">
                    <button
                      onClick={() => toggleArchive(note.id)}
                      className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      {viewArchived ? 'Unarchive' : 'Archive'}
                    </button>
                    {!viewArchived && (
                      <>
                        <button
                          onClick={() => openEditModal(note)}
                          className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : view === 'tags' ? (
          <>
            <h2 className="text-2xl font-bold mb-4">My Categories</h2>
            <div className="mb-4 flex items-center gap-2">
              <input
                placeholder="New category name"
                value={form.tagName || ''}
                onChange={(e) =>
                  setForm({ ...form, tagName: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={async () => {
                  if (!form.tagName?.trim()) return;
                  await fetch(`${import.meta.env.VITE_API_URL}/tags`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: form.tagName }),
                  });
                  setForm({ ...form, tagName: '' });
                  fetchTags();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
              >
                Create Category
              </button>
            </div>
            <ul className="list-disc pl-6">
              {tags.map((tag) => (
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
      </main>
    </div>
  );
}

export default App;