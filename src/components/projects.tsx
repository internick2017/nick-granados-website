'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      title: 'Shadcn Next.js App',
      description: 'A modern web application built with Next.js featuring a comprehensive dashboard/admin interface with user management, project management, calendar functionality, payment processing, data visualization, todo management, and dark/light theme support.',
      technologies: [
        'Next.js 15.4.1',
        'React 19.1.0',
        'TypeScript',
        'Shadcn UI',
        'TailwindCSS',
        'Radix UI',
        'Recharts',
        'React Hook Form',
        'Zod'
      ],
      github: 'https://github.com/internick2017/shadcn-nextjs-app',
      demo: 'https://shadcn-nextjs-app-ten.vercel.app/',
      image: '/project-shadcn.png'
    },
    {
      title: '🏦 J.J.J Investments',
      description: 'A comprehensive family investment management platform enabling collaborative portfolio management with real-time tracking, transaction management, and professional analytics. Features include multi-user support, enterprise-grade security, and real-time market data integration.',
      technologies: [
        'Next.js 14',
        'TypeScript 5.0',
        'Tailwind CSS',
        'Recharts',
        'Prisma ORM',
        'PostgreSQL',
        'NextAuth.js',
        'Lucide React'
      ],
      github: 'https://github.com/internick2017/J.J.J-Invesments',
      demo: 'https://family-investments.netlify.app/',
      image: '/project-jjj.png'
    }
  ]

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
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Here are some of my recent projects
          </p>
        </motion.div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover object-left-top w-full h-full"
                    priority={index === 0}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
