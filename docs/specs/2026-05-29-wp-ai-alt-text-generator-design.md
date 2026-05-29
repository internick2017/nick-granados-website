# AI Alt Text Generator — WordPress Plugin Design

**Date:** 2026-05-29
**Status:** Approved
**Target:** WordPress.org public repository

---

## Problem

Most WordPress sites have images with missing or poor alt text, hurting both
accessibility (WCAG compliance) and SEO. WordPress 7.0 added native alt text
generation for the block editor, but only one image at a time. Sites on WP 6.x
have no free native solution. Bulk processing and automation are missing in all
current free offerings.

---

## Plugin Identity

| Field | Value |
|-------|-------|
| Plugin Name | AI Alt Text Generator |
| Slug | `ai-alt-text-generator` |
| Text Domain | `ai-alt-text-generator` |
| PHP Prefix | `AATG_` |
| Requires WP | 6.4 |
| Tested up to | 7.0 |
| Requires PHP | 8.1 |
| License | GPL-2.0-or-later |
| Author | Nick Granados |
| Author URI | https://nickgranados.com |

---

## Features — v1.0

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Settings page** | React UI with @wordpress/components. Always shows: language preference, auto-generate toggle. WP 7.0+: hides API key field, shows Connectors status banner. WP < 7.0: shows API key input + model selector. |
| 2 | **Media Library button** | "Generate Alt Text" button in the attachment edit screen (both classic media modal and Gutenberg media panel). One click = generate + save. |
| 3 | **Bulk Generator** | Admin page under Media → Bulk Alt Text. Lists all attachments with missing alt text, supports select-all, generates with live progress bar. |
| 4 | **REST API endpoint** | `POST /wp-json/ai-alt-text/v1/generate` — accepts `image_id` (int) or `image_url` (string). Returns generated alt text. Protected by nonce + `upload_files` capability. |

**Out of scope v1.0:** WooCommerce product images, video thumbnails, multisite
network admin, PDF alt text.

---

## AI Provider Architecture

The core architectural decision: detect WP version at runtime and route to the
correct AI provider. This avoids version string comparisons (fragile) in favor
of feature detection (robust).

```
User triggers generation
        ↓
AATG_AI_Provider::generate( $image_url, $language )
        ↓
function_exists( 'wp_ai_client' ) ?
    ✅ YES (WP 7.0+) → wp_ai_client()->get_chat_completion()
    ❌ NO  (WP 6.x)  → AATG_OpenAI->request()
        ↓
AATG_Generator::save( $image_id, $alt_text )
        ↓
update_post_meta( $image_id, '_wp_attachment_image_alt', $alt_text )
```

**Why `function_exists()` instead of `version_compare()`:**
Detects the capability, not the version number. Future backports of
`wp_ai_client()` to 6.x would be detected automatically.

---

## File Structure

```
ai-alt-text-generator/
│
├── ai-alt-text-generator.php      ← Plugin header + bootstrap (singleton init)
├── uninstall.php                  ← Deletes all options from wp_options on plugin delete
├── readme.txt                     ← WordPress.org listing (required format)
├── languages/
│   └── ai-alt-text-generator.pot ← Base translation template (generated via WP-CLI)
│
├── includes/                      ← All PHP business logic
│   ├── class-aatg-plugin.php      ← Main singleton class, loads all dependencies
│   ├── class-aatg-ai-provider.php ← Routes to WP Connectors API or OpenAI based on WP version
│   ├── class-aatg-openai.php      ← OpenAI API client (WP < 7.0 fallback)
│   ├── class-aatg-generator.php   ← Orchestrates: get URL → call provider → save to postmeta
│   ├── class-aatg-rest-api.php    ← REST route registration + request handlers
│   ├── class-aatg-media.php       ← Hooks: add_attachment, attachment_fields_to_edit
│   └── class-aatg-settings.php    ← register_setting(), add_options_page()
│
├── admin/
│   ├── class-aatg-admin.php       ← Admin menus, enqueue_scripts, enqueue_styles
│   └── views/
│       ├── settings-page.php      ← PHP shell that mounts the React settings app
│       └── bulk-page.php          ← PHP shell that mounts the React bulk generator
│
├── src/                           ← React source (never shipped directly)
│   ├── settings/
│   │   └── index.jsx              ← Settings page React app (@wordpress/components)
│   ├── media-panel/
│   │   └── index.jsx              ← Gutenberg media sidebar panel (PluginDocumentSettingPanel)
│   └── bulk/
│       └── index.jsx              ← Bulk generator React app with progress bar
│
├── build/                         ← Compiled assets (auto-generated, gitignored in dev)
│   ├── settings.js
│   ├── media-panel.js
│   └── bulk.js
│
└── package.json                   ← @wordpress/scripts build tooling
```

---

## Data Flow — Full Request Lifecycle

### Media Library button click → alt text saved

```
1. User clicks "Generate Alt Text" in media editor
2. src/media-panel/index.jsx → apiFetch({ path: '/ai-alt-text/v1/generate', method: 'POST', data: { image_id } })
3. WordPress REST API validates nonce + current_user_can('upload_files')
4. includes/class-aatg-rest-api.php → handle_generate( WP_REST_Request $request )
5. includes/class-aatg-generator.php → generate_for_image( $image_id )
   a. wp_get_attachment_url( $image_id ) → gets public image URL
   b. AATG_AI_Provider→generate( $image_url, $language ) → calls correct AI
   c. update_post_meta( $image_id, '_wp_attachment_image_alt', $alt_text )
6. REST API returns { alt_text: string, image_id: int }
7. React updates the UI field with the generated text
```

