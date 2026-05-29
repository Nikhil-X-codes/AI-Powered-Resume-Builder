import { useState } from 'react'
import { Sparkles, Plus, X } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

const Skills = () => {
  const { resumeData, setSkills, darkMode } = useResume()
  const [newSkill, setNewSkill] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const activeSkills = resumeData.skills || []

  const handleAddSkill = (e) => {
    if (e) e.preventDefault()
    const trimmed = newSkill.trim()
    if (trimmed && !activeSkills.includes(trimmed)) {
      setSkills([...activeSkills, trimmed])
      setNewSkill('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(activeSkills.filter((s) => s !== skillToRemove))
  }

  const handleAiSuggestSkills = async () => {
    setIsLoading(true)
    try {
      // Role title lookup
      const title = resumeData.personalInfo.title || 'Professional'
      const isDev = /developer|engineer|coder|tech|programmer|architect/i.test(title)
      const isDesigner = /designer|ux|ui|product|artist/i.test(title)
      
      let suggestions = ['Communication', 'Problem Solving', 'Project Management']
      if (isDev) {
        suggestions = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git', 'RESTful APIs', 'CSS/Tailwind']
      } else if (isDesigner) {
        suggestions = ['Figma', 'UI/UX Design', 'Design Systems', 'Wireframing', 'Prototyping', 'User Research']
      }
      
      // Merge unique ones
      const merged = [...activeSkills]
      suggestions.forEach((s) => {
        if (!merged.includes(s)) merged.push(s)
      })
      
      // Simulate typewriter/AI delay
      await new Promise((r) => setTimeout(r, 600))
      setSkills(merged)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Skills</h2>
        </div>
        
        <button
          type="button"
          onClick={handleAiSuggestSkills}
          disabled={isLoading}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            darkMode
              ? 'border-slate-800 bg-slate-900 text-indigo-300 hover:bg-slate-800 hover:text-white'
              : 'border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100/60'
          }`}
        >
          {isLoading ? (
            <span className="h-3 w-3 animate-spin rounded-full border border-indigo-400 border-t-transparent" />
          ) : <Sparkles className="h-3.5 w-3.5" />}
          Suggest skills
        </button>
      </div>

      {/* Skills Adder Input */}
      <form onSubmit={handleAddSkill} className="flex gap-2">
        <input
          type="text"
          className={`flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
            darkMode
              ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder-slate-500'
              : 'bg-white border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-200'
          }`}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g. React, Figma, Python)..."
        />
        <button
          type="submit"
          className={`inline-flex items-center justify-center p-2 rounded-lg border transition shrink-0 cursor-pointer ${
            darkMode
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      {/* Active Skill Pills Container */}
      {activeSkills.length === 0 ? (
        <div className={`rounded-xl border border-dashed text-center p-6 text-xs ${
          darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          No skills added. Type above and click "+" or suggest with AI.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 pt-1.5">
          {activeSkills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border shadow-sm ${
                darkMode
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className={`p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer text-slate-400 hover:text-rose-500`}
                title="Remove skill"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  )
}

export default Skills
