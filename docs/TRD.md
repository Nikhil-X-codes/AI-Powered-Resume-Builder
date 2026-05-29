
## AI-Powered Resume Builder — MVP


## 1. Technical Overview

This application is a **Single Page Application (SPA)** built entirely in the browser. There is no backend server, no database, and no authentication layer. All business logic executes client-side; data persists via the browser's `localStorage` API; AI capabilities are consumed via direct HTTPS calls to the Groq API.
**Rationale for Frontend-Only Architecture:**


## 2. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 18.x | UI component architecture |
| **Language** | JavaScript (ES2022+) / JSX | — | Application logic |
| **Build Tool** | Vite | 5.x | Fast dev server, bundling, env variable support |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first responsive styling |
| **State Management** | React Context + useReducer | Built-in | Global resume state |
| **Persistence** | localStorage | Web API | Auto-save/load resume data |
| **PDF Export** | react-to-print | 2.x | Print-to-PDF functionality |
| **Icons** | Lucide React | 0.x | Consistent iconography |
| **AI Integration** | Groq API | OpenAI-compatible | Summary/objective generation |
| **Linting** | ESLint + Prettier | — | Code quality |


## 3. System Architecture

### 3.1 High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser Environment                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (Vite)                 │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │ ResumeForm  │  │ LivePreview  │  │  Controls   │ │  │
│  │  │  Component  │  │  Component   │  │  Component  │ │  │
│  │  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘ │  │
│  │         │                │                   │        │  │
│  │         └────────────────┴───────────────────┘        │  │
│  │                          │                            │  │
│  │              ┌───────────▼───────────┐                │  │
│  │              │   ResumeContext       │                │  │
│  │              │   (useReducer)        │                │  │
│  │              └───────────┬───────────┘                │  │
│  │                          │                            │  │
│  │         ┌────────────────┼────────────────┐           │  │
│  │         ▼                ▼                ▼           │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌────────────┐    │  │
│  │  │localStorage│  │ Groq API     │  │ react-to-  │    │  │
│  │  │   API      │  │ (Groq)       │  │   print    │    │  │
│  │  └────────────┘  └──────────────┘  └────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

1. **User Input** → `ResumeForm` dispatches action to `ResumeContext`
2. **State Update** → `useReducer` updates global state; triggers re-render
 5. **AI Generation** → `Controls` or `ResumeForm` calls `groqService.generateSummary()`
4. **Live Preview** → `ResumePreview` receives state via context; renders template
5. **AI Generation** → `Controls` or `ResumeForm` calls `groqService.generateSummary()`
6. **PDF Export** → `Controls` triggers `react-to-print` on `ResumePreview` ref
7. **App Load** → Context initializes state from `localStorage` (if exists)


## 4. Component Architecture

### 4.1 Component Hierarchy

```
App
├── Header
│   └── TemplateSelector (Template A / Template B)
├── MainLayout (responsive: stacked mobile, side-by-side desktop)
│   ├── ResumeForm
│   │   ├── PersonalInfoSection
│   │   ├── SummarySection
│   │   │   └── AIGenerateButton
│   │   ├── ExperienceSection
│   │   │   └── ExperienceItem (dynamic list)
│   │   ├── EducationSection
│   │   │   └── EducationItem (dynamic list)
│   │   └── SkillsSection
│   └── ResumePreview
│       ├── TemplateModern (Template A)
│       └── TemplateClassic (Template B)
└── ActionBar
    ├── DownloadPDFButton
    ├── ResetButton
    └── LoadSampleDataButton
```

### 4.2 Component Responsibilities

