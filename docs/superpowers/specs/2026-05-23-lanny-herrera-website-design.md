# Sitio Lanny Herrera — Profesora de Idiomas Online

**Fecha**: 2026-05-23
**Tipo**: Cliente real + caso para portfolio + entorno de prueba para plugin custom de testimonios
**Stack**: WordPress self-hosted (Astra + Polylang)

---

## Contexto

**Lanny Herrera** es una profesora de idiomas con base en Brasil, trilingüe, que enseña inglés, español y portugués online. Audiencia: teens, adultos y profesionales, incluyendo preparación de exámenes (TOEFL, IELTS, Cambridge).

Este sitio cumple tres objetivos simultáneos:

1. **Cliente real**: Lanny obtiene una web profesional para captar alumnos.
2. **Caso de portfolio**: Nick suma un caso WordPress vendible (multilingual + custom theme).
3. **Banco de pruebas**: el sitio sirve como entorno real donde después se instalará y se reemplazará el plugin custom de testimonios (proyecto separado, fase 2).

**No-objetivos** (descartados deliberadamente):
- Booking online (Calendly/Amelia) → se decidirá en fase 2 si Lanny lo pide.
- Venta de cursos / pagos online → fuera de scope.
- Área de alumnos / LMS → fuera de scope.
- Blog → fuera de scope inicial; puede sumarse después para SEO.

---

## Arquitectura del sitio

Sitio one-page con anchors + selector de idioma. Mismo layout en los 3 idiomas.

### Secciones (en orden)

| # | Sección | Contenido | Componente WP |
|---|---------|-----------|---------------|
| 1 | **Hero** | Foto Lanny + headline rotante en 3 idiomas + CTA "Reservá tu clase de prueba" → WhatsApp | Block group + cover image + JS rotación |
| 2 | **Sobre Lanny** | Bio + credenciales + por qué online + foto secundaria | Block columns + image |
| 3 | **Idiomas que enseño** | 3 cards (Inglés / Español / Portugués) con icono bandera + descripción + niveles cubiertos | Block columns + CSS custom |
| 4 | **Preparación de exámenes** | TOEFL · IELTS · Cambridge — bloque destacado | Block group |
| 5 | **Metodología online** | 3-4 puntos: plataforma (Zoom/Meet), material, frecuencia, evaluación | Block list + iconos |
| 6 | **Testimonios** | Carrusel/grid con foto+nombre+texto+rating | **Strong Testimonials** (provisorio); reemplazo por plugin custom en fase 2 |
| 7 | **Contacto** | Form (nombre/email/idioma de interés/nivel actual/mensaje) + redes sociales | Contact Form 7 |
| 8 | **Footer** | Redes + copyright + selector de idioma secundario | Custom footer |

**Decisión**: **No se muestran precios**. CTA siempre apunta a contacto/WhatsApp para calificar el lead antes de cotizar.

**Decisión**: **Sin sección de blog** en lanzamiento. Puede sumarse en fase 2 si se valida que Lanny producirá contenido sostenido.

### Elementos globales

- **WhatsApp flotante**: botón fijo esquina inferior derecha, abre chat con número personal de Lanny + mensaje pre-cargado contextualizado al idioma activo del sitio.
- **Selector de idioma**: banderas en header + dropdown en footer.

---

## Stack técnico

### Hosting y dominio

- **Subdominio**: `lanny.nickgranados.com` en HostGator de Nick.
- **Carpeta**: `/home1/nickda77/public_html/lanny/` (aislado del sitio actual de Nick).
- **WordPress**: instalación vía Softaculous (1-click) en cPanel.
- **SSL**: AutoSSL automático de HostGator.
- **Migración futura**: cuando Lanny apruebe y compre dominio propio, se migra (export DB + actualización de URLs con Better Search Replace).

### Tema

- **Astra** (gratis) con **child theme custom** (`astra-child`).
- Custom CSS en child theme para branding y ajustes finos.
- **Razón vs tema desde cero**: para un cliente con deadline, customizar Astra es más rápido y robusto. El proyecto "tema WordPress desde cero" queda reservado como **proyecto WordPress #2** del portfolio de Nick (su propio brainstorm).

### Multilingual

- **Plugin**: Polylang (versión gratis es suficiente).
- **Idioma default**: PT (mercado primario).
- **Secundarios**: ES + EN.
- **URLs**: `/` (PT) · `/es/` · `/en/` (mejor SEO que query params).
- **Slugs traducidos**: ej. `/sobre-lanny` (PT) · `/sobre-mi` (ES) · `/about` (EN).
- **Workflow de contenido**: Lanny pasa textos en 1 idioma → Nick traduce los otros 2 (DeepL como base + revisión humana).

### Plugins esenciales (lista final)

| Plugin | Función | Notas |
|--------|---------|-------|
| Polylang | Multilingual PT/ES/EN | Free |
| Strong Testimonials | Testimonios (provisorio) | Se reemplaza en fase 2 por plugin custom |
| Contact Form 7 | Form de contacto | Free, estable |
| Flamingo | Guarda submissions del form en DB | Complemento de CF7 |
| Akismet | Anti-spam | Free para uso personal |
| Yoast SEO | SEO + sitemap + meta por idioma | Free version suficiente |
| LiteSpeed Cache | Cache + optimización | Compatible con HostGator |
| WP Whatsapp Chat | Botón flotante WhatsApp | Free, configurable por idioma |

