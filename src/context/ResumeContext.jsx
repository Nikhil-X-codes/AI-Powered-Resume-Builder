import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useRef,
} from 'react'
import DOMPurify from "dompurify";
import { storageService } from '../services/storageService'

const ResumeContext = createContext(null)

const initialResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  },
  summary: '',
  experience: [
    {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'exp-1',
      role: '',
      company: '',
      start: '',
      end: '',
      highlights: [],
    },
  ],
  education: [
    {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'edu-1',
      school: '',
      degree: '',
      start: '',
      end: '',
      details: '',
    },
  ],
  skills: [],
  achievements: [
    {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'ach-1',
      title: '',
      date: '',
      issuer: '',
      description: '',
    },
  ],
}

const actionTypes = {
  UPDATE_PERSONAL_INFO: 'UPDATE_PERSONAL_INFO',
  UPDATE_SUMMARY: 'UPDATE_SUMMARY',
  UPDATE_EXPERIENCE: 'UPDATE_EXPERIENCE',
  ADD_EXPERIENCE: 'ADD_EXPERIENCE',
  REMOVE_EXPERIENCE: 'REMOVE_EXPERIENCE',
  UPDATE_EDUCATION: 'UPDATE_EDUCATION',
  ADD_EDUCATION: 'ADD_EDUCATION',
  REMOVE_EDUCATION: 'REMOVE_EDUCATION',
  SET_SKILLS: 'SET_SKILLS',
  SET_RESUME_DATA: 'SET_RESUME_DATA',
  RESET_RESUME: 'RESET_RESUME',
  UPDATE_ACHIEVEMENT: 'UPDATE_ACHIEVEMENT',
  ADD_ACHIEVEMENT: 'ADD_ACHIEVEMENT',
  REMOVE_ACHIEVEMENT: 'REMOVE_ACHIEVEMENT',
}

const ensureIds = (data) => {
  if (!data) return data
  const experience = (data.experience || []).map((item, index) => ({
    id: item.id || `exp-${index}-${Date.now()}-${Math.random()}`,
    ...item,
  }))
  const education = (data.education || []).map((item, index) => ({
    id: item.id || `edu-${index}-${Date.now()}-${Math.random()}`,
    ...item,
  }))
  const achievements = (data.achievements || []).map((item, index) => ({
    id: item.id || `ach-${index}-${Date.now()}-${Math.random()}`,
    ...item,
  }))
  return {
    ...data,
    experience,
    education,
    achievements,
  }
}

const resumeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PERSONAL_INFO: {
      const { field, value } = action.payload
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          [field]: value,
        },
      }
    }
    case actionTypes.UPDATE_SUMMARY:
      try {
        const clean = DOMPurify.sanitize(action.payload)
        return {
          ...state,
          summary: clean,
        }
      } catch {
        return {
          ...state,
          summary: action.payload,
        }
      }
    case actionTypes.UPDATE_EXPERIENCE: {
      const { index, field, value } = action.payload
      const experience = (state.experience || []).map((item, itemIndex) =>
        itemIndex === index || item.id === index ? { ...item, [field]: value } : item,
      )
      return { ...state, experience }
    }
    case actionTypes.ADD_EXPERIENCE:
      return {
        ...state,
        experience: [
          ...(state.experience || []),
          {
            id:
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}`,
            role: '',
            company: '',
            start: '',
            end: '',
            highlights: [],
          },
        ],
      }
    case actionTypes.REMOVE_EXPERIENCE:
      return {
        ...state,
        experience: (state.experience || []).filter((item) => item.id !== action.payload),
      }
    case actionTypes.UPDATE_EDUCATION: {
      const { index, field, value } = action.payload
      const education = (state.education || []).map((item, itemIndex) =>
        itemIndex === index || item.id === index ? { ...item, [field]: value } : item,
      )
      return { ...state, education }
    }
    case actionTypes.ADD_EDUCATION:
      return {
        ...state,
        education: [
          ...(state.education || []),
          {
            id:
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}`,
            school: '',
            degree: '',
            start: '',
            end: '',
            details: '',
          },
        ],
      }
    case actionTypes.REMOVE_EDUCATION:
      return {
        ...state,
        education: (state.education || []).filter((item) => item.id !== action.payload),
      }
    case actionTypes.SET_SKILLS:
      return {
        ...state,
        skills: action.payload,
      }
    case actionTypes.UPDATE_ACHIEVEMENT: {
      const { index, field, value } = action.payload
      const achievements = (state.achievements || []).map((item, itemIndex) =>
        itemIndex === index || item.id === index ? { ...item, [field]: value } : item,
      )
      return { ...state, achievements }
    }
    case actionTypes.ADD_ACHIEVEMENT:
      return {
        ...state,
        achievements: [
          ...(state.achievements || []),
          {
            id:
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}`,
            title: '',
            date: '',
            issuer: '',
            description: '',
          },
        ],
      }
    case actionTypes.REMOVE_ACHIEVEMENT:
      return {
        ...state,
        achievements: (state.achievements || []).filter((item) => item.id !== action.payload),
      }
    case actionTypes.SET_RESUME_DATA:
      return ensureIds({
        ...initialResumeData,
        ...action.payload,
      })
    case actionTypes.RESET_RESUME:
      return ensureIds(initialResumeData)
    default:
      return state
  }
}

const initResumeState = () => {
  const loaded = storageService.load()
  if (!loaded) return ensureIds(initialResumeData)
  return ensureIds({
    ...initialResumeData,
    ...loaded,
  })
}

export function ResumeProvider({ children }) {
  const [resumeData, dispatch] = useReducer(resumeReducer, undefined, initResumeState)
  const [selectedTheme, setSelectedTheme] = useState('slate')
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_resume_builder_template')
      return saved ?? 'modern'
    } catch {
      return 'modern'
    }
  })
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_resume_builder_dark_mode')
      return saved === 'true'
    } catch {
      return false
    }
  })
  const saveTimer = useRef(null)

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => storageService.save(resumeData), 500)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [resumeData])

  useEffect(() => {
    try {
      localStorage.setItem('ai_resume_builder_template', selectedTemplate)
    } catch (e) {
      console.error(e)
    }
  }, [selectedTemplate])

  useEffect(() => {
    try {
      localStorage.setItem('ai_resume_builder_dark_mode', String(darkMode))
    } catch (e) {
      console.error(e)
    }
  }, [darkMode])

  const updatePersonalInfo = (field, value) =>
    dispatch({
      type: actionTypes.UPDATE_PERSONAL_INFO,
      payload: { field, value },
    })

  const updateSummary = (value) =>
    dispatch({ type: actionTypes.UPDATE_SUMMARY, payload: value })

  const updateExperience = (id, field, value) =>
    dispatch({
      type: actionTypes.UPDATE_EXPERIENCE,
      payload: { index: id, field, value },
    })

  const addExperience = () => dispatch({ type: actionTypes.ADD_EXPERIENCE })

  const removeExperience = (id) =>
    dispatch({ type: actionTypes.REMOVE_EXPERIENCE, payload: id })

  const updateEducation = (id, field, value) =>
    dispatch({
      type: actionTypes.UPDATE_EDUCATION,
      payload: { index: id, field, value },
    })

  const addEducation = () => dispatch({ type: actionTypes.ADD_EDUCATION })

  const removeEducation = (id) =>
    dispatch({ type: actionTypes.REMOVE_EDUCATION, payload: id })

  const setSkills = (skills) =>
    dispatch({ type: actionTypes.SET_SKILLS, payload: skills })

  const updateAchievement = (id, field, value) =>
    dispatch({
      type: actionTypes.UPDATE_ACHIEVEMENT,
      payload: { index: id, field, value },
    })

  const addAchievement = () => dispatch({ type: actionTypes.ADD_ACHIEVEMENT })

  const removeAchievement = (id) =>
    dispatch({ type: actionTypes.REMOVE_ACHIEVEMENT, payload: id })

  const setResumeData = (data) =>
    dispatch({ type: actionTypes.SET_RESUME_DATA, payload: data })

  const resetResume = () => {
    storageService.clear()
    dispatch({ type: actionTypes.RESET_RESUME })
  }

  const value = useMemo(
    () => ({
      resumeData,
      selectedTheme,
      setSelectedTheme,
      selectedTemplate,
      setSelectedTemplate,
      darkMode,
      setDarkMode,
      updatePersonalInfo,
      updateSummary,
      updateExperience,
      addExperience,
      removeExperience,
      updateEducation,
      addEducation,
      removeEducation,
      setSkills,
      updateAchievement,
      addAchievement,
      removeAchievement,
      setResumeData,
      resetResume,
    }),
    [resumeData, selectedTheme, selectedTemplate, darkMode],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider')
  }
  return context
}
