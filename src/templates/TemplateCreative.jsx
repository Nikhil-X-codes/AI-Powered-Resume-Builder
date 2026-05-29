import { Mail, Phone, MapPin, Link2, Award, Briefcase, GraduationCap, Trophy, Sparkles } from 'lucide-react'

const SidebarItem = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 text-[11px] text-white/80">
    <Icon className="h-3.5 w-3.5 shrink-0 text-white/90" />
    <span className="truncate">{children}</span>
  </div>
)

const TemplateCreative = ({ data, theme }) => {
  // Extract theme color names for custom badges
  const isDarkTheme = theme.id === 'slate'
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] print:grid-cols-[240px_1fr] gap-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white min-h-[700px]">
      {/* Left Sidebar */}
      <div className={`p-6 ${theme.accent} text-white flex flex-col justify-between space-y-6 print:py-6 print:px-5`}>
        <div className="space-y-6">
          {/* Header Info */}
          <div className="space-y-1.5">
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xs font-semibold text-white/95 uppercase tracking-wider">
              {data.personalInfo.title || 'Your Title'}
            </p>
            <div className="h-1 w-10 bg-white/40 rounded-full mt-2" />
          </div>

          {/* Contact Details */}
          <div className="space-y-3 pt-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Contact</h3>
            <div className="space-y-2">
              {data.personalInfo.email && (
                <SidebarItem icon={Mail}>{data.personalInfo.email}</SidebarItem>
              )}
              {data.personalInfo.phone && (
                <SidebarItem icon={Phone}>{data.personalInfo.phone}</SidebarItem>
              )}
              {data.personalInfo.location && (
                <SidebarItem icon={MapPin}>{data.personalInfo.location}</SidebarItem>
              )}
              {data.personalInfo.website && (
                <SidebarItem icon={Link2}>{data.personalInfo.website}</SidebarItem>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg bg-white/15 px-2 py-1 text-[10px] font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Accent */}
        <div className="text-[9px] text-white/40 pt-6 border-t border-white/10 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-white/60" />
          <span>Creative Portfolio Design</span>
        </div>
      </div>

      {/* Right Column */}
      <div className="p-6 md:p-8 print:p-6 bg-white space-y-6">
        {/* Summary */}
        {data.summary && (
          <div className="space-y-2">
            <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${theme.accentText}`}>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs leading-relaxed text-slate-600">
              {data.summary}
            </p>
            <div className="border-b border-slate-100 pt-2" />
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="space-y-4">
            <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${theme.accentText}`}>
              <Briefcase className="h-3.5 w-3.5" />
              <span>Experience</span>
            </h2>
            <div className="space-y-4">
              {data.experience.map((item, index) => (
                <div key={`${item.company}-${index}`} className="relative pl-4 border-l border-slate-100 space-y-1.5">
                  <div className="absolute -left-[5px] top-[5px] h-2.5 w-2.5 rounded-full bg-slate-200 border-2 border-white" />
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{item.role || 'Role'}</span>
                      <span className="text-slate-400"> · </span>
                      <span className="font-medium text-slate-500">{item.company || 'Company'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.start || 'Start'} - {item.end || 'End'}
                    </span>
                  </div>
                  {item.highlights.length > 0 && (
                    <ul className="list-disc space-y-1 pl-4 text-[10.5px] text-slate-500">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <li key={`${highlight}-${highlightIndex}`}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="border-b border-slate-100 pt-1" />
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="space-y-4">
            <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${theme.accentText}`}>
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Education</span>
            </h2>
            <div className="space-y-3">
              {data.education.map((entry, index) => (
                <div key={`${entry.school}-${index}`} className="relative pl-4 border-l border-slate-100 space-y-1">
                  <div className="absolute -left-[5px] top-[5px] h-2.5 w-2.5 rounded-full bg-slate-200 border-2 border-white" />
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{entry.school || 'School'}</span>
                      <span className="text-slate-400"> · </span>
                      <span className="text-slate-500">{entry.degree || 'Degree'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {entry.start || 'Start'} - {entry.end || 'End'}
                    </span>
                  </div>
                  {entry.details && (
                    <p className="text-[10px] text-slate-500 italic pl-0.5">{entry.details}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="border-b border-slate-100 pt-1" />
          </div>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) && (
          <div className="space-y-4">
            <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${theme.accentText}`}>
              <Trophy className="h-3.5 w-3.5" />
              <span>Achievements & Awards</span>
            </h2>
            <div className="space-y-3">
              {data.achievements.filter(a => a.title).map((item, index) => (
                <div key={`${item.title}-${index}`} className="relative pl-4 border-l border-slate-100 space-y-1">
                  <div className="absolute -left-[5px] top-[5px] h-2.5 w-2.5 rounded-full bg-slate-200 border-2 border-white" />
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{item.title}</span>
                      {item.issuer && (
                        <>
                          <span className="text-slate-400"> · </span>
                          <span className="font-medium text-slate-500">{item.issuer}</span>
                        </>
                      )}
                    </div>
                    {item.date && (
                      <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[10px] text-slate-500 leading-relaxed pl-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateCreative
