import { Sparkles, Briefcase, GraduationCap, Trophy, Layers } from 'lucide-react'

const SectionTitle = ({ children, theme }) => (
  <h2 className={`text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5 border-b border-slate-100 pb-1 ${theme.section}`}>
    {children}
  </h2>
)

const TemplateCreativeTwo = ({ data, theme }) => (
  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white min-h-[700px] text-xs font-sans text-slate-700">
    {/* Full-width colored banner header */}
    <div className={`p-6 ${theme.accent} text-white space-y-3`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase leading-none">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs font-bold text-white/90 uppercase tracking-widest mt-1">
            {data.personalInfo.title || 'Your Title'}
          </p>
        </div>
        <div className="text-right text-[10px] text-white/80 space-y-0.5 font-medium">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
    </div>

    {/* Content Grid (2 Columns) */}
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
      {/* Left Column: Experience */}
      <div className="space-y-5">
        <SectionTitle theme={theme}>
          <Briefcase className="h-3.5 w-3.5" />
          <span>Professional Experience</span>
        </SectionTitle>
        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <div key={`${item.company}-${index}`} className="relative pl-3.5 border-l-2 border-slate-100 space-y-1">
              <div className="absolute -left-[5px] top-[5px] h-2 w-2 rounded-full bg-slate-350" />
              <div className="font-bold text-slate-800 text-[11px] leading-tight">
                {item.role || 'Role'}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                {item.company || 'Company'} | {item.start || 'Start'} - {item.end || 'End'}
              </div>
              {item.highlights.length > 0 && (
                <ul className="list-disc space-y-0.5 pl-3 text-[10px] text-slate-500">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={`${highlight}-${highlightIndex}`}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Profile, Education, Achievements, Skills */}
      <div className="space-y-5">
        {/* Summary */}
        {data.summary && (
          <div className="space-y-2">
            <SectionTitle theme={theme}>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Profile Summary</span>
            </SectionTitle>
            <p className="text-[10.5px] leading-relaxed text-slate-500">
              {data.summary}
            </p>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="space-y-2">
            <SectionTitle theme={theme}>
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Education</span>
            </SectionTitle>
            <div className="space-y-3">
              {data.education.map((entry, index) => (
                <div key={`${entry.school}-${index}`} className="relative pl-3.5 border-l-2 border-slate-100 space-y-0.5">
                  <div className="absolute -left-[5px] top-[5px] h-2 w-2 rounded-full bg-slate-350" />
                  <div className="font-bold text-slate-800 text-[10.5px]">
                    {entry.school || 'School'}
                  </div>
                  <div className="text-[9.5px] text-slate-500 font-medium">
                    {entry.degree || 'Degree'} ({entry.start || 'Start'} - {entry.end || 'End'})
                  </div>
                  {entry.details && (
                    <p className="text-[9.5px] text-slate-400 italic">{entry.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) && (
          <div className="space-y-2">
            <SectionTitle theme={theme}>
              <Trophy className="h-3.5 w-3.5" />
              <span>Achievements</span>
            </SectionTitle>
            <div className="space-y-3">
              {data.achievements.filter(a => a.title).map((item, index) => (
                <div key={`${item.title}-${index}`} className="relative pl-3.5 border-l-2 border-slate-100 space-y-0.5">
                  <div className="absolute -left-[5px] top-[5px] h-2 w-2 rounded-full bg-slate-350" />
                  <div className="font-bold text-slate-800 text-[10.5px]">
                    {item.title}
                  </div>
                  <div className="text-[9.5px] text-slate-500 font-medium">
                    {item.issuer || 'Award'} {item.date ? `(${item.date})` : ''}
                  </div>
                  {item.description && (
                    <p className="text-[9.5px] text-slate-400 leading-normal">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="space-y-2">
            <SectionTitle theme={theme}>
              <Layers className="h-3.5 w-3.5" />
              <span>Key Skills</span>
            </SectionTitle>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className={`rounded px-1.5 py-0.5 text-[9.5px] font-semibold border ${theme.chip} border-slate-100 shadow-sm`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default TemplateCreativeTwo
