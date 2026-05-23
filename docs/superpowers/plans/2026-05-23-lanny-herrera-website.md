# Lanny Herrera Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> ⚠️ **NOTA**: Este plan involucra GUIs externas (cPanel HostGator, WordPress admin). Varios pasos NO son automatizables por subagentes — requieren ejecución manual de Nick. Ver "Modo de ejecución" abajo.

**Spec**: [docs/superpowers/specs/2026-05-23-lanny-herrera-website-design.md](../specs/2026-05-23-lanny-herrera-website-design.md)

**Goal:** Lanzar `lanny.nickgranados.com` con sitio WordPress trilingüe (PT/ES/EN) one-page, listo para captar alumnos de Lanny Herrera.

**Architecture:** WordPress en subdominio de HostGator de Nick → tema Astra + child theme custom versionado en repo separado → Polylang para trilingüe → 8 secciones one-page → Contact Form 7 + WhatsApp flotante → Strong Testimonials (provisorio, se reemplaza por plugin custom en fase 2 de otro proyecto).

**Tech Stack:** WordPress 6.x · PHP 8.x (HostGator) · MySQL · Astra theme + child theme · Polylang · Contact Form 7 + Flamingo · Akismet · Yoast SEO · LiteSpeed Cache · WP Whatsapp Chat · Strong Testimonials.

**Modo de ejecución**: Híbrido — pasos en cPanel/WP admin los hace Nick guiado; pasos de código (child theme CSS/PHP) se versionan en repo `nick-granados/lanny-astra-child` aparte.

---

## File Structure

### Repo nuevo: `nick-granados/lanny-astra-child`
Crear repo GitHub público para versionar el child theme. Estructura:

```
lanny-astra-child/
├── style.css              # header del child theme + custom CSS
├── functions.php          # enqueue parent + custom hooks
├── screenshot.png         # thumbnail del theme (1200x900)
├── README.md              # cómo instalar/desarrollar
├── .gitignore             # ignorar .DS_Store, *.zip
└── assets/
    ├── css/
    │   └── custom.css     # CSS adicional si se separa
    └── images/
        └── (logo/favicon cuando exista)
```

### Sitio WordPress (en HostGator, no versionado)
```
/home1/nickda77/public_html/lanny/
├── wp-admin/                              # core WP
├── wp-content/
│   ├── themes/
│   │   ├── astra/                         # tema padre (vía WP admin)
│   │   └── astra-child/                   # nuestro child theme (vía SFTP o ZIP upload)
│   ├── plugins/                           # vía WP admin
│   └── uploads/                           # imágenes de Lanny
└── wp-config.php                          # generado por Softaculous
```

**Decisión de versionado**: solo el child theme va a Git. El contenido WP (DB), uploads, y configuración de plugins viven en el servidor — no se versionan. Para backup: export semanal de DB + uploads vía plugin UpdraftPlus (fase 2 si se quiere).

---

## Fase 0 — Setup hosting (30 min)

### Task 0.1: Crear subdominio en cPanel

**Files:** N/A (acción en cPanel)

- [ ] **Step 1**: Login a cPanel de HostGator (`https://nickgranados.com:2083` o panel de Nick)

- [ ] **Step 2**: Subdomains → crear nuevo

  - Subdomain: `lanny`
  - Domain: `nickgranados.com`
  - Document Root: `/home1/nickda77/public_html/lanny` (se autocompleta)

- [ ] **Step 3**: Crear y esperar confirmación. cPanel crea la carpeta.

- [ ] **Step 4**: Verificar DNS resuelve

  Run: `nslookup lanny.nickgranados.com`
  Expected: misma IP que `nickgranados.com` (puede tardar 5-15 min)

- [ ] **Step 5**: Abrir `https://lanny.nickgranados.com` en navegador. Debería mostrar página vacía o "Index of /lanny" (sin contenido aún).

### Task 0.2: Instalar WordPress vía Softaculous

**Files:** N/A (acción en cPanel)

- [ ] **Step 1**: En cPanel → buscar "Softaculous Apps Installer" o "WordPress Installer"

- [ ] **Step 2**: Click "Install Now" en WordPress

