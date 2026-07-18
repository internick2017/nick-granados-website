'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function SocialProof() {
  const { t } = useLanguage()

  return (
    <section
      aria-label="Track record"
      className="px-4 sm:px-6 lg:px-8 py-10 border-y border-slate-200/70 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/40 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {t.socialProof.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-teal-navy bg-clip-text text-transparent leading-none">
              {item.value}
            </div>
            <p className="mt-2 text-xs sm:text-sm text-brand-primary-text/70 dark:text-slate-400 leading-snug">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
