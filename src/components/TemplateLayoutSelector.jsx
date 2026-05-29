import { useRef } from 'react'
import { useResume } from '../context/ResumeContext'
import { getResumeTheme } from '../templates/resumeThemes'
import { LayoutGrid, Sparkles, BookOpen, Layers, Zap, Feather, ChevronLeft, ChevronRight } from 'lucide-react'

const TemplateLayoutSelector = () => {
  const { selectedTheme, selectedTemplate, setSelectedTemplate, darkMode } = useResume()
  const theme = getResumeTheme(selectedTheme)
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth
      const scrollAmount = direction === 'left' ? -containerWidth * 0.6 : containerWidth * 0.6
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const layouts = [
    {
      id: 'modern',
      name: 'Modern Clean',
      description: 'Asymmetric header with spacious sans-serif typography. Great for standard business/corporate resumes.',
      icon: Layers,
      tag: 'Most Popular',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col gap-2">
          {/* Header */}
          <div className="space-y-1">
            <div className="h-2 w-16 rounded bg-slate-400" />
            <div className="h-1.5 w-10 rounded bg-slate-300" />
            <div className="h-1 w-20 rounded bg-slate-200" />
          </div>
          {/* Body */}
          <div className="flex-1 space-y-1.5">
            <div className={`h-1.5 w-full rounded ${theme.accentSoft}`} />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-4/5 rounded bg-slate-100" />
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Classic Serif',
      description: 'Formal top border line with traditional serif-styled spacing. Excellent for academic and corporate paths.',
      icon: BookOpen,
      tag: 'Formal',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col gap-2">
          {/* Header */}
          <div className="text-center space-y-1 pb-1.5 border-b border-slate-100">
            <div className="h-2 w-20 rounded bg-slate-400 mx-auto" />
            <div className="h-1.5 w-24 rounded bg-slate-200 mx-auto" />
          </div>
          {/* Body */}
          <div className="flex-1 space-y-1.5">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-2/3 rounded bg-slate-100" />
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'High-Density Minimal',
      description: 'Ultra-compact, space-saving layout. Maximizes content density to fit extensive histories into one page.',
      icon: Feather,
      tag: 'Compact',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl p-2.5 flex justify-between gap-3">
          {/* Left Column content */}
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-14 rounded bg-slate-400" />
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-slate-100" />
              <div className="h-1 w-full rounded bg-slate-100" />
              <div className="h-1 w-4/5 rounded bg-slate-100" />
            </div>
            <div className="h-1.5 w-12 rounded bg-slate-300" />
            <div className="h-1 w-full rounded bg-slate-100" />
          </div>
          {/* Right contacts */}
          <div className="w-12 space-y-1 text-right">
            <div className="h-1 w-8 rounded bg-slate-200 ml-auto" />
            <div className="h-1 w-10 rounded bg-slate-200 ml-auto" />
            <div className="h-1 w-6 rounded bg-slate-200 ml-auto" />
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative Sidebar',
      description: 'Two-column design with a solid, colorful left column. High-impact look for creative and design agencies.',
      icon: Sparkles,
      tag: 'Dynamic',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl flex overflow-hidden">
          {/* Left Sidebar */}
          <div className={`w-[60px] h-full ${theme.accent} p-1.5 flex flex-col gap-2`}>
            <div className="h-1.5 w-8 rounded bg-white/70" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-6 rounded bg-white/40" />
              <div className="h-0.5 w-8 rounded bg-white/40" />
            </div>
            <div className="mt-auto flex flex-wrap gap-0.5">
              <div className="h-1 w-3 rounded bg-white/30" />
              <div className="h-1 w-4 rounded bg-white/30" />
              <div className="h-1 w-2 rounded bg-white/30" />
            </div>
          </div>
          {/* Right Main Column */}
          <div className="flex-1 p-2 flex flex-col gap-2">
            <div className="h-1.5 w-12 rounded bg-slate-300" />
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-slate-100" />
              <div className="h-1 w-full rounded bg-slate-100" />
              <div className="h-1 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'elegant',
      name: 'Elegant Serif',
      description: 'Sophisticated centered serif headers with ornate dividers. Ideal for executive, consulting, and art leadership.',
      icon: Feather,
      tag: 'Premium',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center justify-between">
          {/* Header */}
          <div className="space-y-0.5 text-center">
            <div className="h-2 w-16 rounded bg-slate-400 mx-auto" />
            <div className="h-1 w-24 rounded bg-slate-200 mx-auto" />
          </div>
          {/* Elegant Divider ornament */}
          <div className="flex items-center gap-1">
            <div className="h-[0.5px] w-4 bg-slate-200" />
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <div className="h-[0.5px] w-4 bg-slate-200" />
          </div>
          {/* Body */}
          <div className="w-full space-y-1">
            <div className="h-1.5 w-14 rounded bg-slate-300 mx-auto" />
            <div className="h-1 w-4/5 rounded bg-slate-100 mx-auto" />
          </div>
        </div>
      )
    },
    {
      id: 'tech',
      name: 'Developer Tech',
      description: 'Monospace code annotations, tags, and section indices. Crafted for software engineers and systems builders.',
      icon: Zap,
      tag: 'Tech Tagged',
      mockup: (
        <div className="w-full h-24 bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col gap-1.5">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-1">
            <div className="h-2 w-12 rounded bg-slate-500" />
            <div className="h-1.5 w-10 rounded bg-slate-700" />
          </div>
          {/* Body */}
          <div className="flex-1 flex gap-1.5">
            <div className="w-1 border-r border-slate-800" />
            <div className="flex-1 space-y-1 mt-0.5">
              <div className="h-1.5 w-16 rounded bg-slate-700" />
              <div className="flex gap-1">
                <div className="h-1.5 w-5 rounded bg-slate-800 border border-slate-700" />
                <div className="h-1.5 w-6 rounded bg-slate-800 border border-slate-700" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'executive',
      name: 'Executive Leader',
      description: 'Serif executive header, thick theme color rules, and clean aligned timelines. Perfect for managers, consultants, and leaders.',
      icon: BookOpen,
      tag: 'Executive',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center gap-1.5">
          <div className="h-1.5 w-12 rounded bg-slate-400 mx-auto" />
          <div className="h-1 w-20 rounded bg-slate-200 mx-auto" />
          <div className={`h-[1px] w-full ${theme.accent}`} />
          <div className="w-full flex justify-between">
            <div className="h-1 w-12 rounded bg-slate-350" />
            <div className="h-1 w-6 rounded bg-slate-200" />
          </div>
          <div className="w-full space-y-0.5 mt-0.5">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-5/6 rounded bg-slate-100" />
          </div>
        </div>
      )
    },
    {
      id: 'creativeTwo',
      name: 'Creative Banner',
      description: 'Top colored theme banner header with white details and double parallel columns below. Compact, highly visual, and modern.',
      icon: Layers,
      tag: 'Grid Split',
      mockup: (
        <div className="w-full h-24 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden">
          <div className={`w-full ${theme.accent} p-1.5 flex flex-col gap-1`}>
            <div className="h-1.5 w-12 rounded bg-white/70" />
            <div className="h-1 w-20 rounded bg-white/40" />
          </div>
          <div className="flex-1 p-1.5 grid grid-cols-2 gap-2">
            <div className="space-y-1 border-r border-slate-100 pr-1">
              <div className="h-1 w-8 rounded bg-slate-300" />
              <div className="h-0.5 w-full rounded bg-slate-100" />
              <div className="h-0.5 w-full rounded bg-slate-100" />
            </div>
            <div className="space-y-1">
              <div className="h-1 w-6 rounded bg-slate-300" />
              <div className="h-0.5 w-full rounded bg-slate-100" />
              <div className="h-0.5 w-full rounded bg-slate-100" />
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className={`w-full rounded-3xl border p-5 shadow-lg print-hidden space-y-4 transition-all duration-500 relative ${
      darkMode 
        ? 'border-slate-800 bg-slate-900/70 backdrop-blur-md text-white' 
        : 'border-slate-200 bg-white/80 backdrop-blur-md text-slate-900'
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-2 ${
            darkMode ? 'bg-indigo-950 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
          }`}>
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Choose Design Layout</h2>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pick a layout structure. Content adapts instantly.</p>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50'
            }`}
            title="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50'
            }`}
            title="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll container with chevron arrows */}
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex overflow-x-auto gap-4 pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {layouts.map((layout) => {
            const isActive = selectedTemplate === layout.id

            return (
              <button
                key={layout.id}
                type="button"
                onClick={() => setSelectedTemplate(layout.id)}
                className={`group flex flex-col rounded-2xl border text-left p-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer shrink-0 w-[185px] snap-start ${
                  isActive
                    ? `border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/10`
                    : darkMode
                      ? `border-slate-800 bg-slate-950/40 hover:bg-slate-900/60 hover:border-slate-700`
                      : `border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300`
                }`}
              >
                {/* Mini CSS Mockup */}
                <div className="w-full relative mb-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]">
                  {layout.mockup}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white text-[9px] font-bold shadow">
                      ✓
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="w-full">
                  <p className={`text-xs font-bold font-sans truncate ${
                    isActive 
                      ? darkMode ? 'text-indigo-400' : 'text-indigo-900' 
                      : darkMode ? 'text-slate-300' : 'text-slate-900'
                  }`}>
                    {layout.name}
                  </p>
                </div>

                {/* Tag Pill */}
                <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold w-fit ${
                  isActive 
                    ? 'bg-indigo-600/20 text-indigo-400' 
                    : darkMode
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {layout.tag}
                </span>

                {/* Description */}
                <p className={`mt-2 text-[10px] leading-normal line-clamp-2 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {layout.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TemplateLayoutSelector