- [ ] **Step 3**: Llenar formulario:

  - Protocol: `https://`
  - Domain: `lanny.nickgranados.com`
  - In Directory: dejar VACÍO (queremos WP en raíz del subdominio)
  - Site Name: `Lanny Herrera — Professora de Idiomas` (temporal)
  - Site Description: `Aulas de inglês, espanhol e português online`
  - Admin Username: `lannyadmin` (NO usar "admin")
  - Admin Password: generar uno fuerte y guardarlo en password manager
  - Admin Email: email de Nick (cambiamos a Lanny después)
  - Language: Português (Brasil) — `pt_BR`

- [ ] **Step 4**: Click "Install". Esperar ~1 min.

- [ ] **Step 5**: Verificar accediendo a `https://lanny.nickgranados.com` (debería mostrar tema default de WP)

- [ ] **Step 6**: Verificar `https://lanny.nickgranados.com/wp-admin` muestra login

### Task 0.3: Configurar SSL y permalinks

**Files:** N/A (acción en WP admin)

- [ ] **Step 1**: Login a WP admin con credenciales recién creadas

- [ ] **Step 2**: Settings → General → verificar URLs son `https://` (no `http://`)

- [ ] **Step 3**: Settings → Permalinks → seleccionar "Post name" → Save

- [ ] **Step 4**: Abrir `https://lanny.nickgranados.com` en incógnito → verificar candado SSL verde

- [ ] **Step 5**: **Checkpoint humano**: confirmar antes de seguir que SSL funciona y WP admin carga OK

---

## Fase 1 — Base técnica (1.5 horas)

### Task 1.1: Crear repo GitHub para child theme

**Files:**
- Create: nuevo repo `nick-granados/lanny-astra-child` en GitHub

- [ ] **Step 1**: En GitHub crear repo público `lanny-astra-child`

  - Description: "Child theme for Lanny Herrera language teacher website (Astra parent)"
  - Add README, .gitignore (template: WordPress)
  - License: MIT

- [ ] **Step 2**: Clonar local

  ```bash
  cd /e/Users/nick_/Documents/Cursos/
  git clone https://github.com/nick-granados/lanny-astra-child.git
  cd lanny-astra-child
  ```

### Task 1.2: Crear archivos base del child theme

**Files:**
- Create: `lanny-astra-child/style.css`
- Create: `lanny-astra-child/functions.php`

- [ ] **Step 1**: Crear `style.css` con header WordPress estándar

  ```css
  /*
  Theme Name: Astra Child — Lanny Herrera
  Theme URI: https://lanny.nickgranados.com
  Description: Child theme de Astra para el sitio de Lanny Herrera (profesora de idiomas online).
  Author: Nick Granados
  Author URI: https://nickgranados.com
  Template: astra
  Version: 0.1.0
  License: MIT
  Text Domain: astra-child-lanny
  */

  /* === Paleta (placeholder hasta definir con Lanny) === */
  :root {
    --color-primary: #1e3a8a;   /* navy temporal */
    --color-accent: #f97316;    /* coral cálido temporal */
    --color-bg: #fdfbf7;        /* crema */
    --color-text: #1f2937;
  }

  /* === Tipografía base === */
  body {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--color-text);
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', Georgia, serif;
  }
  ```

- [ ] **Step 2**: Crear `functions.php`

  ```php
  <?php
  /**
   * Astra Child — Lanny Herrera functions
   */

  if ( ! defined( 'ABSPATH' ) ) {
      exit;
  }

  /**
   * Enqueue parent + child styles.
   */
  function lanny_enqueue_styles() {
      wp_enqueue_style(
          'astra-parent',
          get_template_directory_uri() . '/style.css',
          array(),
          wp_get_theme( 'astra' )->get( 'Version' )
      );
      wp_enqueue_style(
          'astra-child-lanny',
          get_stylesheet_uri(),
          array( 'astra-parent' ),
          wp_get_theme()->get( 'Version' )
      );
  }
  add_action( 'wp_enqueue_scripts', 'lanny_enqueue_styles' );
  ```

- [ ] **Step 3**: Commit y push

  ```bash
  git add style.css functions.php
  git commit -m "feat: initial child theme scaffold"
  git push origin main
  ```

### Task 1.3: Instalar Astra parent + subir child theme a WordPress

**Files:** Upload via WP admin

- [ ] **Step 1**: WP admin → Appearance → Themes → Add New → buscar "Astra" → Install (no activar todavía)