### Form de contacto

- **Campos**: nombre, email, idioma de interés (dropdown EN/ES/PT), nivel actual (dropdown principiante/intermedio/avanzado/preparación examen), mensaje.
- **Destinatarios**: email a Lanny + CC oculto a Nick (hasta confirmar recepción correcta los primeros días).
- **Anti-spam**: honeypot + Akismet.
- **Backup**: Flamingo guarda copia en DB por si falla email.

### SEO técnico

- Yoast con meta descriptions por idioma.
- Sitemap XML automático por idioma.
- hreflang configurado vía Polylang.
- Schema.org: `LocalBusiness` + `Person` para Lanny.
- Google Search Console: configurar 1 propiedad con hreflang (no 3 separadas).

### Performance

- **Imágenes**: optimizar con TinyPNG antes de subir + lazy loading nativo de WP.
- **Cache**: LiteSpeed Cache con preset estándar.
- **Fuentes**: Google Fonts vía Astra (subset latin + latin-ext para acentos PT).
- **Target Lighthouse**: ≥90 performance en mobile.

### Branding

- **Paleta**: a definir con Lanny en fase 3. Si no tiene preferencia, Nick propone 2-3 paletas cálidas/educativas para que elija (ej. navy + coral + crema).
- **Tipografías**: 1 sans-serif para body (Inter / Open Sans) + 1 display para headings (Playfair / Fraunces). Google Fonts.
- **Logo**: si Lanny no tiene, se hace un wordmark tipográfico simple.
- **Favicon**: derivado del logo.

---

## Plan de deploy (7 fases)

| Fase | Qué hacemos | Tiempo estimado |
|------|-------------|-----------------|
| **0 — Setup** | Crear subdominio en cPanel, instalar WP, configurar SSL | 30 min |
| **1 — Base** | Instalar Astra + child theme, Polylang, plugins esenciales | 1 hora |
| **2 — Estructura** | Crear las 8 secciones con contenido placeholder en PT | 2-3 horas |
| **3 — Contenido real** | Lanny pasa bio/foto/textos → maquetar en PT | 2 horas |
| **4 — Traducciones** | Traducir y maquetar ES + EN con Polylang | 2-3 horas |
| **5 — Pulido** | Testimonios reales + form + WhatsApp + SEO básico | 1-2 horas |
| **6 — Launch** | Test cross-device, validar form, anunciar a Lanny | 30 min |

**Total estimado**: ~12 horas distribuidas en 3-4 sesiones.

---

## Dependencias y riesgos

### Bloqueantes (sin esto no avanza)
- **Contenido de Lanny**: bio real, foto profesional, testimonios reales, redes sociales, número WhatsApp, datos de método. Sin esto, fase 3 queda parada.

### Riesgos
- **Traducciones**: si Lanny no provee versiones ES/EN, Nick las hace con DeepL + revisión. Riesgo de calidad en términos técnicos de exámenes (TOEFL/IELTS) — mitigación: Lanny revisa antes de publicar.
- **Calidad de fotos**: si Lanny no tiene fotos profesionales, el hero pierde impacto. Mitigación: foto casera bien iluminada + edición básica como mínimo viable.
- **Email deliverability**: el form puede caer en spam de Lanny (HostGator no es el mejor para email). Mitigación: configurar SPF/DKIM y monitorear primeros envíos. Flamingo guarda backup en DB.

---

## Definition of Done

El sitio se considera lanzado cuando:

1. ✅ `lanny.nickgranados.com` resuelve con SSL válido.
2. ✅ Las 8 secciones existen en los 3 idiomas con contenido real (no Lorem Ipsum).
3. ✅ El form de contacto envía a Lanny y guarda en Flamingo.
4. ✅ El botón WhatsApp abre chat con mensaje pre-cargado al número personal de Lanny.
5. ✅ Lighthouse mobile ≥90 performance, ≥90 SEO, ≥90 accessibility.
6. ✅ Probado en Chrome desktop, Chrome mobile, Safari mobile.
7. ✅ Google Search Console verificado y sitemap submitido.
8. ✅ Lanny revisó y aprobó.

## Decisiones explícitas registradas

| Decisión | Resolución | Razón |
|----------|------------|-------|
| Stack | WordPress self-hosted | Para usar el plugin custom de testimonios en fase 2 |
| Tema | Astra + child theme | Velocidad vs tema desde cero (que va al proyecto WP #2) |
| Idiomas | PT default + ES + EN | Lanny es trilingüe, maximiza audiencia |
| Hosting | Subdominio en HostGator de Nick | Costo cero hasta validar con Lanny |
| Precios | No mostrar — "consultar" | Permite calificar leads en WhatsApp antes de cotizar |
| WhatsApp | Número personal de Lanny | No tiene Business todavía |
| Booking | Fuera de scope (fase 2 si se pide) | Vitrina simple primero, complejidad después |
| Blog | Fuera de scope inicial | Requiere producción sostenida; sumar si se valida |
| Testimonios | Strong Testimonials (provisorio) | Plugin custom es proyecto separado |
