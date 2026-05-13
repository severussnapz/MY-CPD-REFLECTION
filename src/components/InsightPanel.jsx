export default function InsightPanel({ insights }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Insights</h2>
      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {insights}
      </div>
    </div>
  )
}