- [ ] **Step 2**: Crear ZIP local del child theme

  ```bash
  cd /e/Users/nick_/Documents/Cursos/lanny-astra-child
  zip -r ../lanny-astra-child.zip . -x ".git/*" "*.DS_Store" "*.zip"
  ```

- [ ] **Step 3**: WP admin → Appearance → Themes → Add New → Upload Theme → seleccionar `lanny-astra-child.zip` → Install → **Activate**

- [ ] **Step 4**: Verificar el sitio (`lanny.nickgranados.com`) carga sin errores. Debería verse como Astra default + posible cambio de fonts.

### Task 1.4: Instalar plugins esenciales (lote 1 — core)

**Files:** N/A (WP admin → Plugins → Add New)

Instalar y activar uno por uno:

- [ ] **Step 1**: `Polylang` (multilingual)
- [ ] **Step 2**: `Contact Form 7`
- [ ] **Step 3**: `Flamingo` (backup de submissions de CF7)
- [ ] **Step 4**: `Akismet Anti-Spam` (activar con API key gratis de WordPress.com)
- [ ] **Step 5**: `Yoast SEO`
- [ ] **Step 6**: `LiteSpeed Cache`
- [ ] **Step 7**: `Strong Testimonials` (provisorio — será reemplazado por plugin custom)
- [ ] **Step 8**: `Click to Chat – HoliThemes` (botón WhatsApp flotante)
- [ ] **Step 9**: Verificar todos activos. **Checkpoint**: no debe haber conflictos visibles en frontend.

### Task 1.5: Configurar Polylang con 3 idiomas

**Files:** N/A (Polylang setup wizard)

- [ ] **Step 1**: WP admin → Languages (menú lateral nuevo de Polylang)

- [ ] **Step 2**: Add language:
  - Portuguese (Brasil) — slug `pt-br` — **marcar como default**
  - Spanish — slug `es`
  - English — slug `en`

- [ ] **Step 3**: Settings → URL modifications:
  - "The language is set from the directory name in pretty permalinks"
  - "Hide URL language information for default language" → **activar** (PT en `/`, otros en `/es/`, `/en/`)

- [ ] **Step 4**: Verificar visitando `lanny.nickgranados.com/es/` → debería responder 200 (aunque sin contenido aún)

### Task 1.6: Commit checkpoint

- [ ] **Step 1**: En el repo de docs (este), agregar nota de progreso al spec si hace falta. (No commit obligatorio acá.)

- [ ] **Step 2**: **Checkpoint humano**: confirmar que WP base + Polylang funcionan antes de empezar contenido.

---

## Fase 2 — Estructura (2-3 horas)

### Task 2.1: Crear página Home en PT y configurarla como front

**Files:** N/A (WP admin)

- [ ] **Step 1**: Pages → Add New → Title: `Início` → publicar (sin contenido aún)

- [ ] **Step 2**: Settings → Reading → "Your homepage displays" → "A static page" → Homepage: `Início` → Save

- [ ] **Step 3**: Visitar `lanny.nickgranados.com` → debe mostrar página vacía con título "Início"

### Task 2.2: Sección 1 — Hero

**Files:** Edición en Gutenberg (Pages → Início)

- [ ] **Step 1**: Editar `Início`. Agregar **Cover block** con:

  - Imagen placeholder (subir cualquier foto temporal)
  - Overlay: 40% negro
  - Min height: 80vh
  - Anchor (HTML id): `hero`

- [ ] **Step 2**: Dentro del Cover, agregar headings:

  - H1: `Aulas de Inglês, Espanhol e Português`
  - H2 (subtitle): `Online, do iniciante ao avançado — preparação para exames inclusa`

- [ ] **Step 3**: Agregar Button block:
  - Texto: `Agende sua aula experimental`
  - Link: `#contato` (anchor temporal)

- [ ] **Step 4**: Save Draft → Preview → verificar verse en mobile y desktop.

### Task 2.3: Sección 2 — Sobre Lanny

- [ ] **Step 1**: Agregar **Group block** con anchor `sobre`

- [ ] **Step 2**: Dentro: **Columns block** (2 columnas)
  - Col 1: Imagen placeholder de Lanny
  - Col 2: H2 `Sobre mim` + párrafo placeholder de bio (~120 palabras, lorem temporal)

