# Diseño: Publicación y Estrategia del Portfolio — Nick Granados

**Fecha:** 2026-05-16
**Objetivo:** Convertir nickgranados.com en herramienta efectiva de captación de clientes freelance y construir visibilidad orgánica online, como paso hacia la independencia del trabajo en empresa.

---

## Contexto

Nick tiene trabajo fijo en empresa y este portfolio es su camino a la independencia freelance. No hay urgencia de ingresos inmediatos — puede construirse bien desde el principio. Tiene al menos 5 proyectos completos listos para mostrar, con muchos más por organizar. La estrategia es orgánica primero, paga después cuando llegue trabajo.

---

## Arquitectura: Dos páginas, dos audiencias

El sitio actual mezcla implícitamente dos audiencias distintas. Se separan en dos páginas con propósito claro:

### `nickgranados.com` — Clientes / negocios
Orientado a empresas y personas que necesitan desarrollo web contratado.

Estructura de secciones (orden en la página):
1. **Hero** — mensaje orientado a negocios: "Desarrollo web para hacer crecer tu negocio". Incluye link discreto: *"¿Sos reclutador? → /dev"*
2. **Servicios** *(nueva sección)* — grid de 4 servicios sin precios, CTA "Hablemos de tu proyecto"
3. **Proyectos** — grid escalable con live demo links
4. **Sobre mí** — ajuste de tono hacia servicios
5. **Skills** — existente, sin cambios
6. **Contacto** — existente y funcional (PHP + SMTP)
7. **Footer**

### `nickgranados.com/dev` — Reclutadores / empresas tech
Página minimalista de una sola pantalla. Sin scroll largo.

Contenido:
- Nombre + título: "Full Stack Developer · 6 años de experiencia"
- Stack técnico: generado automáticamente desde los proyectos del portfolio
- Tres botones: GitHub · LinkedIn · Descargar CV
- Nota de disponibilidad: "Disponible para proyectos freelance part-time"

---

## Sección de Servicios (nueva)

Grid de 4 cards, sin precios, CTA único al final de la sección.

| Servicio | Descripción corta |
|---|---|
| Landing pages / sitios corporativos | Next.js o WordPress, desde diseño hasta deploy |
| E-commerce | WooCommerce o tienda custom con integración de pagos |
| Aplicaciones web / Full Stack | Dashboards, sistemas internos, APIs REST |
| Mantenimiento y soporte | Updates, mejoras continuas, soporte mensual |

**Texto del CTA:** "Hablemos de tu proyecto →" (va a sección de contacto)

---

## Sección de Proyectos (refactor)

El grid actual es fijo. Se convierte en grid escalable donde cada card contiene:
- Screenshot / imagen de preview
- Nombre del proyecto
- Stack utilizado (array de tags)
- Botón "Ver en vivo" → link a demo desplegada

Stack de display en `/dev` = unión de todos los stacks de todos los proyectos. **Un solo lugar de verdad:** hay un archivo `src/data/projects.ts` que contiene todos los proyectos con sus stacks. La página `/dev` lee ese archivo y deduplica las tecnologías. El comando `/add-project` actualiza ese archivo. No hay que editar `/dev` manualmente nunca.

**Stack inicial (2026-05):** WordPress · PHP · Gutenberg · JavaScript · React · Next.js · Node.js · Laravel · MySQL · PostgreSQL

Demos en vivo usando plataformas gratuitas según tipo de proyecto:
- Next.js / React → Vercel
- Estáticos → GitHub Pages o Netlify
- WordPress → InfinityFree u otro hosting PHP gratuito

El comando `/add-project` se actualiza para también registrar el stack del proyecto en el dato central que genera `/dev`.

---

## SEO básico

Archivos a crear:
- `public/sitemap.xml` — listado de URLs del sitio
- `public/robots.txt` — permiso a crawlers
- Meta tags Open Graph en `layout.tsx` — preview al compartir en LinkedIn/WhatsApp (título, descripción, imagen)

---

## Estrategia de visibilidad orgánica

### Semana 1–2 (en paralelo al sprint del sitio)
- Conectar nickgranados.com a **Google Search Console** y subir sitemap
- Optimizar perfil de **LinkedIn** con el mismo mensaje del hero del sitio
- Empezar a postear proyectos en LinkedIn a medida que se publican los demos

### Semana 3+ (con el sitio listo)
- Crear perfil en **Upwork** o **Workana** con proyectos en vivo como ejemplos de trabajo
- Establecer el loop de crecimiento: terminar proyecto → deploy demo → `/add-project` → post en LinkedIn

### Escalado futuro (cuando llegue trabajo)
- Google Ads apuntando a sección de servicios del sitio principal

---

## Loop de crecimiento

```
Terminás proyecto
  → Deploy demo gratis (Vercel / Netlify / GitHub Pages)
  → /add-project (agrega card + actualiza stack en /dev)
  → Post en LinkedIn con link al demo
  → Clientes ven trabajo real en vivo
  → Más proyectos → más stack → más credibilidad
```

---

## Fuera de scope (por ahora)

- CMS para gestionar proyectos (contenido hardcodeado es suficiente con `/add-project`)
- Blog o sección de artículos
- Publicidad paga
- Página de precios
- Testimonios (sin clientes aún)

---

## Criterios de éxito del sprint

- [ ] Sección de Servicios visible y con CTA funcional
- [ ] Al menos 5 proyectos con demo en vivo linkeada
- [ ] Página `/dev` accesible y con stack correcto
- [ ] sitemap.xml y robots.txt presentes
- [ ] Open Graph funcionando (preview al compartir el link)
- [ ] Google Search Console conectado
