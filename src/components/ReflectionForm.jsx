import { useState } from 'react'

export default function ReflectionForm({ onSubmit, loading }) {
  const [text, setText] = useState('')
  const maxLength = 2000
  const percentage = (text.length / maxLength) * 100

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 0) {
      onSubmit(text)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 rounded-lg border">
      <label className="block mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          What do you want to reflect on?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Share your thoughts, experiences, and reflections from your clinical work...
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxLength))}
          placeholder="Write your reflection here. Consider what happened, how it made you feel, and what you learned..."
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white resize-none transition-colors"
          disabled={loading}
        />
      </label>

      {/* Character counter with progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Character count
          </span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {text.length} / {maxLength}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || text.trim().length === 0}
        className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:dark:bg-gray-600"
      >
        {loading ? '⏳ Generating Insights...' : '✨ Get AI Insights'}
      </button>
    </form>
  )
}
