import { useState } from 'react'
import { Trophy, Trash2, Plus, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { aiHelperService } from '../../services/aiHelperService'

const Achievements = () => {
  const { resumeData, updateAchievement, addAchievement, removeAchievement, darkMode } =
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

  const handleAiDescription = async (item) => {
    setIsGenerating(item.id)
    try {
      const text = await aiHelperService.enhanceAchievement(item.title, item.issuer)
      updateAchievement(item.id, 'description', text)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(null)
    }
  }

  const achievementsList = resumeData.achievements || []

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Trophy className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Achievements & Rewards
          </h2>
        </div>
        <button
          type="button"
          onClick={addAchievement}
          className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition cursor-pointer ${
            darkMode
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Plus className="h-4 w-4" />
          Add award
        </button>
      </div>

      {achievementsList.length === 0 ? (
        <div className={`rounded-2xl border border-dashed p-8 text-center text-sm ${
          darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          No achievements or rewards added yet. Click "Add award" above to get started.
        </div>
      ) : (
        <div className="space-y-6">
          {achievementsList.map((item, index) => {
            const isThisGenerating = isGenerating === item.id
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 shadow-sm space-y-5 transition-all ${
                  darkMode
                    ? 'border-slate-800/80 bg-slate-900/30 text-white hover:bg-slate-900/40'
                    : 'border-slate-200 bg-slate-50/60 text-slate-900 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-100/10 pb-3">
                  <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Award / Achievement {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeAchievement(item.id)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition cursor-pointer ${
                      darkMode
                        ? 'text-rose-400 hover:bg-rose-950/20'
                        : 'text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>

                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  <label className={`${textLabelClass} sm:col-span-2`}>
                    Title
                    <input
                      className={inputClassName}
                      value={item.title}
                      onChange={(event) =>
                        updateAchievement(item.id, 'title', event.target.value)
                      }
                      placeholder="e.g. Employee of the Quarter, 1st Place Hackathon"
                    />
                  </label>
                  <label className={textLabelClass}>
                    Date
                    <input
                      className={inputClassName}
                      value={item.date}
                      onChange={(event) =>
                        updateAchievement(item.id, 'date', event.target.value)
                      }
                      placeholder="e.g. 2024, Q3 2023"
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <label className={textLabelClass}>
                    Issuer / Organization
                    <input
                      className={inputClassName}
                      value={item.issuer}
                      onChange={(event) =>
                        updateAchievement(item.id, 'issuer', event.target.value)
                      }
                      placeholder="e.g. Google, Beacon Labs, Interaction Design Association"
                    />
                  </label>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <label className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Description / Details
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAiDescription(item)}
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
                        Suggest description
                      </button>
                    </div>
                    <textarea
                      className={`min-h-[90px] w-full rounded-xl border px-4 py-3 text-sm leading-6 focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                          : 'bg-white border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-200'
                      }`}
                      value={item.description}
                      onChange={(event) =>
                        updateAchievement(item.id, 'description', event.target.value)
                      }
                      placeholder="Describe the achievement, criteria, or impact..."
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Achievements
