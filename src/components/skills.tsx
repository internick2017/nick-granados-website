'use client'

import { motion } from 'framer-motion'

export default function Skills() {
  const skills = [
    { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
    { name: 'React', level: 88, color: 'bg-cyan-500' },
    { name: 'Next.js', level: 85, color: 'bg-gray-900' },
    { name: 'Node.js', level: 85, color: 'bg-green-500' },
    { name: 'TypeScript', level: 82, color: 'bg-blue-500' },
    { name: 'Tailwind CSS', level: 90, color: 'bg-teal-500' },
    { name: 'PostgreSQL', level: 80, color: 'bg-blue-600' },
    { name: 'Docker', level: 75, color: 'bg-blue-400' }
  ]

  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 
    'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'GraphQL', 
    'React Native', 'AWS', 'Firebase', 'Prisma', 'Tailwind CSS', 
    'Material UI', 'Redux', 'Jest', 'CI/CD', 'Git'
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-brand-secondary-text dark:text-slate-300">
            Here are the technologies I work with and my proficiency levels
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-brand-primary-text dark:text-white mb-8">
              Core Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-brand-primary-text dark:text-slate-300 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-brand-secondary-text dark:text-slate-400 text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-brand-secondary/30 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-2 rounded-full bg-brand-accent`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-brand-primary-text dark:text-white mb-8">
              Technologies & Tools
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-brand-secondary/10 p-4 rounded-lg shadow-sm text-center hover:shadow-brand transition-shadow"
                >
                  <span className="text-sm font-medium text-brand-primary-text dark:text-slate-300">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
