
Product Requirements Document (PRD)
## AI-Powered Resume Builder

---

## 1. Executive Summary

The AI-Powered Resume Builder is a client-side web application that enables users to create professional, visually appealing resumes through an intuitive form-based interface. The platform leverages the Groq AI API to generate professional summaries and career objectives, provides real-time preview across multiple templates, and exports the final resume as a PDF document. All data persists locally in the browser.

---

## 2. Problem Statement

Students and job seekers struggle to create professional resumes due to:
- Limited design knowledge and formatting skills
- Difficulty writing impactful career summaries
- Time-consuming manual layout adjustments in word processors
- Inconsistent styling and unprofessional output

---

## 3. Objectives

1. Reduce resume creation time from hours to under 15 minutes
2. Eliminate formatting/design knowledge barriers
3. Improve resume quality through AI-generated professional summaries
4. Provide instant visual feedback via real-time preview
5. Deliver production-ready PDF output without backend infrastructure

---

## 4. Target Users

| Persona | Description | Primary Need |
|---------|-------------|--------------|
| **University Student** | Final-year student applying for internships | Quick, professional first resume |
| **Job Seeker** | Professional switching careers | Polished, ATS-friendly resume with strong summary |
| **Internship Candidate** | Needs assignment deliverable | Functional demo with AI integration |

---

## 5. Functional Requirements

### 5.1 Resume Data Input (FR-001 to FR-005)

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-001 | **Personal Information** — Name, phone, email, city, LinkedIn URL, GitHub/Portfolio URL | P0 | All fields optional except Name; live validation for email/URL formats |
| FR-002 | **Professional Summary** — Free-text field with AI generation capability | P0 | 500-character limit; AI button generates 2–4 sentence summary |
| FR-003 | **Work Experience** — Dynamic list: Job Title, Company, Location, Start/End Date, 3–5 bullet points | P0 | Add/remove unlimited entries; dates optional; present checkbox for current role |
| FR-004 | **Education** — Dynamic list: Institution, Degree, Field of Study, Graduation Date, GPA (optional) | P0 | Add/remove unlimited entries; GPA field optional |
| FR-005 | **Skills** — Comma-separated tag input or multi-select categories | P0 | Display as visual tags; support technical and soft skills |

### 5.2 AI Features (FR-006 to FR-007)

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-006 | **AI Summary Generation** — One-click generation based on job title + skills + experience | P0 | Calls Groq API; returns result in < 5 seconds; replaces or appends to existing text |
| FR-007 | **AI Objective Generation** — Alternative mode for entry-level candidates | P1 | Generates career objective instead of summary based on education + target role |

### 5.3 Templates & Preview (FR-008 to FR-010)

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-008 | **Real-Time Preview** — Side-by-side or toggle view updating on every keystroke | P0 | Preview renders within 100ms of state change; matches A4 proportions |
| FR-009 | **Template Selection** — Minimum 2 distinct professional templates | P0 | Template A: Modern Minimalist; Template B: Classic Professional; switch without data loss |
| FR-010 | **Template Consistency** — All templates maintain readable typography and spacing | P0 | Font sizes 10–12pt body, 14–18pt headers; 0.5–1 inch margins |

### 5.4 Export & Persistence (FR-011 to FR-013)

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-011 | **PDF Export** — Download resume as print-ready PDF | P0 | Uses react-to-print; output is single-page or properly paginated A4 |
| FR-012 | **Auto-Save** — Persist form data to localStorage on every change | P0 | Data survives page refresh; load on app mount; clear data option available |
| FR-013 | **Reset / New Resume** — Clear all data to start fresh | P1 | Confirmation dialog; resets state and localStorage |

---

## 6. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | **Performance** — First contentful paint < 2s; preview update < 100ms | < 2s, < 100ms |
| NFR-002 | **Browser Support** — Chrome, Firefox, Safari, Edge (latest 2 versions) | 100% compatibility |
| NFR-003 | **Responsive Design** — Usable on 320px mobile to 1920px desktop | Breakpoints: 640px, 768px, 1024px, 1280px |
| NFR-004 | **Accessibility** — WCAG 2.1 AA compliance | ARIA labels, keyboard navigation, color contrast 4.5:1 |
| NFR-005 | **Security** — API key stored in env variables only; never exposed in source | VITE_ prefix; .gitignore enforced |
| NFR-006 | **Offline Capability** — Form editing works without internet; AI features require connection | Core functionality offline |

---

## 7. User Stories

### US-001: First-Time User
> *As a university student, I want to fill in my details through a simple form so that I don't have to worry about formatting.*

**Acceptance Criteria:**
- Form is organized into collapsible/scrollable sections
- Each field has placeholder text and helper tooltip
- No design decisions required from user

### US-002: AI-Assisted Writer
> *As a job seeker, I want the AI to write my professional summary so that my resume sounds more polished.*

**Acceptance Criteria:**
- "✨ Generate with AI" button visible next to Summary field
- Button sends job title + top 3 skills + years of experience to Groq
- Generated text editable before finalizing
- Loading state shown during API call

### US-003: Template Switcher
> *As a candidate applying to different industries, I want to switch between a modern and classic template so that I can match company culture.*

**Acceptance Criteria:**
- Template toggle/buttons always visible
- Switching templates does not alter entered data
- Preview updates instantly to show new layout

### US-004: PDF Downloader
> *As a user, I want to download my resume as a PDF so that I can attach it to job applications.*

**Acceptance Criteria:**
- "Download PDF" button prominently placed
- PDF matches preview exactly (WYSIWYG)
- File named: `Resume_{FirstName}_{LastName}.pdf`

---

## 8. Out of Scope (MVP)

| Feature | Reason | Future Version |
|---------|--------|---------------|
| User authentication / accounts | No backend; localStorage sufficient | v2 with backend |
| Database (SQLite/MySQL/PostgreSQL) | localStorage handles single-user persistence | v2 with multi-user support |
| Backend server | Unnecessary for single-user MVP | v2 for API key security |
| Drag-and-drop section reordering | Adds complexity; form order is sufficient | v2 |
| Custom color pickers / font selectors | Violates "no design knowledge needed" principle | v2 |
| ATS Score / Resume analysis | Requires additional AI prompts and UI | v2 |
| Multi-page resumes | MVP targets single-page standard | v2 |
| Cloud save / share links | Requires backend infrastructure | v2 |

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to complete first resume | < 10 minutes | User testing |
| AI summary acceptance rate | > 70% | Users who keep AI text without major edits |
| PDF export success rate | 100% | Error tracking |
| Page load time | < 2 seconds | Lighthouse audit |
| Mobile usability | Score > 90 | Lighthouse mobile audit |

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Groq API rate limiting / downtime | High | Implement retry logic (3 attempts); graceful fallback to manual summary |
| API key exposure in frontend | Medium | Use environment variables; include clear documentation warning |
| Browser localStorage cleared | Low | Add "Export JSON" backup option; user education |
| PDF rendering inconsistencies | Medium | Test across browsers; use standard CSS print media queries |

---

## 11. Release Criteria

- [ ] All P0 functional requirements implemented
- [ ] Real-time preview functional across all form fields
- [ ] PDF export produces A4-formatted document
- [ ] AI summary generation returns coherent text in < 5 seconds
- [ ] Auto-save to localStorage working without errors
- [ ] 2 templates render correctly with sample data
- [ ] Responsive layout tested on mobile and desktop
- [ ] No console errors in production build

---


