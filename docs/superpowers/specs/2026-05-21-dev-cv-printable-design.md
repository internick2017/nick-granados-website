# Diseño: CV imprimible en `/dev/cv`

**Fecha:** 2026-05-21
**Autor:** Nick Granados (con Claude)
**Estado:** Aprobado — listo para plan de implementación

## Problema

La página `/dev` (para reclutadores) tiene un botón "Download CV" que apunta a
`/cv-nick-granados.pdf`, pero ese archivo **nunca existió** → da 404. Nick quiere
que los reclutadores puedan obtener su CV fácilmente y que **siempre esté
actualizado sin trabajo manual**, especialmente la antigüedad del trabajo actual.

## Objetivo

Crear una página de CV en HTML, optimizada para impresión / guardar como PDF,
generada desde una única fuente de datos. La antigüedad de los roles vigentes se
recalcula automáticamente en cada build (deploy), sin editar fechas a mano.

## Decisiones de diseño

### 1. Ruta y fuente de datos
- Nueva ruta: `src/app/dev/cv/page.tsx` (Server Component, compatible con export estático).
- Nuevo archivo de datos: `src/data/resume.ts` — contenido profesional estructurado
  (resumen, experiencia, educación, contacto, top skills). Único lugar de verdad,
  mismo patrón que `src/data/projects.ts`.
- El **tech stack se auto-genera** con `getAllTechnologies()` de `projects.ts`
  (igual que `/dev`). Agregar un proyecto nuevo actualiza el stack del CV solo.

### 2. Cálculo automático de antigüedad
- En `resume.ts` cada experiencia guarda `startDate: "YYYY-MM"` y, o bien
  `endDate: "YYYY-MM"`, o bien `current: true` (sin endDate).
- Un helper `formatDuration(start, end?)` calcula los meses y los formatea como
  `"X yrs Y mos"`. Para roles `current`, el fin es la fecha del build.
- **Convención de redondeo:** inclusiva (cuenta mes de inicio y fin), para
  coincidir con cómo LinkedIn muestra la duración. Ej: Aug 2022 → May 2026 = "3 yrs 10 mos".
- Un helper `formatMonthYear("YYYY-MM")` produce `"Aug 2022"` con un array de
  nombres de mes (determinista, sin locale del entorno).
- Display por rol: `Aug 2022 - Present · 3 yrs 10 mos` (o el rango fijo si no es current).
- **Nota sobre export estático:** la duración se computa en build time. Como el sitio
  se reconstruye en cada `/deploy`, la antigüedad se refresca en cada despliegue.
  No es "en vivo" en el navegador, pero elimina por completo la edición manual y
  evita problemas de hidratación. Esto es el comportamiento deseado.

### 3. Tema claro (no oscuro)
- A diferencia de `/dev` (oscuro), `/dev/cv` usa **fondo blanco / texto oscuro**.
- Razón: un CV se imprime / guarda en PDF; fondo oscuro desperdicia tinta y se ve mal.
  Blanco es el estándar profesional y se ve idéntico en pantalla y PDF.

### 4. Botón Print / Save as PDF
- Componente cliente pequeño `PrintButton` (`'use client'`) que llama a `window.print()`.
- La página queda Server Component; solo el botón es cliente.
- `@media print` oculta el botón (clase `print:hidden`).
- El `<title>` (metadata) se setea a `"Nick Granados - CV"` para que el archivo
  guardado como PDF tome ese nombre automáticamente.

### 5. Conexión con `/dev`
- En `src/app/dev/page.tsx`: el botón actual que apunta a `/cv-nick-granados.pdf`
  (404) se cambia para enlazar a `/dev/cv` y se renombra a **"View / Print CV"**.
  Se quita el atributo `download` (ahora es navegación interna, no descarga directa).

## Estructura de la página (orden vertical)

1. **Header:** Nombre, título, fila de contacto:
   - 📧 internickbr@gmail.com
   - 📱 +55 46 99109-6679
   - 📍 Paraná, Brazil · Available for remote / freelance part-time
   - LinkedIn · GitHub
