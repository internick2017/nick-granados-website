'use client'

import { ArrowLeft, Check, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import type { Project } from '@/data/projects'

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold text-brand-primary-text dark:text-white mb-4">
        {heading}
      </h2>
      {children}
    </section>
  )
}

export default function CaseStudy({ project }: { project: Project }) {
  const { t, lang } = useLanguage()
  const cs = project.caseStudy![lang]
  const title = project.translations[lang].title

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to portfolio */}
        <a
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          {t.caseStudy.back}
        </a>

        {/* Header */}
        <p className="text-xs font-bold uppercase tracking-wide text-brand-accent mb-2">
          {t.projects.filters[project.category]}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-brand-primary-text/80 dark:text-slate-300 mb-8 leading-relaxed">
          {cs.summary}
        </p>

        {/* Cover image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <Image
            src={project.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {/* The problem */}
        <Section heading={t.caseStudy.problemHeading}>
          <p className="text-brand-primary-text/80 dark:text-slate-300 leading-relaxed">
            {cs.problem}
          </p>
        </Section>

        {/* Approach */}
        <Section heading={t.caseStudy.approachHeading}>
          <ul className="space-y-3">
            {cs.approach.map((item, i) => (
              <li key={i} className="flex gap-3 text-brand-primary-text/80 dark:text-slate-300 leading-relaxed">
                <span className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* What it proves */}
        <Section heading={t.caseStudy.outcomeHeading}>
          <ul className="space-y-3">
            {cs.outcome.map((item, i) => (
              <li key={i} className="flex gap-3 text-brand-primary-text/80 dark:text-slate-300 leading-relaxed">
                <Check size={18} className="mt-0.5 flex-shrink-0 text-brand-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Tech stack + links */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-blue-50 dark:bg-slate-700 text-blue-800 dark:text-slate-200 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-semibold text-sm transition-colors"
              >
                <ExternalLink size={16} />
                {t.projects.liveDemo}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white rounded-lg font-semibold text-sm transition-colors"
              >
                <Github size={16} />
                {t.projects.github}
              </a>
            )}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary-text dark:text-white mb-5">
            {t.caseStudy.ctaTitle}
          </h2>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            {t.caseStudy.ctaButton} →
          </a>
        </div>
      </section>
    </main>
  )
}
