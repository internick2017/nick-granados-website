import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad de DoseTime',
  description: 'Política de privacidad de la app DoseTime.',
}

export default function DoseTimePrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold text-brand-primary-text dark:text-white">
        Política de Privacidad de DoseTime
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Última actualización: 12 de julio de 2026
      </p>

      <p className="mt-8">
        DoseTime es una aplicación de recordatorio de medicamentos. Esta página explica qué
        datos usa la app y cómo los trata.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-brand-primary-text dark:text-white">
        Qué datos recopila la app
      </h2>
      <p className="mt-3">
        DoseTime no requiere cuenta ni inicio de sesión. Los medicamentos, horarios y el
        historial de dosis que registrás se guardan únicamente en tu dispositivo, en una base
        de datos local. Ningún dato de tus medicamentos, horarios o historial de dosis se
        envía a nuestros servidores ni a terceros: no tenemos servidores propios que reciban
        esa información.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-brand-primary-text dark:text-white">
        Permisos que usa la app
      </h2>
      <p className="mt-3">
        Notificaciones: para avisarte cuándo tomar cada dosis programada. Podés desactivarlas
        desde la configuración del sistema operativo. Los demás permisos del sistema (como
        iniciar tras reiniciar el dispositivo) existen solo para que las notificaciones de
        recordatorio sigan funcionando correctamente.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-brand-primary-text dark:text-white">
        Publicidad (Google AdMob)
      </h2>
      <p className="mt-3">
        DoseTime muestra un banner publicitario provisto por Google AdMob. Para eso, Google
        puede recopilar un identificador de publicidad de tu dispositivo y datos de
        interacción con el anuncio (por ejemplo, si lo viste o tocaste), según su propia
        política de privacidad:{' '}
        <a
          className="text-teal-600 underline dark:text-teal-400"
          href="https://policies.google.com/privacy"
        >
          policies.google.com/privacy
        </a>
        . Nosotros no recibimos ni almacenamos esos datos, los procesa Google directamente.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-brand-primary-text dark:text-white">
        Menores de edad
      </h2>
      <p className="mt-3">
        DoseTime no está dirigida a niños y no recopila intencionalmente datos de menores de
        13 años.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-brand-primary-text dark:text-white">
        Cambios a esta política
      </h2>
      <p className="mt-3">
        Si esta política cambia, se actualizará esta misma página con la nueva fecha.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-brand-primary-text dark:text-white">Contacto</h2>
      <p className="mt-3">
        Para preguntas sobre esta política, escribinos a{' '}
        <a className="text-teal-600 underline dark:text-teal-400" href="mailto:nickgranados01@gmail.com">
          nickgranados01@gmail.com
        </a>
        .
      </p>
    </main>
  )
}
