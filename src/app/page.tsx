import type { Metadata } from 'next'
import Hero from '@/components/hero'
import SocialProof from '@/components/social-proof'
import About from '@/components/about'
import Services from '@/components/services'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Contact from '@/components/contact'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Nick Granados - Full Stack Developer',
  description: 'Full Stack Developer with 6+ years of experience. I build landing pages, e-commerce, web apps, and WordPress sites for businesses.',
  keywords: ['full stack developer', 'web development', 'wordpress', 'react', 'next.js', 'freelance', 'landing page', 'e-commerce'],
  authors: [{ name: 'Nick Granados' }],
  creator: 'Nick Granados',
  robots: 'index, follow',
  openGraph: {
    title: 'Nick Granados - Full Stack Developer',
    description: 'I build landing pages, e-commerce, web apps, and WordPress sites for businesses. 6+ years of experience.',
    url: 'https://nickgranados.com',
    siteName: 'Nick Granados',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Nick Granados - Full Stack Developer',
    description: 'I build landing pages, e-commerce, web apps, and WordPress sites for businesses.',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <Hero />
      <SocialProof />
      <Services />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
