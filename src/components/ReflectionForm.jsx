import { useState } from 'react'

export default function ReflectionForm({ onSubmit, loading }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 0) {
      onSubmit(text)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <label className="block mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What do you want to reflect on?
        </h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts, experiences, and reflections from your day..."
          className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
          disabled={loading}
        />
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || text.trim().length === 0}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Insights...' : 'Get AI Insights'}
        </button>
      </div>

      {text.length > 0 && (
        <p className="text-gray-500 text-sm mt-4">
          {text.length} characters
        </p>
      )}
    </form>
  )
}
