const SectionTitle = ({ children, theme }) => (
  <h2 className={`text-xs font-semibold uppercase tracking-widest ${theme.section}`}>
    {children}
  </h2>
)

const TemplateModern = ({ data, theme }) => (
  <div className={`space-y-6 text-slate-900 ${theme.accentText}`}>
    <div className="space-y-1">
      <h1 className={`text-2xl font-semibold ${theme.accentText}`}>{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className={`text-sm ${theme.section}`}>{data.personalInfo.title || 'Your Title'}</p>
      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        <span>{data.personalInfo.email}</span>
        <span>{data.personalInfo.phone}</span>
        <span>{data.personalInfo.location}</span>
        <span>{data.personalInfo.website}</span>
      </div>
    </div>

    {data.summary ? (
      <div className="space-y-2">
        <SectionTitle theme={theme}>Summary</SectionTitle>
        <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
      </div>
    ) : null}

    <div className="space-y-4">
      <SectionTitle theme={theme}>Experience</SectionTitle>
      {data.experience.map((item, index) => (
        <div key={`${item.company}-${index}`} className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between text-sm">
            <div>
              <span className={`font-semibold ${theme.accentText}`}>{item.role || 'Role'}</span>
              <span className="text-slate-500"> · {item.company || 'Company'}</span>
            </div>
            <span className="text-xs text-slate-500">
              {item.start || 'Start'} - {item.end || 'End'}
            </span>
          </div>
          {item.highlights.length > 0 ? (
            <ul className="list-disc space-y-1 pl-4 text-xs text-slate-600">
              {item.highlights.map((highlight, highlightIndex) => (
                <li key={`${highlight}-${highlightIndex}`}>{highlight}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>

    <div className="space-y-4">
      <SectionTitle theme={theme}>Education</SectionTitle>
      {data.education.map((entry, index) => (
        <div key={`${entry.school}-${index}`} className="space-y-1 text-sm">
          <div className="flex flex-wrap items-baseline justify-between">
            <div>
              <span className={`font-semibold ${theme.accentText}`}>{entry.school || 'School'}</span>
              <span className="text-slate-500"> · {entry.degree || 'Degree'}</span>
            </div>
            <span className="text-xs text-slate-500">
              {entry.start || 'Start'} - {entry.end || 'End'}
            </span>
          </div>
          {entry.details ? (
            <p className="text-xs text-slate-600">{entry.details}</p>
          ) : null}
        </div>
      ))}
    </div>

    {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) ? (
      <div className="space-y-4">
        <SectionTitle theme={theme}>Achievements & Rewards</SectionTitle>
        <div className="space-y-3">
          {data.achievements.filter(a => a.title).map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-1 text-sm">
              <div className="flex flex-wrap items-baseline justify-between">
                <div>
                  <span className={`font-semibold ${theme.accentText}`}>{item.title}</span>
                  {item.issuer && <span className="text-slate-500"> · {item.issuer}</span>}
                </div>
                {item.date && <span className="text-xs text-slate-500">{item.date}</span>}
              </div>
              {item.description ? (
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ) : null}

    {data.skills.length > 0 ? (
      <div className="space-y-2">
        <SectionTitle theme={theme}>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={`rounded-full px-2 py-1 text-xs ${theme.chip}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ) : null}
  </div>
)

export default TemplateModern
