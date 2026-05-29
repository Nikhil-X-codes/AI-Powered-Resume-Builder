export class GroqService {
  constructor(apiKey = import.meta.env.VITE_GROQ_API_KEY) {
    if (!apiKey) throw new Error('Groq API key is required')
    this.apiKey = apiKey
    this.baseUrl = 'https://api.groq.com/openai/v1'
    this.model = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant'
  }

  async generateSummary({ jobTitle, skills = [], experienceYears = '', achievements = '', tone = 'professional' }) {
    const skillsText = Array.isArray(skills) ? skills.filter(Boolean).join(', ') : String(skills || '')
    const system = `You are an expert resume writer. Write ${tone}, impactful, ATS-friendly professional summaries. Maximum 4 sentences. No first-person pronouns.`
    const user = `Write a professional summary for a ${jobTitle} with ${experienceYears} years of experience. Key skills: ${skillsText}. ${achievements}`.trim()
    return this._callChatAPI(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      200,
    )
  }

  async generateObjective({ targetRole, education = '', skills = [], internshipExperience = '' }) {
    const skillsText = Array.isArray(skills) ? skills.filter(Boolean).join(', ') : String(skills || '')
    const system = 'You are a career coach. Write compelling, enthusiastic but professional career objectives for entry-level candidates. Maximum 3 sentences.'
    const user = `Write a career objective for an entry-level ${targetRole} position. Education: ${education}. Skills: ${skillsText}. ${internshipExperience}`.trim()
    return this._callChatAPI(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      150,
    )
  }

  async healthCheck() {
    try {
      await this._callChatAPI([ { role: 'user', content: 'Say OK' } ], 5)
      return true
    } catch {
      return false
    }
  }

  async _callChatAPI(messages, maxTokens = 150) {
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid request: messages must be a non-empty array')
    }

    for (const message of messages) {
      if (!message || typeof message.role !== 'string' || typeof message.content !== 'string') {
        throw new Error('Invalid request: each message must include role and content strings')
      }

      if (!message.role.trim() || !message.content.trim()) {
        throw new Error('Invalid request: message role and content cannot be empty')
      }
    }

    if (!Number.isInteger(maxTokens) || maxTokens < 1 || maxTokens > 8192) {
      throw new Error('Invalid request: max_tokens must be between 1 and 8192')
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      let errorMessage = `API Error: ${response.status}`

      if (errorText) {
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage =
            errorJson?.error?.message || errorJson?.message || errorText || errorMessage
        } catch {
          errorMessage = errorText
        }
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data?.choices?.[0]?.message?.content?.trim() ?? ''
  }
}

export default GroqService
