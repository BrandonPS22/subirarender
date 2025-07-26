function EditModal({ note, onChange, onClose, onSave, tags }) {
  if (!note) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        minWidth: '300px',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h3>Edit Note</h3>

        <div>
          <label>Title:</label><br />
          <input
            value={note.title}
            onChange={e => onChange({ ...note, title: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            rows="4"
            value={note.content}
            onChange={e => onChange({ ...note, content: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Category:</label><br />
          <select
            value={note.tagId ?? ''}
            onChange={e => onChange({ ...note, tagId: e.target.value ? parseInt(e.target.value) : null })}
            style={{ width: '100%' }}
          >
            <option value="">No Category</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;