const SectionHeader = ({ label, index, theme }) => (
  <div className="flex items-center gap-3 border-b border-slate-100 pb-1">
    <span className={`font-mono text-xs font-semibold ${theme.section}`}>
      0{index}.
    </span>
    <h2 className={`font-mono text-xs font-bold uppercase tracking-wider text-slate-800`}>
      {label}
    </h2>
    <div className="flex-1 h-[1px] bg-slate-100" />
    <span className="font-mono text-[10px] text-slate-300">{"</>"}</span>
  </div>
)

const TemplateTech = ({ data, theme }) => (
  <div className="space-y-5 text-xs text-slate-700 font-sans p-1">
    {/* Header */}
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start bg-slate-50/50 p-4 rounded-xl border border-slate-200/60">
      <div className="space-y-1">
        <h1 className={`text-2xl font-black tracking-tight font-mono uppercase ${theme.accentText}`}>
          {data.personalInfo.fullName || 'YOUR_NAME'}
        </h1>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {"//"} {data.personalInfo.title || 'YOUR_TITLE'}
        </p>
      </div>
      <div className="font-mono text-[10.5px] text-slate-600 space-y-0.5">
        {data.personalInfo.email && (
          <div><span className={`font-semibold ${theme.section}`}>email:</span> "{data.personalInfo.email}"</div>
        )}
        {data.personalInfo.phone && (
          <div><span className={`font-semibold ${theme.section}`}>phone:</span> "{data.personalInfo.phone}"</div>
        )}
        {data.personalInfo.location && (
          <div><span className={`font-semibold ${theme.section}`}>locat:</span> "{data.personalInfo.location}"</div>
        )}
        {data.personalInfo.website && (
          <div><span className={`font-semibold ${theme.section}`}>web:</span> <span className="underline">{data.personalInfo.website}</span></div>
        )}
      </div>
    </div>

    {/* Summary */}
    {data.summary ? (
      <div className="space-y-2">
        <SectionHeader label="Summary" index={1} theme={theme} />
        <p className="leading-relaxed text-slate-600 pl-4 border-l-2 border-slate-200">
          {data.summary}
        </p>
      </div>
    ) : null}

    {/* Experience */}
    {data.experience.length > 0 && (
      <div className="space-y-3">
        <SectionHeader label="Experience" index={data.summary ? 2 : 1} theme={theme} />
        <div className="space-y-4 pl-4 border-l-2 border-slate-200">
          {data.experience.map((item, index) => (
            <div key={`${item.company}-${index}`} className="space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between text-xs">
                <div>
                  <span className={`font-bold tracking-tight text-slate-800 font-mono`}>{item.role || 'Role'}</span>
                  <span className="text-slate-400"> @ </span>
                  <span className={`font-semibold ${theme.accentText} font-mono`}>{item.company || 'Company'}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/50">
                  {item.start || 'Start'} - {item.end || 'End'}
                </span>
              </div>
              {item.highlights.length > 0 ? (
                <ul className="list-none space-y-1 text-slate-600 text-[11px]">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={`${highlight}-${highlightIndex}`} className="flex items-start gap-1.5">
                      <span className={`font-mono text-[10px] select-none ${theme.section}`}>*</span>
                      <span>{highlight}</span>
                    </li>
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
        <SectionHeader 
          label="Education" 
          index={(data.summary ? 1 : 0) + (data.experience.length > 0 ? 2 : 1)} 
          theme={theme} 
        />
        <div className="space-y-3 pl-4 border-l-2 border-slate-200">
          {data.education.map((entry, index) => (
            <div key={`${entry.school}-${index}`} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 font-mono">{entry.school || 'School'}</span>
                  <span className="text-slate-400"> :: </span>
                  <span className="text-slate-500 font-mono">{entry.degree || 'Degree'}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  [{entry.start || 'Start'} - {entry.end || 'End'}]
                </span>
              </div>
              {entry.details ? (
                <p className="text-[10px] text-slate-500 italic pl-1 font-mono">// {entry.details}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Achievements */}
    {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) && (
      <div className="space-y-3">
        <SectionHeader 
          label="Achievements" 
          index={(data.summary ? 1 : 0) + (data.experience.length > 0 ? 1 : 0) + (data.education.length > 0 ? 2 : 1)} 
          theme={theme} 
        />
        <div className="space-y-3 pl-4 border-l-2 border-slate-200">
          {data.achievements.filter(a => a.title).map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between text-xs">
                <div>
                  <span className={`font-bold font-mono ${theme.accentText}`}>{item.title}</span>
                  {item.issuer && (
                    <>
                      <span className="text-slate-400"> via </span>
                      <span className="text-slate-600 font-mono">{item.issuer}</span>
                    </>
                  )}
                </div>
                {item.date && (
                  <span className="font-mono text-[10px] text-slate-400">[{item.date}]</span>
                )}
              </div>
              {item.description && (
                <p className="text-[10.5px] text-slate-500 pl-1 leading-relaxed font-mono">// {item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills.length > 0 ? (
      <div className="space-y-2">
        <SectionHeader 
          label="Skills" 
          index={(data.summary ? 1 : 0) + (data.experience.length > 0 ? 1 : 0) + (data.education.length > 0 ? 1 : 0) + (data.achievements?.some(a => a.title) ? 2 : 1)} 
          theme={theme} 
        />
        <div className="flex flex-wrap gap-1.5 pl-4 border-l-2 border-slate-200">
          {data.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={`font-mono text-[10px] rounded px-2 py-0.5 border ${theme.chip} border-slate-200/60 shadow-sm`}
            >
              [{skill}]
            </span>
          ))}
        </div>
      </div>
    ) : null}
  </div>
)

export default TemplateTech