### Task 2.4: Sección 3 — Idiomas que enseño

- [ ] **Step 1**: Group block, anchor `idiomas`

- [ ] **Step 2**: H2 centrado: `Idiomas que ensino`

- [ ] **Step 3**: Columns block (3 columnas) — cada una con:
  - Emoji bandera (🇬🇧 / 🇪🇸 / 🇧🇷) o imagen
  - H3: `Inglês` / `Espanhol` / `Português`
  - Párrafo: niveles cubiertos (placeholder)

### Task 2.5: Sección 4 — Preparación de exámenes

- [ ] **Step 1**: Group block, anchor `exames`, background color destacado

- [ ] **Step 2**: H2: `Preparação para exames`

- [ ] **Step 3**: List o columns con: TOEFL · IELTS · Cambridge (FCE/CAE/CPE)

- [ ] **Step 4**: Párrafo corto: experiencia preparando alumnos para certificaciones internacionales

### Task 2.6: Sección 5 — Metodología

- [ ] **Step 1**: Group block, anchor `metodologia`

- [ ] **Step 2**: H2: `Como funcionam minhas aulas`

- [ ] **Step 3**: Columns (4 columnas) con icono + título + descripción corta:
  - 🎥 Plataforma: Zoom/Google Meet
  - 📚 Material: personalizado por nível
  - 📅 Frequência: 1-3 vezes por semana
  - 📊 Avaliação: feedback contínuo

### Task 2.7: Sección 6 — Testimonios (Strong Testimonials)

- [ ] **Step 1**: WP admin → Testimonials (nuevo CPT de Strong Testimonials) → agregar 3 testimonios placeholder

  - Cada uno: nombre, foto opcional, texto, rating 5⭐

- [ ] **Step 2**: Testimonials → Views → Add New View
  - Display: Slider
  - Mostrar: 3 a la vez en desktop, 1 en mobile
  - Copiar shortcode generado (ej: `[testimonial_view id="1"]`)

- [ ] **Step 3**: En Home → Group block, anchor `depoimentos`, H2: `O que dizem meus alunos` → pegar shortcode dentro de un Shortcode block

### Task 2.8: Sección 7 — Contacto

- [ ] **Step 1**: WP admin → Contact → crear nuevo form "Contacto Lanny PT"

  Campos:
  ```
  <label>Nome *<br>[text* nome] </label>
  <label>Email *<br>[email* email] </label>
  <label>Idioma de interesse<br>[select idioma "Inglês" "Espanhol" "Português" "Preparação de exames"] </label>
  <label>Seu nível atual<br>[select nivel "Iniciante" "Intermediário" "Avançado" "Não sei"] </label>
  <label>Sua mensagem<br>[textarea mensagem] </label>
  [submit "Enviar"]
  ```

- [ ] **Step 2**: Mail tab → To: `hello@nickgranados.com` (temporal — cambiar a Lanny en fase 5) · From: `noreply@lanny.nickgranados.com`

- [ ] **Step 3**: Copiar shortcode generado (ej: `[contact-form-7 id="42"]`)

- [ ] **Step 4**: En Home → Group block, anchor `contato`, H2: `Vamos conversar?` → pegar shortcode

### Task 2.9: Configurar WhatsApp flotante

- [ ] **Step 1**: WP admin → Settings → Click to Chat
  - Phone number: número de Lanny (formato internacional sin `+`, ej: `5546912345678`) — usar placeholder hasta confirmar con ella
  - Pre-filled message: `Olá Lanny! Vi seu site e quero saber mais sobre as aulas.`
  - Position: bottom-right
  - Show on: All pages

- [ ] **Step 2**: Visitar Home → verificar botón WhatsApp flotante aparece

### Task 2.10: Menú de navegación con anchors

- [ ] **Step 1**: Appearance → Menus → crear menú "Header PT"

- [ ] **Step 2**: Agregar Custom Links:
  - Início → `#hero`
  - Sobre → `#sobre`
  - Idiomas → `#idiomas`
  - Exames → `#exames`
  - Depoimentos → `#depoimentos`
  - Contato → `#contato`

- [ ] **Step 3**: Asignar a Primary Menu

- [ ] **Step 4**: Verificar header muestra el menú y los clicks scrollean a la sección

### Task 2.11: Footer

