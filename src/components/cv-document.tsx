'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import type { Language } from '@/lib/translations'
import { cvLabels } from '@/data/resume'
import { resumeVersions, type ResumeVersion } from '@/data/resumes'
import { getAllTechnologies } from '@/data/projects'
import { formatDateRange, formatDuration } from '@/data/date-utils'
import { Mail, Phone, MapPin, Linkedin, Github, Printer } from 'lucide-react'

export default function CvDocument({ buildDate }: { buildDate: string }) {
  const { lang, setLang } = useLanguage()
  const searchParams = useSearchParams()
  const technologies = getAllTechnologies()
  const labels = cvLabels[lang]
  const refDate = new Date(buildDate)

  const paramVersion = searchParams.get('v') as ResumeVersion | null
  const [version, setVersion] = useState<ResumeVersion>(
    paramVersion && paramVersion in resumeVersions ? paramVersion : 'default'
  )

  const resume = resumeVersions[version].data

  const handleVersionChange = (v: ResumeVersion) => {
    setVersion(v)
    const url = new URL(window.location.href)
    if (v === 'default') url.searchParams.delete('v')
    else url.searchParams.set('v', v)
    window.history.pushState({}, '', url.toString())
  }

  return (
    <main className="min-h-screen bg-slate-100 print:bg-white py-10 px-4 print:p-0">
      {/* Controles — ocultos al imprimir */}
      <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center space-x-1">
            {(['en', 'es', 'pt'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded text-xs font-semibold uppercase transition-colors ${
                  lang === l
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {/* Version selector */}
          <div className="flex items-center space-x-1">
            {(Object.keys(resumeVersions) as ResumeVersion[]).map((v) => (
              <button
                key={v}
                onClick={() => handleVersionChange(v)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  version === v
                    ? 'bg-[#1e3a8a] text-white'
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-300'
                }`}
              >
                {resumeVersions[v].label[lang]}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Printer size={16} aria-hidden="true" />
          {labels.print}
        </button>
      </div>

      {/* Hoja del CV */}
      <article className="max-w-3xl mx-auto bg-white text-slate-800 rounded-lg shadow-sm print:shadow-none p-8 md:p-10 print:px-[2.2cm] print:py-0">
        {/* Header */}
        <header className="border-b border-slate-200 pb-5 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{resume.name}</h1>
          <p className="text-teal-600 font-medium mt-0.5">{resume.title[lang]}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-600">
            <a href={`mailto:${resume.contact.email}`} className="flex items-center gap-1 hover:text-teal-600">
              <Mail size={14} aria-hidden="true" /> {resume.contact.email}
            </a>
            <a href={`tel:${resume.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-teal-600">
              <Phone size={14} aria-hidden="true" /> {resume.contact.phone}
            </a>
            <span className="flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" /> {resume.contact.location[lang]}
            </span>
            <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600">
              <Linkedin size={14} aria-hidden="true" /> LinkedIn
            </a>
            <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-600">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-2">{resume.contact.availability[lang]}</p>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{labels.summary}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{resume.summary[lang]}</p>
        </section>

        {/* Top Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{labels.topSkills}</h2>
          <p className="text-sm text-slate-700 font-medium">{resume.topSkills.join(' · ')}</p>
        </section>

        {/* Tech Stack (auto desde proyectos) */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{labels.techStack}</h2>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded-full border border-teal-300 text-teal-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{labels.experience}</h2>
          <div className="space-y-5">
            {resume.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className="font-semibold text-slate-900">{exp.role}</h3>
                  <span className="text-xs text-slate-500">
                    {formatDateRange(exp.startDate, exp.endDate, lang)} · {formatDuration(exp.startDate, exp.endDate, lang, refDate)}
                  </span>
                </div>
                <p className="text-sm text-teal-700">
                  {exp.company} · {exp.employmentType[lang]} · {exp.location[lang]}
                </p>
                <ul className="mt-1.5 list-disc list-inside space-y-0.5 text-sm text-slate-700 marker:text-teal-500">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{labels.education}</h2>
          <div className="space-y-3">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                  <p className="text-sm text-teal-700">
                    {edu.institution}
                    {edu.note ? ` · ${edu.note[lang]}` : ''}
                  </p>
                </div>
                <span className="text-xs text-slate-500">{formatDateRange(edu.startDate, edu.endDate, lang)}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
