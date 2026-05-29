import { useState } from 'react'
import { GraduationCap, Trash2, Plus, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { aiHelperService } from '../../services/aiHelperService'

const Education = () => {
  const { resumeData, updateEducation, addEducation, removeEducation, darkMode } =
    useResume()
  const [isGenerating, setIsGenerating] = useState(null)

  const inputClassName = `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
    darkMode
      ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
      : 'bg-white border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-200'
  }`

  const textLabelClass = `block space-y-2 text-sm font-semibold ${
    darkMode ? 'text-slate-300' : 'text-slate-700'
  }`

  const handleAiDetails = async (entry) => {
    setIsGenerating(entry.id)
    try {
      const text = await aiHelperService.enhanceEducation(entry.degree, entry.school)
      updateEducation(entry.id, 'details', text)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(null)
    }
  }

  const list = resumeData.education || []

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GraduationCap className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Education</h2>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition cursor-pointer ${
            darkMode
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Plus className="h-4 w-4" />
          Add school
        </button>
      </div>

      <div className="space-y-6">
        {list.map((entry, index) => {
          const isThisGenerating = isGenerating === entry.id
          return (
            <div
              key={entry.id}
              className={`rounded-2xl border p-5 shadow-sm space-y-5 transition-all ${
                darkMode
                  ? 'border-slate-800/80 bg-slate-900/30 text-white hover:bg-slate-900/40'
                  : 'border-slate-200 bg-slate-50/60 text-slate-900 hover:bg-slate-50/80'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100/10 pb-3">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  School {index + 1}
                </h3>
                {list.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(entry.id)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition cursor-pointer ${
                      darkMode
                        ? 'text-rose-400 hover:bg-rose-950/20'
                        : 'text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>

              {/* Grid Inputs */}
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={textLabelClass}>
                  School Name
                  <input
                    className={inputClassName}
                    value={entry.school}
                    onChange={(event) => updateEducation(entry.id, 'school', event.target.value)}
                    placeholder="e.g. University of Washington"
                  />
                </label>
                <label className={textLabelClass}>
                  Degree or Major
                  <input
                    className={inputClassName}
                    value={entry.degree}
                    onChange={(event) => updateEducation(entry.id, 'degree', event.target.value)}
                    placeholder="e.g. B.A. Human-Centered Design"
                  />
                </label>
                <label className={textLabelClass}>
                  Start Date
                  <input
                    className={inputClassName}
                    value={entry.start}
                    onChange={(event) => updateEducation(entry.id, 'start', event.target.value)}
                    placeholder="e.g. 2015"
                  />
                </label>
                <label className={textLabelClass}>
                  End Date
                  <input
                    className={inputClassName}
                    value={entry.end}
                    onChange={(event) => updateEducation(entry.id, 'end', event.target.value)}
                    placeholder="e.g. 2019"
                  />
                </label>
              </div>

              {/* Details and AI help */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Honors, Coursework, or Focus Details
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => handleAiDetails(entry)}
                    disabled={isThisGenerating}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border transition cursor-pointer ${
                      darkMode
                        ? 'border-indigo-900 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60'
                        : 'border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    {isThisGenerating ? (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border border-indigo-400 border-t-transparent" />
                    ) : <Sparkles className="h-3.5 w-3.5" />}
                    Suggest details
                  </button>
                </div>
                
                <textarea
                  className={`min-h-[90px] w-full rounded-xl border px-4 py-3 text-sm leading-6 focus:outline-none focus:ring-2 transition-all ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-200'
                  }`}
                  value={entry.details}
                  onChange={(event) => updateEducation(entry.id, 'details', event.target.value)}
                  placeholder="Focus areas, capstone projects, key GPA stats, or honors..."
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Education
