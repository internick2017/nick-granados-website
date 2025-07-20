'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-brand-primary-text dark:text-white mb-6 leading-tight">
            Hi, I&apos;m{' '}
            <span className="text-gradient bg-gradient-teal-navy bg-clip-text text-transparent">
              Nick Granados
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-brand-primary-text/80 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Innovative Full Stack Developer | Transforming Ideas into Scalable Web Solutions | React & Next.js Enthusiast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#projects"
              className="px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-semibold transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white rounded-lg font-semibold transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact Me
            </a>
          </div>
          <div className="flex justify-center space-x-6 text-brand-primary-text/80">
            <a 
              href="https://github.com/internick2017" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/nick-granados" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a 
              href="mailto:nick.granados.dev@gmail.com"
              className="hover:text-brand-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <ArrowDown size={32} className="text-slate-400 animate-bounce hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
        </motion.div>
      </div>
    </section>
  )
}
