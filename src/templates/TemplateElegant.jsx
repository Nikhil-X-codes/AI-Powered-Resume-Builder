const Divider = ({ theme }) => (
  <div className="flex items-center justify-center gap-2 py-2 print:py-1">
    <div className={`h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-300`} />
    <span className={`text-[10px] uppercase tracking-widest text-slate-400 font-serif italic`}>§</span>
    <div className={`h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-300`} />
  </div>
)

const SectionTitle = ({ children, theme }) => (
  <div className="text-center space-y-1">
    <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] font-serif ${theme.section}`}>
      {children}
    </h2>
    <div className="flex justify-center">
      <div className={`h-[1px] w-16 bg-slate-200`} />
    </div>
  </div>
)

const TemplateElegant = ({ data, theme }) => (
  <div className="space-y-6 text-slate-800 font-serif p-2">
    {/* Header */}
    <div className="text-center space-y-2">
      <h1 className={`text-3xl tracking-wide font-normal font-serif ${theme.accentText}`}>
        {data.personalInfo.fullName || 'Your Name'}
      </h1>
      <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-sans font-semibold">
        {data.personalInfo.title || 'Your Title'}
      </p>
      
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500 font-sans">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
      </div>
    </div>

    <Divider theme={theme} />

    {/* Summary */}
    {data.summary ? (
      <div className="space-y-3">
        <SectionTitle theme={theme}>Professional Summary</SectionTitle>
        <p className="text-sm leading-relaxed text-slate-600 text-center italic max-w-2xl mx-auto px-4">
          "{data.summary}"
        </p>
      </div>
    ) : null}

    {/* Experience */}
    {data.experience.length > 0 && (
      <div className="space-y-4 pt-2">
        <SectionTitle theme={theme}>Experience</SectionTitle>
        <div className="space-y-5">
          {data.experience.map((item, index) => (
            <div key={`${item.company}-${index}`} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between border-b border-slate-100 pb-1 text-sm">
                <div>
                  <span className={`font-semibold tracking-wide ${theme.accentText}`}>{item.role || 'Role'}</span>
                  <span className="text-slate-400 italic"> at </span>
                  <span className="font-semibold text-slate-600 italic">{item.company || 'Company'}</span>
                </div>
                <span className="text-xs text-slate-500 font-sans italic">
                  {item.start || 'Start'} – {item.end || 'End'}
                </span>
              </div>
              {item.highlights.length > 0 ? (
                <ul className="list-disc space-y-1.5 pl-6 text-xs text-slate-600 leading-relaxed">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={`${highlight}-${highlightIndex}`}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {data.education.length > 0 && (
      <div className="space-y-4 pt-2">
        <SectionTitle theme={theme}>Education</SectionTitle>
        <div className="space-y-4">
          {data.education.map((entry, index) => (
            <div key={`${entry.school}-${index}`} className="space-y-1 text-sm">
              <div className="flex flex-wrap items-baseline justify-between border-b border-slate-100 pb-1">
                <div>
                  <span className={`font-semibold ${theme.accentText}`}>{entry.school || 'School'}</span>
                  <span className="text-slate-400 italic"> — </span>
                  <span className="font-semibold text-slate-600 italic">{entry.degree || 'Degree'}</span>
                </div>
                <span className="text-xs text-slate-500 font-sans italic">
                  {entry.start || 'Start'} – {entry.end || 'End'}
                </span>
              </div>
              {entry.details ? (
                <p className="text-xs text-slate-500 italic pl-1">{entry.details}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Achievements */}
    {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) && (
      <div className="space-y-4 pt-2">
        <SectionTitle theme={theme}>Achievements & Rewards</SectionTitle>
        <div className="space-y-4">
          {data.achievements.filter(a => a.title).map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-1 text-sm">
              <div className="flex flex-wrap items-baseline justify-between border-b border-slate-100 pb-1">
                <div>
                  <span className={`font-semibold tracking-wide ${theme.accentText}`}>{item.title}</span>
                  {item.issuer && (
                    <>
                      <span className="text-slate-400 italic"> by </span>
                      <span className="font-semibold text-slate-600 italic">{item.issuer}</span>
                    </>
                  )}
                </div>
                {item.date && (
                  <span className="text-xs text-slate-500 font-sans italic">{item.date}</span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-slate-600 leading-relaxed pl-1">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills.length > 0 ? (
      <div className="space-y-3 pt-2">
        <SectionTitle theme={theme}>Key Skills</SectionTitle>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-sans font-medium uppercase tracking-wider">
          {data.skills.map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}</span>
          ))}
        </div>
      </div>
    ) : null}
  </div>
)

export default TemplateElegant
