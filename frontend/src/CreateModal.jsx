///import './index.css';
function CreateModal({ form, onChange, onClose, onCreate, tags }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Create Note</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
          <input
            value={form.title}
            onChange={e => onChange({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content:</label>
          <textarea
            rows="4"
            value={form.content}
            onChange={e => onChange({ ...form, content: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
          <select
            value={form.tagId ?? ''}
            onChange={e =>
              onChange({
                ...form,
                tagId: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">No Category</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCreate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>          
        </div>
      </div>
    </div>
  );
}

export default CreateModal;