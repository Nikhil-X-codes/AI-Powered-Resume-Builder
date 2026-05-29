import { forwardRef } from 'react'
import { useResume } from '../context/ResumeContext'
import { getResumeTheme } from '../templates/resumeThemes'

// Import all templates
import TemplateModern from '../templates/TemplateModern'
import TemplateClassic from '../templates/TemplateClassic'
import TemplateMinimal from '../templates/TemplateMinimal'
import TemplateCreative from '../templates/TemplateCreative'
import TemplateElegant from '../templates/TemplateElegant'
import TemplateTech from '../templates/TemplateTech'
import TemplateExecutive from '../templates/TemplateExecutive'
import TemplateCreativeTwo from '../templates/TemplateCreativeTwo'

const templates = {
  modern: TemplateModern,
  classic: TemplateClassic,
  minimal: TemplateMinimal,
  creative: TemplateCreative,
  elegant: TemplateElegant,
  tech: TemplateTech,
  executive: TemplateExecutive,
  creativeTwo: TemplateCreativeTwo,
}

const ResumePreview = forwardRef(function ResumePreview(_, ref) {
  const { resumeData, selectedTheme, selectedTemplate } = useResume()
  const theme = getResumeTheme(selectedTheme)
  
  const Template = templates[selectedTemplate] || TemplateModern

  // Creative and Tech templates manage their own padding and borders.
  // Minimal handles its spacing. Classic and Modern benefit from a slight container padding.
  const isSelfContained = ['creative', 'creativeTwo', 'tech', 'minimal'].includes(selectedTemplate)

  return (
    <div
      ref={ref}
      className={`min-h-[720px] rounded-2xl border bg-white p-6 shadow-inner print-preview sm:p-8 ${theme.border}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-4 print-hidden">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.section}`}>
            {theme.label} palette · {selectedTemplate} layout
          </p>
          <p className="text-xs text-slate-500">Live preview of your resume sheet.</p>
        </div>
        <div className="flex gap-2">
          {theme.preview.map((color, index) => (
            <span
              key={`${theme.id}-preview-${index}`}
              className="h-4 w-4 rounded-full ring-1 ring-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <div className={isSelfContained ? '' : `${theme.accentSoft} rounded-2xl p-5 sm:p-6 print:p-0 print:bg-transparent`}>
        <Template data={resumeData} theme={theme} />
      </div>
    </div>
  )
})

export default ResumePreview