2. **Summary:** texto del "About" de LinkedIn (ver nota de contenido abajo).
3. **Tech Stack:** chips auto-generados desde proyectos.
4. **Experience:** roles en orden cronológico inverso por fecha de inicio.
5. **Education:** BYU-Idaho (2025) + BYU-Pathway (2019–2024).
6. **Print / Save as PDF** (botón, oculto al imprimir).

## Contenido (de LinkedIn)

### Top skills
Databases · WordPress · JavaScript · Back-End Web Development · Git

### Summary
> I am a current BYU-Pathway Worldwide student working toward a certificate in Web
> and Computer Programming. With over 6 years of experience in backend and
> full-stack development, I specialize in PHP, WordPress, and JavaScript frameworks
> like React. I enjoy building performance-focused applications and working with
> remote teams. I'm seeking remote opportunities where I can contribute to scalable
> web platforms and continue to grow as a developer.

**Nota de contenido (para revisión de Nick):** el summary dice "current
BYU-Pathway student", pero el certificado de BYU-Idaho terminó Jun 2025. A
mayo 2026 ya estás graduado — quizás convenga ajustar esa frase. Se deja el
texto verbatim por ahora; cambiarlo es trivial en `resume.ts`.

### Experience (orden: fecha de inicio descendente)

1. **WordPress Back-End Developer** — Apiki WordPress · Contract · Brazil · Remote
   · `2022-08` → current
   - Created and customized plugins that increased user engagement by 30% across multiple platforms.
   - Developed API integrations that streamlined data management, reducing processing time by 25%.
   - Maintained a multilingual multisite environment, enhancing accessibility for global audiences.

2. **PHP Developer** — CEICOM Marketing e Tecnologia Digital · Indirect Contract ·
   Francisco Beltrão, Paraná, Brazil · `2021-04` → `2023-06`
   - Spearheaded requirements gathering and solution architecture, aligning project outcomes with client expectations.
   - Built a robust evaluation system that enhanced data management capabilities.
   - Strengthened skills in PHP, WordPress and Laravel.

3. **Freelancer** — Freelance · Francisco Beltrão, Paraná, Brazil · `2021-01` → current
   - Completed over 20 projects with a 100% on-time delivery rate.
   - Built custom WordPress themes and plugins that improved client satisfaction.
   - Developed expertise in project management, web development, and client communication.

4. **Founder & CEO** — Aresmkt Marketing · Self-employed · Francisco Beltrão,
   Paraná, Brazil · `2019-11` → `2020-05`
   - Established Aresmkt focusing on client-centric strategies and innovative solutions.

5. **Web Designer** — Inkaweb · Full-time · Peru · `2018-11` → `2021-01`
   - Designed and developed multiple blogs and e-commerce sites using WordPress site builders.
   - Managed and optimized marketing campaigns on Google Ads and Facebook.
   - Implemented SEO strategies that increased organic traffic by 30%.

### Education (orden: más reciente primero)

1. **Certificate, Web and Computer Programming** — Brigham Young University–Idaho
   · Jan 2025 – Jun 2025
2. **PathwayConnect, Certificate** — BYU-Pathway Worldwide · Jan 2019 – Dec 2024 · Grade: A

## Fuera de alcance (YAGNI)

- No se genera un PDF pre-renderizado ni se sube archivo binario (Nick eligió
  "página HTML imprimible", no "ambas").
- No se traduce el CV a ES/PT — `/dev` es solo en inglés (audiencia: reclutadores).
- No se agrega foto, ni descarga `.docx`, ni QR.

## Archivos afectados

- **Nuevo:** `src/data/resume.ts` (datos + helpers de fecha)
- **Nuevo:** `src/app/dev/cv/page.tsx` (página del CV)
- **Nuevo:** `src/components/print-button.tsx` (componente cliente con `window.print()`)
- **Editado:** `src/app/dev/page.tsx` (botón → `/dev/cv`, label "View / Print CV")

## Criterios de éxito

- `/dev/cv` renderiza el CV completo con tema claro.
- La antigüedad de Apiki y Freelancer se calcula sola y coincide con el estilo de LinkedIn.
- Imprimir / Ctrl+P produce un PDF limpio (sin botones ni nav) llamado "Nick Granados - CV".
- El botón en `/dev` lleva a `/dev/cv` sin 404.
- `yarn build` (export estático) pasa sin errores.
