function CreateModal({ form, onChange, onClose, onCreate, tags }) {
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
        <h3>Create Note</h3>

        <div>
          <label>Title:</label><br />
          <input
            value={form.title}
            onChange={e => onChange({ ...form, title: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            rows="4"
            value={form.content}
            onChange={e => onChange({ ...form, content: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Category:</label><br />
          <select
            value={form.tagId ?? ''}
            onChange={e => onChange({ ...form, tagId: e.target.value ? parseInt(e.target.value) : null })}
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
          <button onClick={onCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;