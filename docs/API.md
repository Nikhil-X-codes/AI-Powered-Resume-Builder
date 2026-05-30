
API Routes & Integration Documentation
## AI-Powered Resume Builder — MVP


---

## Table of Contents
1. [External API: Groq](#1-external-api-groq)
2. [Internal Data API: localStorage](#2-internal-data-api-localstorage)
3. [State Management API (Reducer Actions)](#3-state-management-api-reducer-actions)
4. [Service Layer API](#4-service-layer-api)
5. [Component Prop Interfaces](#5-component-prop-interfaces)
6. [Error Handling Reference](#6-error-handling-reference)

---

## 1. External API: Groq

### 1.1 Base Configuration

```yaml
Base URL: https://api.groq.com/openai/v1
Authentication: Bearer Token (API Key)
Content-Type: application/json
Compatibility: OpenAI API format
```

### 1.2 Endpoint: Chat Completions

**Route:** `POST /chat/completions`  
**Purpose:** Generate professional resume summaries and career objectives  
**Rate Limits:** Check Groq dashboard for current limits

#### Request Headers

| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer {GROQ_API_KEY}` | Yes |
| `Content-Type` | `application/json` | Yes |

#### Request Body Schema

```json
{
  "model": "llama-3.1-8b-instant",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert resume writer. Write concise, impactful, ATS-friendly professional summaries. Maximum 4 sentences. No first-person pronouns. Focus on skills and value proposition."
    },
    {
      "role": "user",
      "content": "Write a professional summary for a Software Engineer skilled in React, Node.js, TypeScript with 3 years of experience."
    }
  ],
  "max_tokens": 200,
  "temperature": 0.7,
  "stream": false
}
```

#### Request Parameters

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `model` | string | Yes | — | Model ID: `llama-3.1-8b-instant` |
| `messages` | array | Yes | — | Array of message objects (system + user) |
| `messages[].role` | string | Yes | — | `system`, `user`, or `assistant` |
| `messages[].content` | string | Yes | — | The prompt text |
| `max_tokens` | integer | No | 150 | Maximum tokens in response |
| `temperature` | float | No | 0.7 | Creativity (0 = deterministic, 1 = creative) |
| `stream` | boolean | No | false | Enable SSE streaming (keep false for MVP) |

#### Response Schema (200 OK)

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1717000000,
  "model": "llama-3.1-8b-instant",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Results-driven Software Engineer with 3 years of experience building scalable web applications using React, Node.js, and TypeScript. Proven ability to deliver high-performance frontend solutions and RESTful APIs that serve 100K+ users. Strong advocate for clean code, test-driven development, and agile methodologies."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 52,
    "total_tokens": 97
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique completion ID |
| `choices` | array | Generated responses (always 1 for non-streaming) |
| `choices[0].message.content` | string | **The AI-generated text** ← Use this |
| `choices[0].finish_reason` | string | `stop` (success), `length` (hit max_tokens), `error` |
| `usage.total_tokens` | integer | Total tokens consumed (for monitoring) |

#### Error Responses

| HTTP Status | Code | Meaning | Action |
|-------------|------|---------|--------|
| 401 | `invalid_api_key` | API key invalid or expired | Alert user: check `.env` file |
| 429 | `rate_limit_exceeded` | Too many requests | Retry after 5s; show "please wait" |
| 500 | `server_error` | Groq server issue | Retry 2× then fallback to manual |
| 503 | `service_unavailable` | API temporarily down | Immediate manual fallback |
| 422 | `invalid_request` | Malformed request | Check prompt length (< 4000 chars) |

---

### 1.3 Prompt Templates

#### Mode A: Professional Summary (Experienced Candidates)

```javascript
const buildSummaryPrompt = ({ jobTitle, skills, experienceYears, achievements }) => {
  return `Write a professional resume summary (3-4 sentences) for a ${jobTitle}.

Key Skills: ${skills.join(', ')}
Years of Experience: ${experienceYears}
${achievements ? `Notable Achievements: ${achievements}` : ''}

Requirements:
- No first-person pronouns (I, me, my)
- Focus on value proposition and expertise
- ATS-friendly keywords
- Maximum 60 words`;
};
```

#### Mode B: Career Objective (Entry-Level / Students)

```javascript
const buildObjectivePrompt = ({ targetRole, education, skills, internshipExperience }) => {
  return `Write a compelling career objective (2-3 sentences) for an entry-level ${targetRole} position.

Education: ${education}
Skills: ${skills.join(', ')}
${internshipExperience ? `Relevant Experience: ${internshipExperience}` : ''}

Requirements:
- Enthusiastic but professional tone
- Highlight potential and eagerness to contribute
- Mention specific skills relevant to the role
- Maximum 40 words`;
};
```

---

### 1.4 cURL Test Command

```bash
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -d '{
    "model": "llama-3.1-8b-instant",
    "messages": [
      {"role": "system", "content": "You are an expert resume writer."},
      {"role": "user", "content": "Write a professional summary for a Data Analyst skilled in Python, SQL, Tableau with 2 years experience."}
    ],
    "max_tokens": 150,
    "temperature": 0.7
  }'
```

---

## 2. Internal Data API: localStorage

Since there is no backend database, all persistence is handled through the browser's `localStorage` API. These operations are wrapped in a `storageService` utility.

### 2.1 Storage Schema

```javascript
const STORAGE_KEY = 'ai_resume_builder_state';

// Stored value (JSON stringified):
{
  "version": 1,           // Schema version for migrations
  "lastSaved": "2026-05-29T10:30:00Z",
  "data": { /* ResumeState object */ }
}
```

### 2.2 Storage Service API

#### `storageService.save(state)`

| Property | Value |
|----------|-------|
| **Purpose** | Persist current resume state to browser |
| **Input** | `state` — full resume state object |
| **Output** | `boolean` — success/failure |
| **Implementation** | `localStorage.setItem(STORAGE_KEY, JSON.stringify(wrappedState))` |
| **Debounce** | 500ms (prevents excessive writes) |

#### `storageService.load()`

| Property | Value |
|----------|-------|
| **Purpose** | Retrieve saved resume state on app load |
| **Input** | None |
| **Output** | `ResumeState | null` — parsed state or null if empty |
| **Error Handling** | Returns `null` on parse error; logs to console |

#### `storageService.clear()`

| Property | Value |
|----------|-------|
| **Purpose** | Remove all saved data ("Start New Resume") |
| **Input** | None |
| **Output** | `boolean` |

#### `storageService.exportJSON()`

| Property | Value |
|----------|-------|
| **Purpose** | Allow user to download backup JSON file |
| **Input** | `state` — current resume state |
| **Output** | Triggers browser download of `.json` file |

### 2.3 localStorage Operations Reference

```javascript
// src/services/storageService.js

const STORAGE_KEY = 'ai_resume_builder_state';
const SCHEMA_VERSION = 1;

export const storageService = {
  save: (state) => {
    try {
      const payload = {
        version: SCHEMA_VERSION,
        lastSaved: new Date().toISOString(),
        data: state
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return true;
    } catch (e) {
      console.error('localStorage save failed:', e);
      return false;
    }
  },

  load: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Schema migration check could go here
      return parsed.data || null;
    } catch (e) {
      console.error('localStorage load failed:', e);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  },

  exportJSON: (state) => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};
```

---

## 3. State Management API (Reducer Actions)

All state mutations flow through the central reducer. Components never mutate state directly.

### 3.1 Action Definitions

```typescript
// TypeScript-style interfaces for documentation

interface Action {
  type: string;
  payload?: any;
}

// Personal Info
interface UpdatePersonalInfoAction extends Action {
  type: 'UPDATE_PERSONAL_INFO';
  payload: {
    field: string;      // 'firstName' | 'lastName' | 'email' | ...
    value: string;
  };
}

// Summary
interface UpdateSummaryAction extends Action {
  type: 'UPDATE_SUMMARY';
  payload: string;
}

// Experience
interface AddExperienceAction extends Action {
  type: 'ADD_EXPERIENCE';
  payload?: undefined; // Generates new empty experience object
}

interface RemoveExperienceAction extends Action {
  type: 'REMOVE_EXPERIENCE';
  payload: string; // id of experience to remove
}

interface UpdateExperienceAction extends Action {
  type: 'UPDATE_EXPERIENCE';
  payload: {
    id: string;
    field: string;      // 'title' | 'company' | 'bullets' | ...
    value: any;
  };
}

// Education
interface AddEducationAction extends Action {
  type: 'ADD_EDUCATION';
}

interface RemoveEducationAction extends Action {
  type: 'REMOVE_EDUCATION';
  payload: string; // id
}

interface UpdateEducationAction extends Action {
  type: 'UPDATE_EDUCATION';
  payload: {
    id: string;
    field: string;
    value: any;
  };
}

// Skills
interface UpdateSkillsAction extends Action {
  type: 'UPDATE_SKILLS';
  payload: string[]; // Array of skill strings
}

// Template
interface SetTemplateAction extends Action {
  type: 'SET_TEMPLATE';
  payload: 'modern' | 'classic';
}

// Lifecycle
interface LoadStateAction extends Action {
  type: 'LOAD_STATE';
  payload: ResumeState; // Full state from localStorage
}

interface ResetStateAction extends Action {
  type: 'RESET_STATE';
  payload?: undefined;
}
```

### 3.2 Usage Example

```javascript
// In a form component:
const { state, dispatch } = useResumeContext();

// Update first name
dispatch({
  type: 'UPDATE_PERSONAL_INFO',
  payload: { field: 'firstName', value: 'John' }
});

// Add new experience entry
dispatch({ type: 'ADD_EXPERIENCE' });

// Update specific experience bullet
dispatch({
  type: 'UPDATE_EXPERIENCE',
  payload: { id: 'exp-1', field: 'bullets', value: ['Led team of 5 developers'] }
});

// Switch template
dispatch({ type: 'SET_TEMPLATE', payload: 'classic' });

// Load from localStorage on mount
const saved = storageService.load();
if (saved) dispatch({ type: 'LOAD_STATE', payload: saved });
```

---

## 4. Service Layer API

### 4.1 `groqService`

**File:** `src/services/groqService.js`

#### Constructor

```javascript
const groqService = new GroqService();
```

#### Methods

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `generateSummary` | `({ jobTitle, skills, experienceYears, achievements?, tone? })` | `Promise<string>` | Generates professional summary |
| `generateObjective` | `({ targetRole, education, skills, internshipExperience? })` | `Promise<string>` | Generates career objective |
| `healthCheck` | `()` | `Promise<boolean>` | Validates API key by sending test request |

#### Implementation Reference

```javascript
// src/services/groqService.js

export class GroqService {
  constructor({ endpoint = '/.netlify/functions/groq-proxy', model = 'llama-3.1-8b-instant' } = {}) {
    this.endpoint = endpoint;
    this.model = model;
  }

  async generateSummary({ jobTitle, skills, experienceYears, achievements = '', tone = 'professional' }) {
    const skillsText = Array.isArray(skills) ? skills.join(', ') : skills;
    
    const messages = [
      {
        role: 'system',
        content: `You are an expert resume writer. Write ${tone}, impactful, ATS-friendly professional summaries. Maximum 4 sentences. No first-person pronouns. Focus on value proposition.`
      },
      {
        role: 'user',
        content: `Write a professional summary for a ${jobTitle} with ${experienceYears} years of experience. Key skills: ${skillsText}. ${achievements ? `Notable achievements: ${achievements}.` : ''}`
      }
    ];

    return this._callChatAPI(messages, 200);
  }

  async generateObjective({ targetRole, education, skills, internshipExperience = '' }) {
    const messages = [
      {
        role: 'system',
        content: 'You are a career coach. Write compelling, enthusiastic but professional career objectives for entry-level candidates. Maximum 3 sentences. Focus on potential and relevant skills.'
      },
      {
        role: 'user',
        content: `Write a career objective for an entry-level ${targetRole} position. Education: ${education}. Skills: ${Array.isArray(skills) ? skills.join(', ') : skills}. ${internshipExperience ? `Experience: ${internshipExperience}.` : ''}`
      }
    ];

    return this._callChatAPI(messages, 150);
  }

  async _callChatAPI(messages, maxTokens = 150) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  }

  async healthCheck() {
    try {
      await this._callChatAPI([
        { role: 'user', content: 'Say "OK"' }
      ], 5);
      return true;
    } catch {
      return false;
    }
  }
}
```

### 4.2 `pdfService`

**File:** `src/services/pdfService.js`

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `download` | `(previewRef, fileName)` | `void` | Triggers browser print-to-PDF |

```javascript
import { useReactToPrint } from 'react-to-print';

export const usePDFService = () => {
  return useReactToPrint({
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `
  });
};
```

---

## 5. Component Prop Interfaces

### 5.1 ResumeForm → Sections

```javascript
// Shared by all form sections
interface SectionProps {
  data: object;           // Section-specific data slice
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>; // Optional validation errors
}

// Experience-specific
interface ExperienceSectionProps {
  items: ExperienceItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: any) => void;
}

// Education-specific
interface EducationSectionProps {
  items: EducationItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: any) => void;
}
```

### 5.2 ResumePreview → Templates

```javascript
interface TemplateProps {
  data: {
    personalInfo: PersonalInfo;
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[];
  };
}

// TemplateModern and TemplateClassic both accept TemplateProps
```

### 5.3 Context Provider

```javascript
interface ResumeContextValue {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
  isLoading: boolean;       // AI generation in progress
  error: string | null;     // Current error message
}
```

---

## 6. Error Handling Reference

### 6.1 Error Categories

| Category | Source | Handling Strategy |
|----------|--------|-------------------|
| **Network** | Groq API unreachable | Retry × 2 with exponential backoff; then show manual fallback |
| **Auth** | Invalid API key | Show persistent banner: "AI features disabled — check API key" |
| **Rate Limit** | 429 from Groq | Display countdown timer; queue request |
| **Validation** | Form input errors | Inline field errors; prevent PDF export if critical fields empty |
| **Storage** | localStorage full (5MB limit) | Show warning; offer JSON export instead |
| **Parse** | Corrupted localStorage data | Catch and reset to initial state; notify user |

### 6.2 Error UI Patterns

```javascript
// Global error state in context
const [error, setError] = useState(null);

// In component:
{error && (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
    <p className="font-medium">Error</p>
    <p className="text-sm">{error}</p>
    <button onClick={() => setError(null)} className="text-sm underline mt-1">Dismiss</button>
  </div>
)}

// AI-specific loading + error
const [aiStatus, setAiStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
```

### 6.3 Retry Logic for Groq API

```javascript
const fetchWithRetry = async (fn, maxRetries = 2, delay = 1000) => {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (error.message.includes('429') || error.message.includes('503')) {
        await new Promise(r => setTimeout(r, delay * (i + 1)));
        continue;
      }
      break; // Don't retry auth or client errors
    }
  }
  throw lastError;
};
```

---

### Appendix A: Environment Variables

```bash
# Netlify site environment variables
GROQ_API_KEY=your_groq_api_key_here
VITE_APP_NAME=AI Resume Builder
VITE_APP_VERSION=1.0.0
```

## Appendix B: Quick Reference Card

| Task | Code | File |
|------|------|------|
| Call AI proxy | `groqService.generateSummary(params)` | `services/groqService.js` |
| Save data | `storageService.save(state)` | `services/storageService.js` |
| Load data | `storageService.load()` | `services/storageService.js` |
| Update field | `dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { field, value } })` | Context |
| Add experience | `dispatch({ type: 'ADD_EXPERIENCE' })` | Context |
| Switch template | `dispatch({ type: 'SET_TEMPLATE', payload: 'classic' })` | Context |
| Export PDF | `usePDFService()` hook | `services/pdfService.js` |

---

