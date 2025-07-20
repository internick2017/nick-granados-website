import type { Metadata, Viewport } from 'next'
import Hero from '@/components/hero'
import About from '@/components/about'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Contact from '@/components/contact'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Nick Granados - Full Stack Developer',
  description: 'Full Stack Developer specializing in modern web development with React, Next.js, and Node.js',
  keywords: ['developer', 'portfolio', 'web development', 'react', 'next.js', 'full stack'],
  authors: [{ name: 'Nick Granados' }],
  creator: 'Nick Granados',
  publisher: 'Nick Granados',
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
} 