- [ ] **Step 1**: Appearance → Customize → Footer → reemplazar copyright por:
  `© 2026 Lanny Herrera — Aulas de idiomas online`

- [ ] **Step 2**: Sumar widget Social Icons con placeholders de Instagram/LinkedIn/YouTube (URLs a definir con Lanny)

### Task 2.12: Custom CSS inicial (commit en child theme)

**Files:**
- Modify: `lanny-astra-child/style.css`

- [ ] **Step 1**: Agregar al final de `style.css`:

  ```css
  /* === Hero === */
  .wp-block-cover.has-background-dim-40 h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1.1;
  }

  /* === Sections spacing === */
  .wp-block-group {
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  /* === Buttons === */
  .wp-block-button__link {
    background-color: var(--color-accent);
    border-radius: 999px;
    padding: 1rem 2rem;
    font-weight: 600;
  }

  /* === Cards (columns inside idiomas/metodologia) === */
  .wp-block-columns .wp-block-column {
    text-align: center;
  }

  /* === Smooth scroll para anchors === */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }
  ```

- [ ] **Step 2**: Commit en repo child theme

  ```bash
  git add style.css
  git commit -m "feat: hero, sections, buttons, smooth scroll styles"
  git push origin main
  ```

- [ ] **Step 3**: Re-empaquetar y subir ZIP a WP

  ```bash
  zip -r ../lanny-astra-child.zip . -x ".git/*" "*.DS_Store" "*.zip"
  ```

  WP admin → Themes → Add New → Upload → reemplazar.

  *Alternativa más rápida en fase de desarrollo*: SFTP directo a `/wp-content/themes/astra-child/style.css`.

- [ ] **Step 4**: Hard refresh navegador (Ctrl+Shift+R) → verificar estilos aplicados

### Task 2.13: Checkpoint Fase 2

- [ ] **Step 1**: Recorrer todas las secciones del Home y verificar:
  - Las 8 secciones existen y están en orden
  - Anchors funcionan
  - Visual aceptable en desktop y mobile (DevTools)
  - WhatsApp flotante visible

- [ ] **Step 2**: **Checkpoint humano**: aprobar estructura antes de pedir contenido a Lanny.

---

## Fase 3 — Contenido real PT (2 horas) — **BLOQUEADO POR LANNY**

### Task 3.0: Pre-requisito — recibir contenido de Lanny

- [ ] **Step 1**: Enviar a Lanny pedido formal con:

  - Foto profesional (alta resolución, vertical y horizontal si tiene)
  - Bio en PT (~120 palabras): formación, años de experiencia, especialidades
  - 3-5 testimonios reales (nombre + texto + idioma que aprendió + foto opcional)
  - URLs de redes sociales (Instagram, LinkedIn, YouTube)
  - Número WhatsApp confirmado
  - Email donde quiere recibir contactos
  - Preferencia de paleta de colores (o mostrar 2-3 opciones)
  - Logo si tiene, o aprobar wordmark tipográfico

- [ ] **Step 2**: ⏳ **ESPERAR** respuesta de Lanny. Sin contenido, no continúa fase 3.

### Task 3.1: Reemplazar contenido placeholder con real

- [ ] **Step 1**: Subir foto Lanny a Media Library (optimizada con TinyPNG previo, <500KB)

- [ ] **Step 2**: Editar Home → Hero → reemplazar imagen placeholder por foto real

- [ ] **Step 3**: Sobre → reemplazar bio placeholder por bio real PT

- [ ] **Step 4**: Idiomas → ajustar copy con descripciones reales de cada idioma

- [ ] **Step 5**: Exames → ajustar copy con años de experiencia y enfoque real

- [ ] **Step 6**: Metodologia → confirmar plataforma real (Zoom/Meet/Skype)

- [ ] **Step 7**: Testimonios → reemplazar los 3 placeholder por reales

- [ ] **Step 8**: Footer → actualizar URLs de redes sociales reales

- [ ] **Step 9**: Settings → General → actualizar Site Title y Tagline con copy final

### Task 3.2: Aplicar paleta real

**Files:**
- Modify: `lanny-astra-child/style.css`

