'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.portfolio}</h3>
            <p className="text-slate-300">{t.footer.tagline}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">{t.nav.about}</a></li>
              <li><a href="#projects" className="text-slate-300 hover:text-white transition-colors">{t.nav.projects}</a></li>
              <li><a href="#skills" className="text-slate-300 hover:text-white transition-colors">{t.nav.skills}</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.connect}</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/internick2017" className="text-slate-300 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/nick-granados" className="text-slate-300 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="mailto:hello@nickgranados.com" className="text-slate-300 hover:text-white transition-colors">{t.contact.emailLabel}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Nick Granados. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
