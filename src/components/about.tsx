'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Get to know more about who I am and what I do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-teal-navy rounded-2xl rotate-6"></div>
              <div className="absolute inset-0 w-80 h-80 mx-auto bg-brand-secondary rounded-2xl flex items-center justify-center">
                <span className="text-brand-primary-text dark:text-slate-300 text-lg">Your Photo Here</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-brand-primary-text dark:text-slate-300 leading-relaxed">
              I&apos;m a passionate Full Stack Developer with a strong background in creating robust, scalable web applications. 
              With over 5 years of experience in the tech industry, I specialize in transforming complex business requirements 
              into elegant, efficient digital solutions using cutting-edge technologies like React, Next.js, and Node.js.
            </p>
            <p className="text-brand-primary-text dark:text-slate-300 leading-relaxed">
              My journey in web development began with a curiosity to solve real-world problems through technology. 
              I&apos;ve worked with startups and enterprises, delivering high-performance applications that drive business growth 
              and enhance user experiences.
            </p>
            <p className="text-brand-primary-text dark:text-slate-300 leading-relaxed">
              Beyond coding, I&apos;m a continuous learner who believes in the power of clean code, innovative design, 
              and collaborative problem-solving.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
