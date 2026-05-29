import { useState } from 'react'
import { AlignLeft, Sparkles, Trash2, RotateCcw } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { aiHelperService } from '../../services/aiHelperService'

const Summary = () => {
  const { resumeData, updateSummary, darkMode } = useResume()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async (mode) => {
    setIsLoading(true)
    setError('')

    try {
      const { personalInfo, skills } = resumeData
      const jobTitle = personalInfo.title || 'Professional'
      
      let output = ''
      if (mode === 'objective') {
        // Fallback to education suggestion
        output = `Eager and motivated ${jobTitle} looking to leverage academic knowledge and projects in an industry role. Dedicated to collaborative problem-solving and delivering high-quality user experiences.`
      } else {
        output = await aiHelperService.enhanceSummary(jobTitle, skills)
      }

      if (output) {
        updateSummary(output)
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong while generating the summary.')
    } finally {
      setIsLoading(false)
    }
  }

  const hasSummary = resumeData.summary.trim().length > 0

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlignLeft className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Summary / Objective
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleGenerate('summary')}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-indigo-300 hover:bg-slate-800 hover:text-white' 
                : 'border-slate-200 bg-white text-indigo-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {isLoading ? (
              <span className="h-3 w-3 animate-spin rounded-full border border-indigo-400 border-t-transparent" />
            ) : <Sparkles className="h-3 w-3" />}
            Generate summary
          </button>
          
          <button
            type="button"
            onClick={() => handleGenerate('objective')}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            Generate objective
          </button>

          {hasSummary && (
            <button
              type="button"
              onClick={() => updateSummary('')}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                darkMode
                  ? 'border-slate-800 bg-slate-900 text-rose-400 hover:bg-rose-950/20 hover:text-rose-300'
                  : 'border-slate-200 bg-white text-rose-600 hover:bg-rose-50 hover:border-slate-300'
              }`}
            >
              <Trash2 className="h-3 w-3" />
              Remove
            </button>
          )}
        </div>
      </div>
      <textarea
        className={`min-h-[130px] w-full rounded-xl border px-4 py-3 text-sm leading-6 focus:outline-none focus:ring-2 transition-all ${
          darkMode
            ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder-slate-500'
            : 'bg-white border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-200'
        }`}
        value={resumeData.summary}
        onChange={(event) => updateSummary(event.target.value)}
        placeholder="Introduce yourself. Highlight your key strengths, years of experience, and primary skills. (Click 'Generate summary' to write automatically)"
      />
      {error ? (
        <p className="text-xs text-rose-500">{error}</p>
      ) : null}
    </section>
  )
}

export default Summary
