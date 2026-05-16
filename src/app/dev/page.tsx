import { getAllTechnologies } from '@/data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nick Granados — Developer Profile',
  description: 'Full Stack Developer with 6+ years of experience. WordPress, PHP, React, Next.js, Laravel, and more.',
  robots: 'noindex',
}

export default function DevPage() {
  const technologies = getAllTechnologies()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Nick Granados</h1>
        <p className="text-teal-400 text-lg font-medium mb-1">Full Stack Developer</p>
        <p className="text-slate-400 text-sm mb-10">
          6+ years of experience · Paraná, Brazil · Available for freelance part-time
        </p>

        <div className="bg-slate-800 rounded-xl p-6 mb-8 text-left border border-slate-700">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-teal-900/40 text-teal-400 text-xs rounded-full font-medium border border-teal-700/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://github.com/internick2017"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nick-granados"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="/cv-nick-granados.pdf"
            download
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Download CV
          </a>
        </div>

        <p className="text-slate-500 text-xs mt-10">
          Looking for a project?{' '}
          <a href="/" className="text-teal-400 hover:underline">
            See my portfolio →
          </a>
        </p>
      </div>
    </main>
  )
}
