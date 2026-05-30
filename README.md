# Resume Builder

A client-side resume builder built with React and Vite. The app lets users enter resume data through a form, preview the result instantly, switch between multiple layouts and color themes, and export the final resume as a PDF.

## Features

- Live resume preview that updates as you type
- Multiple resume layouts, including modern, classic, creative, executive, minimal, and tech-focused styles
- Theme and accent color selection
- AI-assisted content generation for summaries and resume bullets
- Local autosave with browser localStorage
- PDF export with print-friendly formatting
- Sample data loading for quick demos
- Light and dark mode support

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Lucide React icons
- react-to-print for PDF export
- dompurify for sanitizing generated content
- Groq AI via a Netlify Function proxy

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Environment Variables

Set `GROQ_API_KEY` in your Netlify site environment variables. The browser never needs the Groq key, so there is no Vite `.env` entry for AI access.

When the function is unavailable or the API call fails, the AI helper falls back to local suggestions.

## Project Structure

- src/App.jsx - main app shell and layout
- src/components/ - form, preview, action bar, and template selectors
- src/context/ResumeContext.jsx - global resume state and persistence
- src/services/ - AI, PDF, and storage helpers
- src/templates/ - template themes and layout components
- docs/ - product and technical documentation

## How It Works

1. Resume data is managed in a React context.
2. Form changes are persisted automatically to localStorage.
3. The preview pane renders the selected template in real time.
4. The download action triggers print-to-PDF output sized for A4.

## Notes

- This is a frontend-only application; there is no backend or database.
- Resets clear both in-memory state and saved browser data.
- Sample data is available from the top action bar for quick testing.
