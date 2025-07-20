'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-text dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-brand-primary-text/80 dark:text-slate-300 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities and interesting projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-brand-primary-text dark:text-white mb-6 leading-tight">
                Let&apos;s Connect
              </h3>
              <p className="text-brand-primary-text/80 dark:text-slate-300 mb-6 leading-relaxed">
                Feel free to reach out if you have any questions, want to discuss a project,
                or just want to say hello!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brand-accent/10 rounded-lg">
                  <Mail className="text-brand-accent" size={20} />
                </div>
                <div>
                  <p className="text-brand-primary-text font-medium">Email</p>
                  <a 
                    href="mailto:nick.granados.dev@gmail.com" 
                    className="text-brand-primary-text/80 hover:text-brand-accent transition-colors"
                  >
                    nick.granados.dev@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brand-accent/10 rounded-lg">
                  <Phone className="text-brand-accent" size={20} />
                </div>
                <div>
                  <p className="text-brand-primary-text font-medium">Phone</p>
                  <a 
                    href="tel:+5546999999999" 
                    className="text-brand-primary-text/80 hover:text-brand-accent transition-colors"
                  >
                    +55 (46) 99999-9999
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brand-accent/10 rounded-lg">
                  <MapPin className="text-brand-accent" size={20} />
                </div>
                <div>
                  <p className="text-brand-primary-text font-medium">Location</p>
                  <p className="text-brand-primary-text/80">
                    Paraná, Brazil
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-brand"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-brand-primary-text font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-primary-text"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-brand-primary-text font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-primary-text"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-brand-primary-text font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-primary-text resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
