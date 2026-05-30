import GroqService from './groqService'

const groq = new GroqService()

const defaultSummaries = [
  "Results-driven professional with a proven track record of optimizing workflows, leading cross-functional teams, and delivering high-impact solutions. Skilled in collaborating with stakeholders to align design with business goals.",
  "Detail-oriented and analytical specialist with extensive experience in designing scalable systems, building reusable component libraries, and spearheading user research studies to drive product success.",
  "Innovative and collaborative leader focused on building user-centered designs, improving onboarding experiences, and shipping consumer-facing products with measurable engagement and retention impact."
]

const defaultHighlights = {
  developer: [
    "Designed and shipped interactive web applications using React, enhancing user retention by 15%.",
    "Collaborated with backend teams to integrate RESTful APIs, reducing request latency by 20%.",
    "Refactored legacy codebases into modern modular components, improving load times by 30%.",
    "Developed automated testing suites using Jest, increasing codebase coverage to 85%."
  ],
  designer: [
    "Led onboarding flow redesign, boosting user activation rate by 18% in the first quarter.",
    "Built and maintained a scalable design system adopted across 5 product development groups.",
    "Facilitated usability tests and synthesized findings to guide UI refinement and feature roadmaps.",
    "Partnered with product managers to deliver wireframes, high-fidelity mockups, and interactive prototypes."
  ],
  generic: [
    "Spearheaded key product enhancements, resulting in a 25% increase in operational efficiency.",
    "Mentored junior team members on design standards and software engineering best practices.",
    "Collaborated closely with cross-functional partners to successfully ship a new pricing system.",
    "Conducted extensive data analysis to identify and resolve critical bottlenecks in user workflows."
  ]
}

const defaultEduDetails = [
  "Specialized in human-centered design, user experience research, and interactive data visualization.",
  "Graduated with honors. Active member of the computer science research group and coding club.",
  "Focused on software engineering principles, algorithms, and agile product development methodologies."
]

const defaultAchDetails = [
  "Awarded for outstanding technical contribution, engineering excellence, and design innovation.",
  "Recognized for leadership and collaborative spirit during the annual cross-department hackathon.",
  "Selected from 100+ candidates for design mentorship, technical competence, and workspace impact."
]

export const aiHelperService = {
  enhanceSummary: async (title, currentSkills) => {
    try {
      const prompt = `Write a professional resume summary for a ${title || 'Professional'} skilled in ${(currentSkills || []).join(', ') || 'industry standards'}. Keep it to 2-3 sentences. Do not use first-person pronouns.`
      const res = await groq._callChatAPI([{ role: 'user', content: prompt }], 150)
      if (res) return res
    } catch (e) {
      console.warn("Groq API call failed, falling back to local suggestion", e)
    }

    const base = defaultSummaries[Math.floor(Math.random() * defaultSummaries.length)]
    if (title) {
      return base.replace(/professional/g, title.toLowerCase())
    }
    return base
  },

  enhanceHighlight: async (role, company) => {
    try {
      const prompt = `Write a single professional resume accomplishment bullet point for the role: ${role || 'team member'} at ${company || 'our company'}. Use action verbs, be concise (max 20 words), and do not use first-person pronouns.`
      const res = await groq._callChatAPI([{ role: 'user', content: prompt }], 80)
      if (res) return res
    } catch (e) {
      console.warn("Groq API call failed, falling back to local suggestion", e)
    }

    const roleStr = String(role || '')
    const isDev = /developer|engineer|coder|tech|programmer|architect/i.test(roleStr)
    const isDesigner = /designer|ux|ui|product|artist/i.test(roleStr)
    
    let list = defaultHighlights.generic
    if (isDev) list = defaultHighlights.developer
    else if (isDesigner) list = defaultHighlights.designer

    let text = list[Math.floor(Math.random() * list.length)]
    if (company) {
      text = text.replace(/Beacon Labs|Northwind/g, company)
    }
    return text
  },

  enhanceEducation: async (degree, school) => {
    try {
      const prompt = `Write a brief resume detail bullet point for a ${degree || 'degree'} at ${school || 'school'}. Max 15 words.`
      const res = await groq._callChatAPI([{ role: 'user', content: prompt }], 60)
      if (res) return res
    } catch (e) {
      console.warn(e)
    }

    return defaultEduDetails[Math.floor(Math.random() * defaultEduDetails.length)]
  },

  enhanceAchievement: async (title, issuer) => {
    try {
      const prompt = `Write a brief resume accomplishment detail for receiving the award ${title || 'award'} from ${issuer || 'organization'}. Max 15 words.`
      const res = await groq._callChatAPI([{ role: 'user', content: prompt }], 60)
      if (res) return res
    } catch (e) {
      console.warn(e)
    }

    return defaultAchDetails[Math.floor(Math.random() * defaultAchDetails.length)]
  }
}
