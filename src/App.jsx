import { useRef, useState } from 'react'
import { ResumeProvider, useResume } from './context/ResumeContext'
import { downloadAsPdf, usePdfPrint } from './services/pdfService'
import ActionBar from './components/ActionBar'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import TemplateLayoutSelector from './components/TemplateLayoutSelector'
import TemplateSelector from './components/TemplateSelector'

import { getResumeTheme } from './templates/resumeThemes'

const sampleResumeData = {
  personalInfo: {
    fullName: 'Jordan Lee',
    title: 'Product Designer',
    email: 'jordan.lee@email.com',
    phone: '+1 555 123 4567',
    location: 'San Francisco, CA',
    website: 'jordanlee.design',
  },
  summary:
    'Product designer with 6+ years of experience leading cross-functional teams, shipping consumer-facing products, and building design systems. Focused on clarity, usability, and measurable impact.',
  experience: [
    {
      role: 'Senior Product Designer',
      company: 'Beacon Labs',
      start: '2022',
      end: 'Present',
      highlights: [
        'Led redesign of onboarding, improving activation by 18%.',
        'Built a scalable design system adopted across 5 teams.',
      ],
    },
    {
      role: 'Product Designer',
      company: 'Northwind',
      start: '2019',
      end: '2022',
      highlights: [
        'Partnered with PMs to ship a new pricing experience.',
        'Facilitated research studies to validate workflow changes.',
      ],
    },
  ],
  education: [
    {
      school: 'University of Washington',
      degree: 'B.A. Human-Centered Design',
      start: '2015',
      end: '2019',
      details: 'Dean’s List, Interaction Design Studio',
    },
  ],
  skills: ['Figma', 'Design systems', 'Prototyping', 'User research'],
  achievements: [
    {
      id: 'ach-1',
      title: 'Employee of the Quarter',
      date: 'Q3 2023',
      issuer: 'Beacon Labs',
      description: 'Awarded for extraordinary design leadership during the major product overhaul.',
    },
    {
      id: 'ach-2',
      title: 'UX Design Excellence Award',
      date: '2019',
      issuer: 'University of Washington',
      description: 'Honored for capstone project focused on accessible data visualization tools.',
    },
  ],
}

function ResumeShell() {
  const previewRef = useRef(null)
  const [showPreview, setShowPreview] = useState(false)
  const resume = useResume()
  const { resetResume, setResumeData, selectedTheme } = resume
  const darkMode = Boolean(resume?.darkMode)
  const handlePrint = usePdfPrint(previewRef)
  const handleDownload = () => downloadAsPdf(handlePrint)
  const handleReset = () => {
    const shouldReset = window.confirm(
      'Start a new resume? This will clear the current form data.',
    )
    if (shouldReset) {
      resetResume()
      setShowPreview(false)
    }
  }

  const theme = getResumeTheme(selectedTheme)
  const color1 = theme.preview?.[2] || '#c7d2fe' // theme accent secondary
  const color2 = theme.preview?.[3] || '#fbcfe8' // theme accent tertiary

  return (
    <div className={`relative min-h-screen pb-12 transition-all duration-500 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50/50 text-slate-900'
    }`}>
      {/* Ambient background glowing orbs matching selected theme */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-1000 print:hidden">
        <div 
          className={`absolute -top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full blur-[130px] transition-all duration-1000 animate-pulse ${
            darkMode ? 'opacity-20' : 'opacity-45'
          }`}
          style={{ 
            backgroundColor: color1,
            animationDuration: '10s'
          }}
        />
        <div 
          className={`absolute top-[35%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-all duration-1000 animate-pulse ${
            darkMode ? 'opacity-15' : 'opacity-35'
          }`}
          style={{ 
            backgroundColor: color2,
            animationDuration: '14s'
          }}
        />
        <div 
          className={`absolute -bottom-[10%] left-[15%] w-[35vw] h-[35vw] rounded-full blur-[140px] transition-all duration-1000 ${
            darkMode ? 'opacity-15' : 'opacity-30'
          }`}
          style={{ 
            backgroundColor: color1
          }}
        />
      </div>

      <ActionBar
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview((prev) => !prev)}
        onLoadSample={() => setResumeData(sampleResumeData)}
        onReset={handleReset}
        onDownload={handleDownload}
      />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 print-reset space-y-6">
        <div className="space-y-4 print-hidden">
          <TemplateLayoutSelector />
          <TemplateSelector />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] print-reset">
          <section
            className={`rounded-3xl border p-5 shadow-xl sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 print-hidden ${
              showPreview ? 'hidden lg:block' : 'block'
            } ${
              darkMode 
                ? 'border-slate-805 bg-slate-900/60 text-white shadow-indigo-950/10' 
                : 'border-slate-200/50 bg-white/80 backdrop-blur-md text-slate-900'
            }`}
          >
            <ResumeForm />
          </section>
          <section
            className={`rounded-3xl border p-5 shadow-xl sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 ${
              showPreview ? 'block' : 'hidden lg:block'
            } ${
              darkMode 
                ? 'border-slate-805 bg-slate-900/40 text-white shadow-indigo-950/10' 
                : 'border-slate-200/50 bg-white/90 backdrop-blur-md text-slate-900'
            }`}
          >
            <ResumePreview ref={previewRef} />
          </section>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ResumeProvider>
      <ResumeShell />
    </ResumeProvider>
  )
}

export default App