'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'

export default function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-brand-secondary-text dark:text-slate-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-700 rounded-2xl overflow-hidden shadow-brand"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary-text dark:text-white mb-4 leading-tight">
                    {project.translations[lang].title}
                  </h3>
                  <p className="text-brand-primary-text/80 dark:text-slate-300 mb-6 leading-relaxed text-base">
                    {project.translations[lang].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-brand-primary-text hover:text-brand-accent transition-colors font-semibold text-sm">
                        <Github size={18} />
                        <span>{t.projects.github}</span>
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-brand-primary-text hover:text-brand-accent transition-colors font-semibold text-sm">
                        <ExternalLink size={18} />
                        <span>{t.projects.liveDemo}</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border border-brand-secondary/20 shadow-sm">
                  <Image
                    src={project.image}
                    alt={project.translations[lang].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