- [ ] **Step 1**: Actualizar las variables CSS al final del header con la paleta aprobada por Lanny:

  ```css
  :root {
    --color-primary: #XXXXXX;  /* color aprobado */
    --color-accent: #XXXXXX;
    --color-bg: #XXXXXX;
    --color-text: #XXXXXX;
  }
  ```

- [ ] **Step 2**: Commit en child theme

  ```bash
  git add style.css
  git commit -m "feat: apply approved color palette"
  git push origin main
  ```

- [ ] **Step 3**: Subir actualización a WP (ZIP o SFTP)

### Task 3.3: Verificación visual

- [ ] **Step 1**: Probar en Chrome desktop (1920x1080, 1366x768)

- [ ] **Step 2**: Probar en Chrome DevTools mobile (iPhone 12, Pixel 5)

- [ ] **Step 3**: Verificar imágenes no se ven pixeladas en retina

- [ ] **Step 4**: **Checkpoint humano**: aprobar contenido PT antes de traducir.

---

## Fase 4 — Traducciones ES + EN (2-3 horas)

### Task 4.1: Traducir Home a Español

- [ ] **Step 1**: WP admin → Pages → editar `Início` → en sidebar Polylang → click "+ Español"

- [ ] **Step 2**: Crear página `Inicio` (ES) — Polylang la vincula automáticamente

- [ ] **Step 3**: Para CADA sección, copiar bloques de PT a ES y reemplazar texto. Sugerencia: usar DeepL como base, después revisar manualmente.

  Traducciones de anchors (slugs ES):
  - `#hero` → `#hero` (mantener)
  - `#sobre` → `#sobre`
  - `#idiomas` → `#idiomas`
  - `#exames` → `#examenes`
  - `#metodologia` → `#metodologia`
  - `#depoimentos` → `#testimonios`
  - `#contato` → `#contacto`

- [ ] **Step 4**: Publicar

### Task 4.2: Crear menú Header ES

- [ ] **Step 1**: Appearance → Menus → crear "Header ES" con anchors traducidos

- [ ] **Step 2**: Polylang asignará automáticamente al idioma ES

### Task 4.3: Form CF7 en ES

- [ ] **Step 1**: Contact → Duplicar form "Contacto Lanny PT" → renombrar "Contacto Lanny ES"

- [ ] **Step 2**: Traducir labels y placeholders al español

- [ ] **Step 3**: Polylang → asociar este form con la página ES (reemplazar shortcode del PT por el ES en la página)

### Task 4.4: Repetir 4.1-4.3 para Inglés

- [ ] **Step 1**: Página `Home` (EN) con bloques traducidos

  Anchors EN:
  - `#hero`, `#about`, `#languages`, `#exams`, `#methodology`, `#testimonials`, `#contact`

- [ ] **Step 2**: Menú "Header EN"

- [ ] **Step 3**: Form "Contacto Lanny EN" con labels en inglés

### Task 4.5: Selector de idioma en header

- [ ] **Step 1**: Appearance → Widgets (o Customize → Header → Above Header)

- [ ] **Step 2**: Agregar widget "Language Switcher" de Polylang
  - Display: dropdown o flags
  - Show flags: Sí
  - Hide current language: No

- [ ] **Step 3**: Verificar el selector aparece en las 3 versiones del sitio

### Task 4.6: hreflang automático

- [ ] **Step 1**: Polylang ya inyecta `<link rel="alternate" hreflang>` automáticamente. Verificar visitando `lanny.nickgranados.com` → View Source → buscar `hreflang`

  Expected: 3 entries (pt-br, es, en) + x-default apuntando a PT

### Task 4.7: Checkpoint Fase 4

- [ ] **Step 1**: Recorrer las 3 versiones manualmente. Verificar cada sección está traducida correctamente.

- [ ] **Step 2**: Probar selector de idioma en mobile.

- [ ] **Step 3**: **Checkpoint humano**: aprobar traducciones. Idealmente Lanny revisa ES y EN antes de seguir.

---

## Fase 5 — Pulido y SEO (1.5 horas)

### Task 5.1: Configurar destino real del form

- [ ] **Step 1**: Para cada uno de los 3 forms CF7 (PT, ES, EN):
  - To: email confirmado de Lanny
  - CC: `hello@nickgranados.com` (Nick recibe copia oculta primeros 30 días)
  - Reply-To: `[email]` (el email del lead)

