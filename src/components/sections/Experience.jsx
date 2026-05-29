import { useState } from 'react'
import { Briefcase, Trash2, Plus, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { aiHelperService } from '../../services/aiHelperService'

const Experience = () => {
  const { resumeData, updateExperience, addExperience, removeExperience, darkMode } =
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

  const handleHighlightChange = (roleId, highlights, hIndex, value) => {
    const newH = [...highlights]
    newH[hIndex] = value
    updateExperience(roleId, 'highlights', newH)
  }

  const removeHighlight = (roleId, highlights, hIndex) => {
    const newH = highlights.filter((_, i) => i !== hIndex)
    updateExperience(roleId, 'highlights', newH)
  }

  const addHighlight = (roleId, highlights) => {
    const newH = [...(highlights || []), '']
    updateExperience(roleId, 'highlights', newH)
  }

  const handleAiHighlight = async (roleId, roleTitle, company, highlights, hIndex) => {
    const key = `${roleId}-${hIndex}`
    setIsGenerating(key)
    try {
      const text = await aiHelperService.enhanceHighlight(roleTitle, company)
      const newH = [...highlights]
      newH[hIndex] = text
      updateExperience(roleId, 'highlights', newH)
    } catch (e) {
      console.error("AI Generation failed", e)
    } finally {
      setIsGenerating(null)
    }
  }

  const list = resumeData.experience || []

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Briefcase className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Experience</h2>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition cursor-pointer ${
            darkMode
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Plus className="h-4 w-4" />
          Add role
        </button>
      </div>

      <div className="space-y-6">
        {list.map((role, index) => {
          const highlights = role.highlights || []
          return (
            <div
              key={role.id}
              className={`rounded-2xl border p-5 shadow-sm space-y-5 transition-all ${
                darkMode
                  ? 'border-slate-800/80 bg-slate-900/30 text-white hover:bg-slate-900/40'
                  : 'border-slate-200 bg-slate-50/60 text-slate-900 hover:bg-slate-50/80'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100/10 pb-3">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Role {index + 1}
                </h3>
                {list.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(role.id)}
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

              {/* Form Inputs */}
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={textLabelClass}>
                  Role / Title
                  <input
                    className={inputClassName}
                    value={role.role}
                    onChange={(event) => updateExperience(role.id, 'role', event.target.value)}
                    placeholder="e.g. Senior Product Designer"
                  />
                </label>
                <label className={textLabelClass}>
                  Company
                  <input
                    className={inputClassName}
                    value={role.company}
                    onChange={(event) => updateExperience(role.id, 'company', event.target.value)}
                    placeholder="e.g. Beacon Labs"
                  />
                </label>
                <label className={textLabelClass}>
                  Start Date
                  <input
                    className={inputClassName}
                    value={role.start}
                    onChange={(event) => updateExperience(role.id, 'start', event.target.value)}
                    placeholder="e.g. 2022"
                  />
                </label>
                <label className={textLabelClass}>
                  End Date
                  <input
                    className={inputClassName}
                    value={role.end}
                    onChange={(event) => updateExperience(role.id, 'end', event.target.value)}
                    placeholder="e.g. Present"
                  />
                </label>
              </div>

              {/* Highlights (Subsections with Add/Remove and AI buttons) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Key Highlights & Accomplishments
                  </span>
                  <button
                    type="button"
                    onClick={() => addHighlight(role.id, highlights)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                      darkMode
                        ? 'bg-slate-800 text-indigo-300 hover:bg-slate-700'
                        : 'bg-slate-200/60 text-indigo-600 hover:bg-slate-200'
                    }`}
                  >
                    <Plus className="h-3 w-3" />
                    Add bullet point
                  </button>
                </div>

                {highlights.length === 0 ? (
                  <div className={`rounded-xl border border-dashed text-center p-5 text-xs ${
                    darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
                  }`}>
                    No highlights added. Click "Add bullet point" to specify achievements.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {highlights.map((highlight, hIndex) => {
                      const key = `${role.id}-${hIndex}`
                      const isThisGenerating = isGenerating === key

                      return (
                        <div key={hIndex} className="flex gap-2 items-center">
                          {/* Highlight Input */}
                          <div className="flex-1 relative">
                            <input
                              className={`${inputClassName} pr-20`}
                              value={highlight}
                              onChange={(event) =>
                                handleHighlightChange(role.id, highlights, hIndex, event.target.value)
                              }
                              placeholder="Describe a key achievement..."
                            />
                            
                            {/* AI suggestion button */}
                            <button
                              type="button"
                              onClick={() => handleAiHighlight(role.id, role.role, role.company, highlights, hIndex)}
                              disabled={isThisGenerating}
                              className={`absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                                darkMode
                                  ? 'border-indigo-900 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60'
                                  : 'border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                              }`}
                            >
                              {isThisGenerating ? (
                                <span className="h-2.5 w-2.5 animate-spin rounded-full border border-indigo-400 border-t-transparent" />
                              ) : <Sparkles className="h-2.5 w-2.5" />}
                              AI Bullet
                            </button>
                          </div>

                          {/* Delete bullet button */}
                          <button
                            type="button"
                            onClick={() => removeHighlight(role.id, highlights, hIndex)}
                            className={`p-2 rounded-lg border transition shrink-0 cursor-pointer ${
                              darkMode
                                ? 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-rose-400'
                                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-rose-600'
                            }`}
                            title="Remove bullet point"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Experience
