const TemplateClassic = ({ data, theme }) => (
  <div className={`space-y-6 text-slate-900 ${theme.accentText}`}>
    <div className={`border-b ${theme.border} pb-3`}>
      <h1 className={`text-2xl font-semibold ${theme.accentText}`}>{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className={`text-sm ${theme.section}`}>{data.personalInfo.title || 'Your Title'}</p>
      <p className="mt-2 text-xs text-slate-500">
        {[
          data.personalInfo.email,
          data.personalInfo.phone,
          data.personalInfo.location,
          data.personalInfo.website,
        ]
          .filter(Boolean)
          .join(' | ')}
      </p>
    </div>

    {data.summary ? (
      <section>
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme.section}`}>
          Summary
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{data.summary}</p>
      </section>
    ) : null}

    <section>
      <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme.section}`}>
        Experience
      </h2>
      <div className="mt-3 space-y-4">
        {data.experience.map((item, index) => (
          <div key={`${item.company}-${index}`} className="text-sm">
            <div className="flex flex-wrap items-baseline justify-between">
              <div>
                <span className={`font-semibold ${theme.accentText}`}>{item.role || 'Role'}</span>
                <span className="text-slate-500"> · {item.company || 'Company'}</span>
              </div>
              <span className="text-xs text-slate-500">
                {item.start || 'Start'} - {item.end || 'End'}
              </span>
            </div>
            {item.highlights.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">
                {item.highlights.map((highlight, highlightIndex) => (
                  <li key={`${highlight}-${highlightIndex}`}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme.section}`}>
        Education
      </h2>
      <div className="mt-3 space-y-3 text-sm">
        {data.education.map((entry, index) => (
          <div key={`${entry.school}-${index}`}>
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
              <p className="mt-1 text-xs text-slate-600">{entry.details}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>

    {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title) ? (
      <section>
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme.section}`}>
          Achievements & Rewards
        </h2>
        <div className="mt-3 space-y-3 text-sm">
          {data.achievements.filter(a => a.title).map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <div className="flex flex-wrap items-baseline justify-between">
                <div>
                  <span className={`font-semibold ${theme.accentText}`}>{item.title}</span>
                  {item.issuer && <span className="text-slate-500"> · {item.issuer}</span>}
                </div>
                {item.date && <span className="text-xs text-slate-500">{item.date}</span>}
              </div>
              {item.description ? (
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    ) : null}

    {data.skills.length > 0 ? (
      <section>
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme.section}`}>
          Skills
        </h2>
        <p className={`mt-2 text-xs ${theme.section}`}>
          {data.skills.join(', ')}
        </p>
      </section>
    ) : null}
  </div>
)

export default TemplateClassic