- [ ] **Step 2**: Enviar test desde cada form (PT/ES/EN) y verificar llegada a inbox de Lanny.

- [ ] **Step 3**: Verificar también que Flamingo está guardando submissions: WP admin → Flamingo → Inbound Messages.

### Task 5.2: Yoast SEO básico

- [ ] **Step 1**: WP admin → SEO → General → first-time setup wizard

- [ ] **Step 2**: Para la Home (PT, ES, EN), editar meta description única en cada idioma (Yoast aparece al pie del editor de páginas).

- [ ] **Step 3**: SEO → Social → completar Open Graph (URL imagen hero, título, descripción)

- [ ] **Step 4**: SEO → Settings → Schema → tipo "Person" para Lanny + sitio "Website"

### Task 5.3: Schema.org Person + LocalBusiness

**Files:**
- Modify: `lanny-astra-child/functions.php`

- [ ] **Step 1**: Agregar a `functions.php`:

  ```php
  /**
   * Inject Person + LocalBusiness JSON-LD on homepage.
   */
  function lanny_inject_schema() {
      if ( ! is_front_page() ) {
          return;
      }

      $schema = array(
          '@context' => 'https://schema.org',
          '@graph'   => array(
              array(
                  '@type'       => 'Person',
                  'name'        => 'Lanny Herrera',
                  'jobTitle'    => 'Language Teacher',
                  'description' => 'Online English, Spanish and Portuguese teacher based in Brazil',
                  'knowsLanguage' => array( 'en', 'es', 'pt' ),
                  'url'         => home_url(),
              ),
              array(
                  '@type'       => 'LocalBusiness',
                  'name'        => 'Lanny Herrera Aulas de Idiomas',
                  'url'         => home_url(),
                  'areaServed'  => 'Worldwide',
                  'priceRange'  => '$$',
                  'address'     => array(
                      '@type'           => 'PostalAddress',
                      'addressCountry'  => 'BR',
                  ),
              ),
          ),
      );

      echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
  }
  add_action( 'wp_head', 'lanny_inject_schema' );
  ```

- [ ] **Step 2**: Commit en child theme

  ```bash
  git add functions.php
  git commit -m "feat: inject Person + LocalBusiness JSON-LD on homepage"
  git push origin main
  ```

- [ ] **Step 3**: Subir cambios a WP (SFTP recomendado para iteración rápida).

- [ ] **Step 4**: Validar con Google Rich Results Test: https://search.google.com/test/rich-results → URL `lanny.nickgranados.com` → esperar "valid"

### Task 5.4: LiteSpeed Cache

- [ ] **Step 1**: WP admin → LiteSpeed Cache → General → Enable

- [ ] **Step 2**: Cache → activar Cache, Browser Cache, Mobile Cache

- [ ] **Step 3**: Page Optimization → activar CSS Minify, JS Minify, HTML Minify

- [ ] **Step 4**: NO activar LazyLoad de Page Optimization si Astra ya lo hace (evitar conflicto)

- [ ] **Step 5**: Limpiar cache: LiteSpeed Cache → Toolbox → Purge All

### Task 5.5: Lighthouse audit y ajustes

- [ ] **Step 1**: Chrome DevTools → Lighthouse → Mobile → Run

- [ ] **Step 2**: Targets:
  - Performance ≥ 90
  - SEO ≥ 90
  - Accessibility ≥ 90
  - Best Practices ≥ 90

- [ ] **Step 3**: Si Performance < 90:
  - Revisar imágenes (deben ser WebP o JPG comprimido, <500KB)
  - Lazy load funcionando
  - Cache habilitado

- [ ] **Step 4**: Si Accessibility < 90:
  - Verificar alt text en todas las imágenes
  - Contraste de colores
  - Labels en form inputs

- [ ] **Step 5**: Iterar hasta cumplir targets.

---

## Fase 6 — Launch (30 min)

### Task 6.1: Test cross-device

- [ ] **Step 1**: Probar en Chrome desktop (1920x1080)
- [ ] **Step 2**: Probar en Chrome mobile (DevTools → iPhone 12 Pro)
- [ ] **Step 3**: Probar en Safari mobile real (si hay iPhone disponible) o BrowserStack
- [ ] **Step 4**: Verificar WhatsApp button abre app correctamente en mobile real

### Task 6.2: Test funcional final