| Component | Props | Responsibilities |
|-----------|-------|------------------|
| `App` | None | Layout orchestration; providers wrapper |
| `ResumeContext.Provider` | `children` | Global state, reducer, localStorage sync |
| `TemplateSelector` | `currentTemplate`, `onChange` | Toggle between template IDs |
| `ResumeForm` | None | Container for all input sections |
| `SummarySection` | `value`, `onChange`, `jobTitle`, `skills` | Textarea + AI generation trigger |
| `ExperienceSection` | `items`, `onAdd`, `onRemove`, `onUpdate` | Dynamic CRUD for work history |
| `EducationSection` | `items`, `onAdd`, `onRemove`, `onUpdate` | Dynamic CRUD for education |
| `SkillsSection` | `skills`, `onChange` | Tag input or comma-separated text |
| `ResumePreview` | `resumeData`, `templateId` | Renders selected template with data |
| `TemplateModern` | `data` | JSX + Tailwind for modern layout |
| `TemplateClassic` | `data` | JSX + Tailwind for classic layout |
| `ActionBar` | None | PDF download, reset, sample data |


## 5. State Management Design

### 5.1 State Shape (Single Source of Truth)

```javascript
const initialState = {
  templateId: 'modern', // 'modern' | 'classic'
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    linkedin: '',
    github: '',
    website: ''
  },
  summary: '',
  experience: [
    {
      id: 'uuid-1',
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: ['']
    }
  ],
  education: [
    {
      id: 'uuid-2',
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    }
  ],
  skills: []
};
```

### 5.2 Reducer Actions

```javascript
const actionTypes = {
  UPDATE_PERSONAL_INFO: 'UPDATE_PERSONAL_INFO',
  UPDATE_SUMMARY: 'UPDATE_SUMMARY',
  ADD_EXPERIENCE: 'ADD_EXPERIENCE',
  REMOVE_EXPERIENCE: 'REMOVE_EXPERIENCE',
  UPDATE_EXPERIENCE: 'UPDATE_EXPERIENCE',
  ADD_EDUCATION: 'ADD_EDUCATION',
  REMOVE_EDUCATION: 'REMOVE_EDUCATION',
  UPDATE_EDUCATION: 'UPDATE_EDUCATION',
  UPDATE_SKILLS: 'UPDATE_SKILLS',
  SET_TEMPLATE: 'SET_TEMPLATE',
  LOAD_STATE: 'LOAD_STATE',
  RESET_STATE: 'RESET_STATE'
};
```

### 5.3 localStorage Schema

```javascript
// Key: 'ai_resume_builder_state'
// Value: JSON.stringify(state)
// Sync: Debounced 500ms after each dispatch
// Load: On app mount (useEffect in context)
```


## 6. Template System Design

### 6.1 Template Specification

Templates are **pure presentational components** that receive the same `data` prop. They do not contain logic — only layout and typography.

| Property | Template A: Modern | Template B: Classic |
|----------|-------------------|---------------------|
| **Name** | `modern` | `classic` |
| **Layout** | Two-column (sidebar + main) | Single-column |
| **Header** | Name + contact in top banner | Name centered, contact below |
| **Colors** | Slate-800 headers, indigo accents | Black headers, gray borders |
| **Typography** | Inter font, varied weights | Georgia/Serif, traditional sizes |
| **Section Dividers** | Subtle background blocks | Horizontal rules |
| **Skill Display** | Tag pills | Comma-separated inline |

### 6.2 Template Switching Logic

```javascript
const templates = {
  modern: TemplateModern,
  classic: TemplateClassic
};

const SelectedTemplate = templates[templateId];
return <SelectedTemplate data={resumeData} />;
```


## 7. AI Integration Architecture

### 7.1 Service Layer: `groqService.js`

Isolates all Groq API communication. No component calls `fetch` directly.

```javascript
// src/services/groqService.js
class GroqService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.groq.com/openai/v1';
    this.model = 'llama-3.1-8b-instant';
  }

  async generateSummary({ jobTitle, skills, experienceYears, tone = 'professional' }) {
    // Implementation detailed in API Routes doc
  }

  async generateObjective({ targetRole, education, skills }) {
    // Entry-level variant
  }
}
```

### 7.2 Prompt Engineering Strategy

