export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-slate-300">
              Building amazing digital experiences with passion and precision.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="text-slate-300 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-slate-300 hover:text-white transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/internick2017" className="text-slate-300 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/nick-granados" className="text-slate-300 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="mailto:nick.granados.dev@gmail.com" className="text-slate-300 hover:text-white transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Nick Granados. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