### Auto-generate on upload

```
Hook: add_action( 'add_attachment', 'aatg_auto_generate' )
     ↓ fires after image is saved to DB
AATG_Media::on_upload( $attachment_id )
     ↓ checks option 'aatg_auto_generate' === true
AATG_Generator::generate_for_image( $attachment_id )
     ↓ same flow as above
```

---

## WordPress Standards Compliance

### Security (mandatory for WP.org)

| Requirement | Implementation |
|-------------|----------------|
| Sanitize input | `absint()` for image IDs, `sanitize_text_field()` for strings |
| Escape output | `esc_html()`, `esc_attr()`, `esc_url()` before any echo |
| Nonces | `wp_create_nonce()` + `check_ajax_referer()` or REST nonce via `apiFetch` |
| Capability checks | `current_user_can( 'upload_files' )` on all generation endpoints |
| SQL | Never raw SQL — only `get_option()`, `update_post_meta()`, `wpdb->prepare()` |
| API key storage | `update_option( 'aatg_openai_api_key', $sanitized_key )` — masked in UI |

### Internationalization

All user-facing strings use WP i18n functions with text domain `ai-alt-text-generator`:

```php
__( 'Generate Alt Text', 'ai-alt-text-generator' )           // returns string
_e( 'Settings saved.', 'ai-alt-text-generator' )             // echoes string
esc_html__( 'Error occurred.', 'ai-alt-text-generator' )     // escaped string
_n( '%d image', '%d images', $n, 'ai-alt-text-generator' )   // singular/plural
```

### HTTP requests

Use `wp_remote_post()` / `wp_remote_get()` exclusively. Never `curl_exec()` directly.
WP.org reviewers reject direct cURL usage.

---

## Settings Stored in wp_options

| Option key | Type | Default | Notes |
|-----------|------|---------|-------|
| `aatg_openai_api_key` | string | `''` | Masked in UI, only used on WP < 7.0 |
| `aatg_model` | string | `'gpt-4o-mini'` | Options: gpt-4o-mini, gpt-4o |
| `aatg_language` | string | `'auto'` | auto = detect from `get_locale()` |
| `aatg_auto_generate` | bool | `false` | Auto-generate on new image upload |

`uninstall.php` deletes all `aatg_*` options when plugin is deleted (not just deactivated).

---

## REST API Specification

### POST /wp-json/ai-alt-text/v1/generate

**Authentication:** WordPress nonce (automatically handled by `@wordpress/api-fetch`)

**Permission:** `upload_files` capability

**Request body — two modes:**

Mode A (generate + auto-save to postmeta):
```json
{ "image_id": 123 }
```

Mode B (generate only, no save — useful for external tools):
```json
{ "image_url": "https://example.com/wp-content/uploads/2024/photo.jpg" }
```

At least one of `image_id` or `image_url` is required. If `image_id` is provided,
the generated alt text is automatically saved via `update_post_meta()`. If only
`image_url` is provided, the alt text is returned but NOT saved (no post ID available).

**Success response (200):**
```json
{
  "alt_text": "A red apple on a wooden table with soft natural lighting",
  "image_id": 123,
  "saved": true
}
```
When called with `image_url` only: `"image_id": null, "saved": false`.

**Error response:**
```json
{
  "code": "no_api_key",
  "message": "OpenAI API key is not configured.",
  "data": { "status": 400 }
}
```

---

## Versioning Roadmap

| Version | Features | Distribution |
|---------|----------|-------------|
| **1.0.0** | Settings, Media button, Bulk generator, REST API | WordPress.org free |
| **1.5.0** | Usage stats dashboard, custom prompt templates | WordPress.org free |
| **2.0.0 Pro** | WooCommerce product images, Gemini + Claude providers, priority support | nickgranados.com (Freemius) |

**Freemium model:** Lite version free on WP.org. Pro add-on sold via Freemius SDK
(handles licensing, payments, auto-updates). Never put pro code in the WP.org version.

---

## Plugin Bootstrap (main file)

```php
<?php
/**
 * Plugin Name:       AI Alt Text Generator
 * Plugin URI:        https://nickgranados.com/plugins/ai-alt-text-generator
 * Description:       Automatically generate descriptive alt text for images using AI. Supports WordPress 7.0 AI Connectors and OpenAI API for older versions.
 * Version:           1.0.0
 * Author:            Nick Granados
 * Author URI:        https://nickgranados.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ai-alt-text-generator
 * Domain Path:       /languages
 * Requires at least: 6.4
 * Requires PHP:      8.1
 */

if ( ! defined( 'WPINC' ) ) {
    die; // Prevent direct file access
}

define( 'AATG_VERSION', '1.0.0' );
define( 'AATG_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'AATG_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once AATG_PLUGIN_DIR . 'includes/class-aatg-plugin.php';

register_activation_hook( __FILE__, array( 'AATG_Plugin', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'AATG_Plugin', 'deactivate' ) );

AATG_Plugin::get_instance();
```
