import { Eye, FileDown, FileText, Pencil, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react'
import { useResume } from '../context/ResumeContext'

const ActionBar = ({
  showPreview,
  onTogglePreview,
  onLoadSample,
  onReset,
  onDownload,
}) => {
  const { darkMode, setDarkMode } = useResume()

  return (
    <header className={`border-b ${
      darkMode ? 'border-slate-800 bg-slate-950/90 text-white' : 'border-slate-200/80 bg-white/90 text-slate-900'
    } backdrop-blur print-hidden sticky top-0 z-50 transition-colors duration-500`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-lg font-semibold tracking-tight sm:text-xl">
          <FileText className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <span className={`font-extrabold bg-[linear-gradient(90deg,#4f46e5,#9333ea)] bg-clip-text text-transparent`}>
            Resume Builder
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Light/Dark mode toggle */}
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className={`inline-flex items-center justify-center p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-yellow-400 hover:bg-slate-800 hover:text-yellow-300' 
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onLoadSample}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-500 fill-amber-100" />
            Sample data
          </button>
          <button
            type="button"
            onClick={onDownload}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-300 cursor-pointer ${
              darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <FileDown className="h-4 w-4" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onReset}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            New resume
          </button>
          <button
            type="button"
            onClick={onTogglePreview}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 cursor-pointer lg:hidden ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {showPreview ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreview ? 'Edit form' : 'Preview'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default ActionBar
