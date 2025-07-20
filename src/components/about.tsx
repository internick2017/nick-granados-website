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
            <p className="text-lg text-slate-600 dark:text-slate-300">
              As a Full Stack Developer, I bring a comprehensive approach to web development, 
              combining expertise in both frontend and backend technologies to create robust, 
              scalable, and user-friendly web applications.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              My passion lies in solving complex technical challenges and delivering 
              innovative solutions that not only meet but exceed client expectations. 
              I thrive on continuous learning and staying up-to-date with the latest 
              technologies and best practices in the ever-evolving world of web development.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              With a strong foundation in modern web technologies and a creative problem-solving 
              approach, I aim to build digital experiences that are both functional and engaging.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
