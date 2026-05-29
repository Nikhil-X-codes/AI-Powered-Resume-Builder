import { useState } from 'react'
import { UserCircle } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

const PersonalInfo = () => {
  const { resumeData, updatePersonalInfo, darkMode } = useResume()
  const { personalInfo } = resumeData
  const [touched, setTouched] = useState({})

  const inputClassName = `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
    darkMode
      ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder-slate-500'
      : 'bg-white border-slate-200 text-slate-900 focus:border-slate-400 focus:ring-slate-200'
  }`

  const labelClass = `block space-y-2 text-sm font-semibold ${
    darkMode ? 'text-slate-300' : 'text-slate-700'
  }`

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const getError = (field, value) => {
    if (!touched[field]) return ''
    if ((field === 'fullName' || field === 'title' || field === 'email') && !value) {
      return 'This field is required.'
    }
    if (field === 'email' && value && !validateEmail(value)) {
      return 'Enter a valid email address.'
    }
    return ''
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <UserCircle className={`h-5 w-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Personal Info</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Full name
          <input
            className={inputClassName}
            value={personalInfo.fullName}
            onChange={(event) => updatePersonalInfo('fullName', event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
            placeholder="Jordan Lee"
          />
          {getError('fullName', personalInfo.fullName) ? (
            <span className="block text-xs font-normal text-rose-600">
              {getError('fullName', personalInfo.fullName)}
            </span>
          ) : null}
        </label>
        <label className={labelClass}>
          Role or title
          <input
            className={inputClassName}
            value={personalInfo.title}
            onChange={(event) => updatePersonalInfo('title', event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
            placeholder="Product Designer"
          />
          {getError('title', personalInfo.title) ? (
            <span className="block text-xs font-normal text-rose-600">
              {getError('title', personalInfo.title)}
            </span>
          ) : null}
        </label>
        <label className={labelClass}>
          Email
          <input
            className={inputClassName}
            value={personalInfo.email}
            onChange={(event) => updatePersonalInfo('email', event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            placeholder="you@email.com"
          />
          {getError('email', personalInfo.email) ? (
            <span className="block text-xs font-normal text-rose-600">
              {getError('email', personalInfo.email)}
            </span>
          ) : null}
        </label>
        <label className={labelClass}>
          Phone
          <input
            className={inputClassName}
            value={personalInfo.phone}
            onChange={(event) => updatePersonalInfo('phone', event.target.value)}
            placeholder="+1 555 123 4567"
          />
        </label>
        <label className={labelClass}>
          Location
          <input
            className={inputClassName}
            value={personalInfo.location}
            onChange={(event) => updatePersonalInfo('location', event.target.value)}
            placeholder="San Francisco, CA"
          />
        </label>
        <label className={labelClass}>
          Website
          <input
            className={inputClassName}
            value={personalInfo.website}
            onChange={(event) => updatePersonalInfo('website', event.target.value)}
            placeholder="portfolio.com"
          />
        </label>
      </div>
    </section>
  )
}

export default PersonalInfo