| Mode | System Prompt | User Prompt Variables |
|------|--------------|----------------------|
| **Summary** | "You are an expert resume writer. Write concise, impactful professional summaries." | `jobTitle`, `skills[]`, `experienceYears`, `tone` |
| **Objective** | "You are a career coach. Write compelling entry-level career objectives." | `targetRole`, `education[]`, `skills[]` |

**Constraints enforced via prompt:**

### 7.3 Error Handling Strategy

```javascript
try {
  const summary = await groqService.generateSummary(params);
  dispatch({ type: 'UPDATE_SUMMARY', payload: summary });
} catch (error) {
  // 1. Show toast: "AI generation failed. Please try again or write manually."
  // 2. Log to console for debugging
  // 3. Do NOT block UI; allow manual entry
}
```


## 8. PDF Export Architecture

### 8.1 Implementation: `react-to-print`

```javascript
import { useReactToPrint } from 'react-to-print';

const handlePrint = useReactToPrint({
  content: () => previewRef.current,
  documentTitle: `Resume_${firstName}_${lastName}`,
  pageStyle: `
    @page { size: A4; margin: 0; }
    @media print { body { -webkit-print-color-adjust: exact; } }
  `
});
```

### 8.2 Print CSS Strategy



## 9. Responsive Design Specification

### 9.1 Breakpoints

| Breakpoint | Layout | Form/Preview Ratio |
|------------|--------|-------------------|
| `< 768px` (mobile) | Stacked vertical | Form only; preview in modal/accordion |
| `768px – 1024px` (tablet) | Split 50/50 | Side-by-side, scrollable |
| `> 1024px` (desktop) | Split 40/60 | Form 40%, Preview 60% |

### 9.2 Mobile Behavior



## 10. Security Considerations

| Concern | Mitigation |
|---------|------------|
| **API Key Exposure** | Store in `.env` as `VITE_GROQ_API_KEY`; never commit `.env`; add `.env` to `.gitignore` |
| **XSS via AI Output** | Sanitize Groq response with `DOMPurify` before rendering in preview |
| **localStorage Data** | No sensitive PII protection needed for MVP; note: data accessible to any script on domain |
| **HTTPS Enforcement** | Groq API requires HTTPS; app should be served over HTTPS in production |


## 11. Performance Budget

| Metric | Budget | Technique |
|--------|--------|-----------|
| **Bundle Size** | < 200 KB gzipped | Tree-shaking; code splitting templates if needed |
| **First Paint** | < 1.5s | Vite pre-bundling; lazy load below-fold |
| **Input Latency** | < 50ms | Debounce form inputs 150ms; preview updates on requestAnimationFrame |
| **AI Response** | < 5s | Timeout after 8s; loading skeleton shown |


## 12. Development Environment Setup

```bash
# 1. Scaffold project
npm create vite@latest ai-resume-builder -- --template react

# 2. Install dependencies
cd ai-resume-builder
npm install react-to-print lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Configure Tailwind (tailwind.config.js)
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}

# 4. Add directives (src/index.css)
@tailwind base;
@tailwind components;
@tailwind utilities;

# 5. Environment variables (.env)
VITE_GROQ_API_KEY=your_groq_api_key_here

# 6. Start dev server
npm run dev
```


## 13. Testing Strategy

| Type | Scope | Tool |
|------|-------|------|
| **Unit** | Reducer logic, utility functions | Vitest (built into Vite) |
| **Component** | Form inputs, template rendering | React Testing Library |
| **Integration** | localStorage sync, PDF trigger | React Testing Library + user-event |
| **Manual** | Cross-browser PDF output, mobile layout | Chrome, Firefox, Safari, iOS Safari |


## 14. Deployment

| Platform | Method | URL |
|----------|--------|-----|
| **Vercel** | GitHub integration + `vite build` | `https://ai-resume-builder.vercel.app` |
| **Netlify** | Drag-and-drop `dist/` folder | `https://ai-resume-builder.netlify.app` |
| **GitHub Pages** | GitHub Actions workflow | `https://username.github.io/ai-resume-builder` |

**Build Command:** `npm run build`  
**Output Directory:** `dist/`


