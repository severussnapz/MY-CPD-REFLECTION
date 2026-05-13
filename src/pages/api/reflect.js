import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { reflection } = req.body

  if (!reflection || reflection.trim().length === 0) {
    return res.status(400).json({ error: 'Reflection text is required' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      system: `You are a compassionate and insightful mentor for healthcare professionals. Your role is to help clinicians reflect deeply on their experiences and professional development. Provide thoughtful, constructive insights that help them learn from their reflections. Keep your response structured with clear sections and actionable recommendations. Be supportive but also constructively challenging when appropriate.`,
      messages: [
        {
          role: 'user',
          content: `Here is my reflection on my day/event as a clinician:\n\n${reflection}\n\nPlease provide:\n1. Key themes or patterns you notice\n2. Strengths demonstrated in this reflection\n3. Areas for potential growth\n4. Specific questions to consider for deeper reflection\n5. Actionable next steps`,
        },
      ],
    })

    const insights = message.choices[0].message.content

    return res.status(200).json({ insights })
  } catch (error) {
    console.error('OpenAI API error:', error)

    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' })
    }

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Please try again later.' })
    }

    return res.status(500).json({
      error: 'Failed to generate insights. Please try again.',
      details: error.message,
    })
  }
}
