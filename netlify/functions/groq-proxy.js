const GROQ_CHAT_COMPLETIONS_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_MODEL = 'llama-3.1-8b-instant'

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  const env = globalThis.process?.env ?? {}
  const apiKey = env.GROQ_API_KEY || env.VITE_GROQ_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Missing GROQ_API_KEY environment variable' }),
    }
  }

  let payload
  try {
    payload = event.body ? JSON.parse(event.body) : {}
  } catch {
    return {
      statusCode: 400,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Invalid JSON payload' }),
    }
  }

  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: payload.model || env.GROQ_MODEL || env.VITE_GROQ_MODEL || DEFAULT_MODEL,
      messages: payload.messages,
      max_tokens: payload.max_tokens,
      temperature: payload.temperature ?? 0.7,
      stream: false,
    }),
  })

  const data = await response.json().catch(() => null)

  return {
    statusCode: response.status,
    headers: getCorsHeaders(),
    body: JSON.stringify(data ?? { error: 'Invalid response from Groq' }),
  }
}