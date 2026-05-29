'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { projects, type Category } from '@/data/projects'

const FILTER_KEYS = ['all', 'fullstack', 'api', 'frontend', 'mobile', 'wordpress'] as const
type Filter = (typeof FILTER_KEYS)[number]

export default function Projects() {
  const { t, lang } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-brand-secondary-text dark:text-slate-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Filter pills */}
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors duration-200 ${
                activeFilter === key
                  ? 'bg-brand-primary border-brand-primary text-white'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 hover:border-brand-accent hover:text-brand-accent dark:hover:border-brand-accent dark:hover:text-brand-accent'
              }`}
            >
              {t.projects.filters[key]}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-slate-700 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-sm"
              >
                {/* Image + hover overlay */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.translations[lang].title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay — desktop only (touch devices have no hover) */}
                  <div className="absolute inset-0 bg-slate-900/75 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-brand-primary font-bold text-xs rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-200 hover:bg-slate-100"
                      >
                        <ExternalLink size={13} />
                        {t.projects.liveDemo}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-transparent border border-white text-white font-bold text-xs rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-200 delay-75 hover:bg-white/10"
                      >
                        <Github size={13} />
                        {t.projects.github}
                      </a>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-accent mb-1">
                    {t.projects.filters[project.category]}
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                    {project.translations[lang].title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-blue-50 dark:bg-slate-600 text-blue-800 dark:text-slate-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-slate-600 text-blue-800 dark:text-slate-200 text-xs rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Mobile-only links (overlay not visible on touch) */}
                  <div className="flex gap-3 sm:hidden">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-brand-accent hover:underline"
                      >
                        <ExternalLink size={12} />
                        {t.projects.liveDemo}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-accent hover:underline"
                      >
                        <Github size={12} />
                        {t.projects.github}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
