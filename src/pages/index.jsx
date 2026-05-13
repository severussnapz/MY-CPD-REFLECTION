import { useState } from 'react'
import ReflectionForm from '../components/ReflectionForm'
import InsightPanel from '../components/InsightPanel'
import PdfExport from '../components/PdfExport'

export default function Home() {
  const [insights, setInsights] = useState('')
  const [reflection, setReflection] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleReflectionSubmit = async (text) => {
    setLoading(true)
    setError('')
    setReflection(text)

    try {
      const response = await fetch('/api/reflect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reflection: text }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate insights')
      }

      const data = await response.json()
      setInsights(data.insights)
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">CPD Reflection</h1>
          <p className="text-xl text-indigo-100">
            Reflect on your clinical experiences with AI-powered insights
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <ReflectionForm onSubmit={handleReflectionSubmit} loading={loading} />
          </div>

          {/* Right Column - Insights */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                <p className="font-semibold mb-2">Error</p>
                <p>{error}</p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                </div>
                <p className="text-gray-600 font-semibold">Generating insights...</p>
              </div>
            )}

            {insights && !loading && (
              <>
                <InsightPanel insights={insights} />
                <div className="flex gap-4">
                  <PdfExport reflection={reflection} insights={insights} />
                  <button
                    onClick={() => {
                      setInsights('')
                      setReflection('')
                    }}
                    className="flex-1 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Start New Reflection
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-indigo-100">
          <p>Powered by AI • Your reflections are not stored on our servers</p>
        </div>
      </div>
    </div>
  )
}