- [ ] **Step 1**: Enviar form de prueba desde los 3 idiomas → verificar llegada

- [ ] **Step 2**: Click selector idioma → verificar las 3 versiones cargan

- [ ] **Step 3**: Verificar candado SSL en las 3 versiones

- [ ] **Step 4**: Verificar 404 personalizado (visitar URL inexistente)

### Task 6.3: Google Search Console

- [ ] **Step 1**: https://search.google.com/search-console → agregar propiedad `https://lanny.nickgranados.com`

- [ ] **Step 2**: Verificar propiedad vía meta tag (Yoast hace esto fácil: SEO → General → Webmaster Tools → pegar código)

- [ ] **Step 3**: Sitemaps → submit `https://lanny.nickgranados.com/sitemap_index.xml` (generado por Yoast)

### Task 6.4: Backup inicial

- [ ] **Step 1**: HostGator → Backup Wizard → download partial backup de la carpeta `/lanny/` y de la DB

- [ ] **Step 2**: Guardar local + nube (Drive/Dropbox)

### Task 6.5: Anuncio y handoff a Lanny

- [ ] **Step 1**: Enviar a Lanny:
  - URL: `https://lanny.nickgranados.com`
  - Credenciales WP admin (admin Lanny: crear nuevo usuario rol Editor, no Administrator, hasta que ella esté familiarizada)
  - Guía corta de 1 página: cómo editar contenido / agregar testimonio / responder mensajes del form

- [ ] **Step 2**: Cambiar admin email a Lanny en Settings → General

- [ ] **Step 3**: Pedirle que confirme que recibe los mensajes del form (test final desde mobile)

### Task 6.6: Update spec con estado final

- [ ] **Step 1**: Editar `docs/superpowers/specs/2026-05-23-lanny-herrera-website-design.md` y agregar al final:

  ```markdown
  ## Status

  - **Launched**: YYYY-MM-DD
  - **URL**: https://lanny.nickgranados.com
  - **Child theme repo**: https://github.com/nick-granados/lanny-astra-child
  - **Next phase**: reemplazar Strong Testimonials con plugin custom (proyecto separado)
  ```

- [ ] **Step 2**: Commit en repo de docs

  ```bash
  git add docs/superpowers/specs/2026-05-23-lanny-herrera-website-design.md
  git commit -m "docs: mark Lanny site as launched"
  git push
  ```

---

## Self-Review checklist

✅ **Spec coverage**:
- 8 secciones (Fase 2) ✓
- Trilingüe Polylang (Fase 4) ✓
- Astra + child theme (Fase 1) ✓
- 8 plugins esenciales (Fase 1.4) ✓
- Form CF7 + WhatsApp (Fases 2.8, 2.9, 5.1) ✓
- SEO + Schema (Fase 5.2, 5.3) ✓
- Performance ≥90 (Fase 5.5) ✓
- 7 fases de deploy ✓
- Definition of Done items: todos cubiertos en Fase 6 ✓

✅ **Placeholders**: Las variables CSS de paleta dicen `#XXXXXX` explícitamente esperando input de Lanny — esto está correctamente marcado como bloqueado. Las traducciones se hacen con DeepL + revisión, no son TODO.

✅ **Type consistency**: nombres de anchors PT son consistentes (`#contato`, `#sobre`, etc.) — los slugs ES/EN están explícitamente listados en Task 4.1 y 4.4.

✅ **Dependencies humanas marcadas**: Task 3.0 marca explícitamente "BLOQUEADO POR LANNY".

✅ **Versionado claro**: child theme va a repo separado, contenido WP no se versiona.

---

## Métricas de éxito

- Sitio público y SSL válido
- 3 idiomas funcionando con hreflang correcto
- Form envía a Lanny (test confirmado)
- WhatsApp botón abre chat (test mobile real)
- Lighthouse mobile ≥90 en Performance, SEO, Accessibility
- Lanny aprobó y recibió handoff

## Lo que NO entra en este plan

- Plugin custom de testimonios (proyecto separado, su propio spec/plan)
- Dominio propio (lanny.com.br u otro) — migración cuando Lanny apruebe
- Sistema de booking (fase 2 opcional)
- Venta de cursos / pagos (fase 2 opcional)
- Blog (fase 2 opcional)
- LMS / área de alumnos (descartado)
