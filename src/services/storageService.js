const STORAGE_KEY = 'ai_resume_builder_state'
const SCHEMA_VERSION = 1

const wrap = (data) => ({
  version: SCHEMA_VERSION,
  lastSaved: new Date().toISOString(),
  data,
})

export const storageService = {
  save: (state) => {
    try {
      const payload = wrap(state)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      return true
    } catch (e) {
      console.error('storageService.save failed', e)
      return false
    }
  },

  load: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed?.data ?? null
    } catch (e) {
      console.error('storageService.load failed', e)
      return null
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (e) {
      console.error('storageService.clear failed', e)
      return false
    }
  },

  exportJSON: (state) => {
    try {
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resume_backup_${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
      return true
    } catch (e) {
      console.error('storageService.exportJSON failed', e)
      return false
    }
  },
}
