'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('https://nickgranados.com/send-email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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
                    href="mailto:hello@nickgranados.com"
                    className="text-brand-primary-text/80 hover:text-brand-accent transition-colors"
                  >
                    hello@nickgranados.com
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
                    href="tel:+5546991096679"
                    className="text-brand-primary-text/80 hover:text-brand-accent transition-colors"
                  >
                    +55 (46) 99109-6679
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
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
                <CheckCircle className="text-green-500" size={48} />
                <h4 className="text-xl font-bold text-brand-primary-text dark:text-white">
                  Message sent!
                </h4>
                <p className="text-brand-primary-text/80 dark:text-slate-300">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-brand-accent hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-brand-primary-text font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-primary-text disabled:opacity-50"
                    placeholder="Your Name"
                    disabled={status === 'loading'}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-primary-text disabled:opacity-50"
                    placeholder="your.email@example.com"
                    disabled={status === 'loading'}
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
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-primary-text resize-none disabled:opacity-50"
                    placeholder="Your message..."
                    disabled={status === 'loading'}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again or email me directly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
