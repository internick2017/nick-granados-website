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
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl rotate-6"></div>
              <div className="absolute inset-0 w-80 h-80 mx-auto bg-slate-300 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                <span className="text-slate-600 dark:text-slate-300 text-lg">Your Photo Here</span>
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
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              I&apos;m a passionate developer with a love for creating innovative solutions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              With over X years of experience in web development, I specialize in creating
              modern, responsive applications using the latest technologies. I&apos;m passionate
              about clean code, user experience, and continuous learning.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, contributing
              to open-source projects, or sharing my knowledge through blog posts and tutorials.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                Team Player
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                Fast Learner
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
