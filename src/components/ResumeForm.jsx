import PersonalInfo from './sections/PersonalInfo'
import Summary from './sections/Summary'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Achievements from './sections/Achievements'
import Skills from './sections/Skills'

const ResumeForm = () => (
  <div className="space-y-10">
    <PersonalInfo />
    <Summary />
    <Experience />
    <Education />
    <Achievements />
    <Skills />
  </div>
)

export default ResumeForm
