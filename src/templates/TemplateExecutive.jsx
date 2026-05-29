const SectionTitle = ({ children, theme }) => (
  <div className="space-y-1 pt-2">
    <h2 className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.section}`}>
      {children}
    </h2>
    <div className={`h-[1.5px] w-full ${theme.accent}`} />
  </div>
)

const TemplateExecutive = ({ data, theme }) => (
  <div className="space-y-5 text-xs text-slate-800 font-serif">
    {/* Centered Executive Header */}
    <div className="text-center space-y-1.5 pb-2">
      <h1 className={`text-2xl font-bold uppercase tracking-wide tracking-widest ${theme.accentText}`}>
        {data.personalInfo.fullName || 'Your Name'}
      </h1>
      <p className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-slate-500">
        {data.personalInfo.title || 'Your Title'}
      </p>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-slate-500 font-sans text-[10.5px]">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
      </div>
    </div>

    {/* Summary */}
    {data.summary ? (
      <div className="space-y-2">
        <SectionTitle theme={theme}>Professional Summary</SectionTitle>
        <p className="leading-relaxed text-slate-650 font-sans text-[11px] text-justify">
          {data.summary}
        </p>
      </div>
    ) : null}

    {/* Experience */}
    {data.experience.length > 0 && (
      <div className="space-y-3">
        <SectionTitle theme={theme}>Experience</SectionTitle>
        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <div key={`${item.company}-${index}`} className="space-y-1">
              <div className="flex justify-between items-baseline font-sans">
                <div className="text-xs">
                  <span className={`font-bold ${theme.accentText}`}>{item.role || 'Role'}</span>
                  <span className="text-slate-400"> · </span>
                  <span className="font-semibold text-slate-600">{item.company || 'Company'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium italic">
                  {item.start || 'Start'} – {item.end || 'End'}
                </span>
              </div>
              {item.highlights.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-[11px] text-slate-600">
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
      <div className="space-y-3">
        <SectionTitle theme={theme}>Education</SectionTitle>
        <div className="space-y-2">
          {data.education.map((entry, index) => (
            <div key={`${entry.school}-${index}`} className="space-y-0.5">
              <div className="flex justify-between items-baseline font-sans">
                <div className="text-xs">
                  <span className={`font-bold ${theme.accentText}`}>{entry.school || 'School'}</span>
                  <span className="text-slate-400"> · </span>
                  <span className="text-slate-600">{entry.degree || 'Degree'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium italic">
                  {entry.start || 'Start'} – {entry.end || 'End'}
                </span>
              </div>
              {entry.details ? (
                <p className="text-[10px] text-slate-500 italic pl-1">{entry.details}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Achievements */}
    {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) && (
      <div className="space-y-3">
        <SectionTitle theme={theme}>Achievements & Honors</SectionTitle>
        <div className="space-y-3">
          {data.achievements.filter(a => a.title).map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-0.5">
              <div className="flex justify-between items-baseline font-sans">
                <div className="text-xs">
                  <span className={`font-bold ${theme.accentText}`}>{item.title}</span>
                  {item.issuer && (
                    <>
                      <span className="text-slate-400"> · </span>
                      <span className="text-slate-600">{item.issuer}</span>
                    </>
                  )}
                </div>
                {item.date && (
                  <span className="text-[10px] text-slate-500 font-medium italic">{item.date}</span>
                )}
              </div>
              {item.description && (
                <p className="text-[10px] text-slate-500 pl-1">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills.length > 0 ? (
      <div className="space-y-2">
        <SectionTitle theme={theme}>Key Competencies</SectionTitle>
        <p className="text-[11px] text-slate-650 font-sans leading-relaxed">
          {data.skills.join(' | ')}
        </p>
      </div>
    ) : null}
  </div>
)

export default TemplateExecutive
