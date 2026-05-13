export default function InsightPanel({ insights }) {
  return (
    <div className="card p-6 rounded-lg border">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🧠 AI Insights</h2>
      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm space-y-3">
        {insights}
      </div>
    </div>
  )
}
