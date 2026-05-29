import { useRef } from 'react'
import { useResume } from '../context/ResumeContext'
import { resumeThemes } from '../templates/resumeThemes'
import { Palette, ChevronLeft, ChevronRight } from 'lucide-react'

const TemplateSelector = () => {
  const { selectedTheme, setSelectedTheme, darkMode } = useResume()
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
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Choose Accent Color</h2>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Select a color scheme for headers, highlights, and icons.</p>
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
      <div className="relative">
        <div
          ref={scrollContainerRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex overflow-x-auto gap-4 pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {resumeThemes.map((theme) => {
            const isActive = selectedTheme === theme.id
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedTheme(theme.id)}
                className={`group flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer shrink-0 w-[155px] snap-start ${
                  isActive
                    ? `border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/10`
                    : darkMode
                      ? 'border-slate-800 bg-slate-950/40 hover:bg-slate-900/60 hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300'
                }`}
              >
                {/* Color Swatch Circle */}
                <div className="flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white shadow-sm ring-1 ring-slate-100/30">
                  {theme.preview.map((color, index) => (
                    <span
                      key={`${theme.id}-${index}`}
                      className="h-full flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div>
                  <p className={`text-xs font-bold ${
                    isActive 
                      ? darkMode ? 'text-indigo-400' : 'text-indigo-950'
                      : darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {theme.label}
                  </p>
                  <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">Palette</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TemplateSelector
