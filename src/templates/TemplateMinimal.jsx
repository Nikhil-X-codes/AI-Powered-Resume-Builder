const SectionTitle = ({ children, theme }) => (
  <h2 className={`text-[11px] font-bold uppercase tracking-wider border-b border-slate-100 pb-1 ${theme.section}`}>
    {children}
  </h2>
)

const TemplateMinimal = ({ data, theme }) => (
  <div className="space-y-4 text-xs text-slate-800 font-sans">
    {/* Header */}
    <div className="flex justify-between items-start gap-4">
      <div>
        <h1 className={`text-xl font-bold tracking-tight ${theme.accentText}`}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xs font-medium text-slate-600">
          {data.personalInfo.title || 'Your Title'}
        </p>
      </div>
      <div className="text-right text-[10px] text-slate-500 space-y-0.5">
        {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
        {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
        {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
        {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
      </div>
    </div>

    {/* Summary */}
    {data.summary ? (
      <div className="space-y-1">
        <SectionTitle theme={theme}>Summary</SectionTitle>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          {data.summary}
        </p>
      </div>
    ) : null}

    {/* Experience */}
    <div className="space-y-2">
      <SectionTitle theme={theme}>Experience</SectionTitle>
      <div className="space-y-3">
        {data.experience.map((item, index) => (
          <div key={`${item.company}-${index}`} className="space-y-1">
            <div className="flex justify-between items-baseline text-[11px]">
              <div>
                <span className={`font-semibold ${theme.accentText}`}>{item.role || 'Role'}</span>
                <span className="text-slate-400"> | </span>
                <span className="font-medium text-slate-700">{item.company || 'Company'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {item.start || 'Start'} - {item.end || 'End'}
              </span>
            </div>
            {item.highlights.length > 0 ? (
              <ul className="list-disc space-y-0.5 pl-3.5 text-[10.5px] text-slate-500">
                {item.highlights.map((highlight, highlightIndex) => (
                  <li key={`${highlight}-${highlightIndex}`}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>

    {/* Education */}
    <div className="space-y-2">
      <SectionTitle theme={theme}>Education</SectionTitle>
      <div className="space-y-2">
        {data.education.map((entry, index) => (
          <div key={`${entry.school}-${index}`} className="space-y-0.5">
            <div className="flex justify-between items-baseline text-[11px]">
              <div>
                <span className={`font-semibold ${theme.accentText}`}>{entry.school || 'School'}</span>
                <span className="text-slate-400"> | </span>
                <span className="text-slate-700">{entry.degree || 'Degree'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {entry.start || 'Start'} - {entry.end || 'End'}
              </span>
            </div>
            {entry.details ? (
              <p className="text-[10px] text-slate-500 italic">{entry.details}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>

    {/* Achievements */}
    {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) ? (
      <div className="space-y-2">
        <SectionTitle theme={theme}>Achievements & Rewards</SectionTitle>
        <div className="space-y-2">
          {data.achievements.filter(a => a.title).map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-0.5 text-[11px]">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className={`font-semibold ${theme.accentText}`}>{item.title}</span>
                  {item.issuer && <span className="text-slate-500"> ({item.issuer})</span>}
                </div>
                {item.date && <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>}
              </div>
              {item.description ? (
                <p className="text-[10px] text-slate-500 leading-relaxed">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ) : null}

    {/* Skills */}
    {data.skills.length > 0 ? (
      <div className="space-y-1">
        <SectionTitle theme={theme}>Skills</SectionTitle>
        <p className="text-[10.5px] text-slate-600 leading-relaxed">
          {data.skills.join(' • ')}
        </p>
      </div>
    ) : null}
  </div>
)

export default TemplateMinimal
