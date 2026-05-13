import { useState } from 'react'
import ReflectionForm from '../components/ReflectionForm'
import InsightPanel from '../components/InsightPanel'
import PdfExport from '../components/PdfExport'

const EXAMPLE_REFLECTIONS = [
  {
    title: 'Difficult Patient Interaction',
    text: 'Today I had a challenging conversation with a patient who was upset about their treatment plan. They felt their concerns weren\'t being heard. I took time to really listen and explain my reasoning, which seemed to help. I\'m reflecting on how I could have communicated better from the start.',
  },
  {
    title: 'Successful Team Collaboration',
    text: 'Our team successfully coordinated care for a complex patient case today. Everyone contributed their expertise and we made quick decisions together. This experience showed me the value of clear communication and mutual respect in healthcare teams.',
  },
  {
    title: 'Learning from a Mistake',
    text: 'I made an error in patient documentation today that was caught before it affected care. I felt embarrassed initially, but my supervisor helped me understand where my process broke down. This has made me think about how I can build better checks into my workflow.',
  },
  {
    title: 'Professional Growth Moment',
    text: 'I led a teaching session for junior staff today on a procedure I\'ve recently become proficient in. Explaining it to others made me realize how much my confidence and skills have grown. It felt rewarding to contribute to their learning.',
  },
  {
    title: 'Work-Life Balance Challenge',
    text: 'Today was particularly demanding and I felt stressed by the workload. I managed to take a proper lunch break and that helped reset my focus. I\'m thinking about sustainable strategies for managing stress during busy periods.',
  },
]

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

  const handleExampleClick = (example) => {
    handleReflectionSubmit(example.text)
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="gradient-bg shadow-md py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">✨</span>
            <h1 className="text-4xl font-bold text-white">CPD Reflection</h1>
          </div>
          <p className="text-indigo-100 text-lg">
            Reflect on your clinical experiences with AI-powered insights
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <ReflectionForm onSubmit={handleReflectionSubmit} loading={loading} />

              {/* Example Reflections */}
              {!insights && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">💡 Get Inspired</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EXAMPLE_REFLECTIONS.map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExampleClick(example)}
                        className="card p-4 border rounded-lg text-left hover:shadow-md transition-all"
                        disabled={loading}
                      >
                        <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm mb-1">
                          {example.title}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                          {example.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Insights */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-8">
                {error && (
                  <div className="card border border-red-300 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg">
                    <p className="font-semibold mb-2">⚠️ Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {loading && (
                  <div className="card p-8 text-center rounded-lg border">
                    <div className="inline-block mb-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-800 dark:border-t-indigo-400"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-semibold">Generating insights...</p>
                  </div>
                )}

                {insights && !loading && (
                  <>
                    <InsightPanel insights={insights} />
                    <div className="flex flex-col gap-3">
                      <PdfExport reflection={reflection} insights={insights} />
                      <button
                        onClick={() => {
                          setInsights('')
                          setReflection('')
                        }}
                        className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        ↻ New Reflection
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-4 text-center text-gray-600 dark:text-gray-400">
        <p>✨ Powered by AI • Your reflections are not stored on our servers</p>
      </footer>
    </div>
  )
}
