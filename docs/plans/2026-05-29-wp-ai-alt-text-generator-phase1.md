# AI Alt Text Generator — Phase 1 Implementation Plan (PHP Core)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, shippable WordPress plugin that generates alt text for images using AI — with a PHP/Settings-API admin (React comes in Phase 2). Installable and functional on WordPress 6.4+ at the end of this plan.

**Architecture:** OOP with a Singleton main class loading focused dependency classes. An AI Provider router detects WordPress 7.0's native `wp_ai_client()` via injectable backend selection and falls back to a direct OpenAI client on WP 6.x. A REST API endpoint exposes generation; media hooks and a bulk admin page consume it. Pure logic (prompt building, request/response shaping, orchestration) is unit-tested with PHPUnit + Brain Monkey (mocks WP functions); WP integration is verified manually in a real install.

**Tech Stack:** PHP 8.1+ (dev machine has 8.5.3), WordPress 6.4+, Composer (dev deps only — plugin ships without vendor/), PHPUnit 11.5, Brain Monkey 2.6, yoast/phpunit-polyfills.

**Spec:** `docs/specs/2026-05-29-wp-ai-alt-text-generator-design.md`

**Plugin location:** `E:/dev/02-wordpress/ai-alt-text-generator` (folder name = WP.org slug, required for WordPress to recognize it).

---

## Why this structure (read before starting)

- **Composer is dev-only.** The plugin ships to WP.org WITHOUT a `vendor/` folder. Composer installs PHPUnit/Brain Monkey for testing only. The plugin loads its own classes with manual `require_once` inside the Singleton's `load_dependencies()`. This is the most WP.org-friendly approach — reviewers dislike bundled production dependencies.
- **Prefix `AATG_`, no namespaces.** Matches the spec and WP-ecosystem norm. Every class, function, constant is prefixed to avoid collisions with other plugins.
- **File naming `class-aatg-{name}.php`.** WordPress convention: lowercase, hyphenated, `class-` prefix. Class `AATG_OpenAI` lives in `class-aatg-openai.php`.
- **Testable seams via dependency injection.** Brain Monkey cannot intercept PHP built-ins like `function_exists()` in non-namespaced code. So the version detection is injected (constructor accepts an explicit backend), making both code paths unit-testable. Only the one-line auto-detect default is verified manually.

---

## File Structure (Phase 1)

```
E:/dev/02-wordpress/ai-alt-text-generator/
├── ai-alt-text-generator.php       ← Main file: header + bootstrap (Task 2)
├── uninstall.php                   ← Cleanup on delete (Task 10)
├── readme.txt                      ← WP.org listing (Task 10)
├── composer.json                   ← Dev deps only (Task 1)
├── phpunit.xml                     ← Test config (Task 1)
├── .gitignore                      ← Ignore vendor/, node_modules/ (Task 1)
├── languages/
│   └── ai-alt-text-generator.pot   ← Translation template (Task 10)
├── includes/
│   ├── class-aatg-plugin.php       ← Singleton, loads deps, registers hooks (Task 2)
│   ├── class-aatg-openai.php       ← OpenAI client (Task 3)
│   ├── class-aatg-ai-provider.php  ← Router: WP connector vs OpenAI (Task 4)
│   ├── class-aatg-generator.php    ← Orchestration → postmeta (Task 5)
│   ├── class-aatg-rest-api.php     ← REST routes + handlers (Task 6)
│   ├── class-aatg-settings.php     ← Settings API registration (Task 7)
│   └── class-aatg-media.php        ← Media hooks: auto-gen + classic button (Task 8)
├── admin/
│   ├── class-aatg-admin.php        ← Menus, asset enqueue (Tasks 7, 9)
│   ├── views/
│   │   ├── settings-page.php       ← Settings page template (Task 7)
│   │   └── bulk-page.php           ← Bulk generator template (Task 9)
│   ├── js/
│   │   └── aatg-bulk.js            ← Bulk progress logic (Task 9)
│   └── css/
│       └── aatg-admin.css          ← Admin styles (Task 9)
└── tests/
    ├── bootstrap.php               ← Loads classes + WP stubs (Task 1)
    ├── TestCase.php                ← Base test case w/ Brain Monkey (Task 1)
    ├── test-openai.php             ← (Task 3)
    ├── test-ai-provider.php        ← (Task 4)
    ├── test-generator.php          ← (Task 5)
    ├── test-rest-api.php           ← (Task 6)
    └── test-settings.php           ← (Task 7)
```

---

## Task 1: Project scaffold + test tooling

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/composer.json`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/phpunit.xml`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/.gitignore`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/bootstrap.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/TestCase.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-smoke.php`

- [ ] **Step 1: Create the plugin directory and init git**

```bash
mkdir -p "E:/dev/02-wordpress/ai-alt-text-generator/tests"
cd "E:/dev/02-wordpress/ai-alt-text-generator"
git init
```

- [ ] **Step 2: Create `composer.json`**

This declares dev-only dependencies. `autoload-dev` maps the test namespace; the plugin's own classes are loaded by `tests/bootstrap.php`, not Composer.

```json
{
  "name": "nickgranados/ai-alt-text-generator",
  "description": "Automatically generate descriptive alt text for images using AI.",
  "type": "wordpress-plugin",
  "license": "GPL-2.0-or-later",
  "require": {
    "php": ">=8.1"
  },
  "require-dev": {
    "phpunit/phpunit": "^11.5",
    "brain/monkey": "^2.6",
    "yoast/phpunit-polyfills": "^3.0"
  },
  "scripts": {
    "test": "phpunit"
  },
  "config": {
    "allow-plugins": {
      "dealerdirect/phpcodesniffer-composer-installer": true
    }
  }
}
```

- [ ] **Step 3: Create `.gitignore`**

```gitignore
/vendor/
/node_modules/
/build/
.phpunit.result.cache
.DS_Store
```

- [ ] **Step 4: Install dev dependencies**

```bash
cd "E:/dev/02-wordpress/ai-alt-text-generator"
composer install --no-interaction
```

Expected: `vendor/` created, `Generating autoload files` printed. Composer may print PHP 8.5 deprecation notices about `E_STRICT`/`curl_close` — those come from Composer itself, not our packages. Ignore them.

- [ ] **Step 5: Create `phpunit.xml`**

```xml
<?xml version="1.0"?>
<phpunit
    bootstrap="tests/bootstrap.php"
    colors="true"
    failOnWarning="true"
    failOnDeprecation="false">
  <testsuites>
    <testsuite name="unit">
      <directory>tests</directory>
    </testsuite>
  </testsuites>
</phpunit>
```

> **Why `failOnDeprecation="false"`:** PHP 8.5 emits deprecation notices from some test-tooling internals. We don't want those to fail our suite. Our own code must still be clean.

- [ ] **Step 6: Create `tests/bootstrap.php`**

Brain Monkey mocks WP *functions*, but it does not provide WP *classes* or *constants*. Our code references `WP_Error`, `WP_REST_Request`, `WP_REST_Server`, and `WPINC`. We define minimal stubs here so classes can load in isolation.

```php
<?php
/**
 * PHPUnit bootstrap — loads Composer autoloader (for Brain Monkey),
 * defines minimal WordPress stubs, and loads the plugin's classes.
 */

require_once __DIR__ . '/../vendor/autoload.php';

// --- Minimal WordPress constant stubs ---
if ( ! defined( 'WPINC' ) ) {
    define( 'WPINC', 'wp-includes' );
}
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

// --- Minimal WP_Error stub (mimics the real class surface we use) ---
if ( ! class_exists( 'WP_Error' ) ) {
    class WP_Error {
        public $errors = array();
        public $error_data = array();
        public function __construct( $code = '', $message = '', $data = '' ) {
            if ( '' !== $code ) {
                $this->errors[ $code ][] = $message;
                if ( '' !== $data ) {
                    $this->error_data[ $code ] = $data;
                }
            }
        }
        public function get_error_message() {
            $codes = array_keys( $this->errors );
            return $codes ? $this->errors[ $codes[0] ][0] : '';
        }
        public function get_error_code() {
            $codes = array_keys( $this->errors );
            return $codes ? $codes[0] : '';
        }
    }
}

// --- WP_REST classes are only type hints in our code; stub them minimally ---
if ( ! class_exists( 'WP_REST_Request' ) ) {
    class WP_REST_Request {
        private $params = array();
        public function set_param( $key, $value ) { $this->params[ $key ] = $value; }
        public function get_param( $key ) { return $this->params[ $key ] ?? null; }
    }
}
if ( ! class_exists( 'WP_REST_Server' ) ) {
    class WP_REST_Server {
        const READABLE  = 'GET';
        const CREATABLE = 'POST';
    }
}

// --- Load the plugin classes under test ---
$includes = __DIR__ . '/../includes/';
foreach ( array(
    'class-aatg-openai.php',
    'class-aatg-ai-provider.php',
    'class-aatg-generator.php',
    'class-aatg-rest-api.php',
    'class-aatg-settings.php',
) as $file ) {
    if ( file_exists( $includes . $file ) ) {
        require_once $includes . $file;
    }
}
```

> **Why load classes conditionally (`file_exists`):** during TDD, a class may not exist yet when an earlier task's tests run. The guard keeps the bootstrap from fatal-erroring before later tasks create those files.

- [ ] **Step 7: Create `tests/TestCase.php`**

A shared base class that wires Brain Monkey's setUp/tearDown so every test can mock WP functions.

```php
<?php
namespace AATG\Tests;

use Brain\Monkey;
use Yoast\PHPUnitPolyfills\TestCases\TestCase as PolyfillTestCase;

abstract class TestCase extends PolyfillTestCase {
    protected function set_up() {
        parent::set_up();
        Monkey\setUp();
    }
    protected function tear_down() {
        Monkey\tearDown();
        parent::tear_down();
    }
}
```

> **Why `yoast/phpunit-polyfills`:** it provides `set_up()`/`tear_down()` (snake_case) that work across PHPUnit versions, so the suite won't break when PHPUnit changes method signatures. WordPress core's own test suite uses these polyfills.

- [ ] **Step 8: Create a smoke test `tests/test-smoke.php`**

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class SmokeTest extends TestCase {
    public function test_brain_monkey_mocks_wp_functions() {
        Functions\when( 'get_option' )->justReturn( 'gpt-4o-mini' );
        $this->assertSame( 'gpt-4o-mini', get_option( 'aatg_model' ) );
    }
}
```

- [ ] **Step 9: Run the smoke test to confirm the toolchain**

```bash
cd "E:/dev/02-wordpress/ai-alt-text-generator"
./vendor/bin/phpunit
```

Expected: `OK (1 test, 1 assertion)`.

- [ ] **Step 10: Commit**

```bash
cd "E:/dev/02-wordpress/ai-alt-text-generator"
git add composer.json composer.lock phpunit.xml .gitignore tests/
git commit -m "chore: scaffold plugin with PHPUnit + Brain Monkey test tooling"
```

---

## Task 2: Plugin bootstrap + Singleton main class

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/ai-alt-text-generator.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-plugin.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-plugin.php`

- [ ] **Step 1: Write the failing test for the Singleton**

`tests/test-plugin.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class PluginTest extends TestCase {

    public function test_get_instance_returns_same_object() {
        // AATG_Plugin constructor calls load_dependencies() + register_hooks();
        // register_hooks() calls add_action(), so stub those WP functions.
        Functions\when( 'add_action' )->justReturn( true );
        Functions\when( 'plugin_dir_path' )->justReturn( '/tmp/' );
        Functions\when( 'plugin_dir_url' )->justReturn( 'http://x/' );

        $a = \AATG_Plugin::get_instance();
        $b = \AATG_Plugin::get_instance();

        $this->assertSame( $a, $b, 'Singleton must return the same instance' );
    }
}
```

- [ ] **Step 2: Add the plugin class to the test bootstrap**

In `tests/bootstrap.php`, add `'class-aatg-plugin.php'` to the `foreach` array of files to load (after the others is fine).

```php
foreach ( array(
    'class-aatg-openai.php',
    'class-aatg-ai-provider.php',
    'class-aatg-generator.php',
    'class-aatg-rest-api.php',
    'class-aatg-settings.php',
    'class-aatg-plugin.php',
) as $file ) {
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
./vendor/bin/phpunit --filter PluginTest
```

Expected: FAIL — `Error: Class "AATG_Plugin" not found`.

- [ ] **Step 4: Create the Singleton class**

`includes/class-aatg-plugin.php`:

```php
<?php
/**
 * Main plugin class — Singleton.
 *
 * Loads all dependency classes and registers WordPress hooks exactly once.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_Plugin {

    /** @var AATG_Plugin|null The single instance. */
    private static $instance = null;

    /** Private constructor prevents `new AATG_Plugin()` from outside. */
    private function __construct() {
        $this->load_dependencies();
        $this->register_hooks();
    }

    /** Single access point. Creates the instance on first call. */
    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /** Load class files. Guarded so unit tests (which preload them) don't double-require. */
    private function load_dependencies() {
        if ( ! defined( 'AATG_PLUGIN_DIR' ) ) {
            return; // In unit tests the classes are already loaded by bootstrap.php.
        }
        require_once AATG_PLUGIN_DIR . 'includes/class-aatg-openai.php';
        require_once AATG_PLUGIN_DIR . 'includes/class-aatg-ai-provider.php';
        require_once AATG_PLUGIN_DIR . 'includes/class-aatg-generator.php';
        require_once AATG_PLUGIN_DIR . 'includes/class-aatg-rest-api.php';
        require_once AATG_PLUGIN_DIR . 'includes/class-aatg-settings.php';
        require_once AATG_PLUGIN_DIR . 'includes/class-aatg-media.php';
        require_once AATG_PLUGIN_DIR . 'admin/class-aatg-admin.php';
    }

    /** Wire up WordPress hooks for each subsystem. */
    private function register_hooks() {
        // REST routes.
        $rest = new AATG_REST_API();
        add_action( 'rest_api_init', array( $rest, 'register_routes' ) );

        // Settings.
        $settings = new AATG_Settings();
        add_action( 'admin_init', array( $settings, 'register' ) );

        // Admin menus + assets.
        if ( is_admin() ) {
            $admin = new AATG_Admin();
            add_action( 'admin_menu', array( $admin, 'register_menus' ) );
            add_action( 'admin_enqueue_scripts', array( $admin, 'enqueue_assets' ) );
        }

        // Media hooks.
        $media = new AATG_Media();
        add_action( 'add_attachment', array( $media, 'maybe_auto_generate' ) );
        add_filter( 'attachment_fields_to_edit', array( $media, 'add_generate_button' ), 10, 2 );
    }

    /** Runs on activation: set default options. */
    public static function activate() {
        add_option( 'aatg_model', 'gpt-4o-mini' );
        add_option( 'aatg_language', 'auto' );
        add_option( 'aatg_auto_generate', false );
    }

    /** Runs on deactivation. No persistent cleanup here (that's uninstall.php). */
    public static function deactivate() {
        // Intentionally empty for v1.
    }
}
```

> **Why guard `load_dependencies()` with `defined('AATG_PLUGIN_DIR')`:** in unit tests the classes are already loaded by `bootstrap.php` and `AATG_PLUGIN_DIR` is never defined, so we skip the production requires and avoid "cannot redeclare class" fatals.

- [ ] **Step 5: Run the test to verify it passes**

```bash
./vendor/bin/phpunit --filter PluginTest
```

Expected: `OK (1 test, ...)`. (The `register_hooks()` body `new AATG_REST_API()` etc. will only run when those classes exist — they're created in later tasks. To keep this task green now, temporarily the `register_hooks()` instantiations of not-yet-created classes would fatal. See Step 6.)

- [ ] **Step 6: Make register_hooks resilient during incremental build**

Until Tasks 6–8 create the other classes, guard each instantiation with `class_exists()` so the Singleton test passes mid-build. Replace `register_hooks()` body with:

```php
    private function register_hooks() {
        if ( class_exists( 'AATG_REST_API' ) ) {
            $rest = new AATG_REST_API();
            add_action( 'rest_api_init', array( $rest, 'register_routes' ) );
        }
        if ( class_exists( 'AATG_Settings' ) ) {
            $settings = new AATG_Settings();
            add_action( 'admin_init', array( $settings, 'register' ) );
        }
        if ( is_admin() && class_exists( 'AATG_Admin' ) ) {
            $admin = new AATG_Admin();
            add_action( 'admin_menu', array( $admin, 'register_menus' ) );
            add_action( 'admin_enqueue_scripts', array( $admin, 'enqueue_assets' ) );
        }
        if ( class_exists( 'AATG_Media' ) ) {
            $media = new AATG_Media();
            add_action( 'add_attachment', array( $media, 'maybe_auto_generate' ) );
            add_filter( 'attachment_fields_to_edit', array( $media, 'add_generate_button' ), 10, 2 );
        }
    }
```

Add `Functions\when( 'add_filter' )->justReturn( true );` and `Functions\when( 'is_admin' )->justReturn( false );` to the test's stubs so the new calls are covered.

- [ ] **Step 7: Run the test again**

```bash
./vendor/bin/phpunit --filter PluginTest
```

Expected: `OK`.

- [ ] **Step 8: Create the main plugin file**

`ai-alt-text-generator.php`:

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
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

define( 'AATG_VERSION', '1.0.0' );
define( 'AATG_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'AATG_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'AATG_PLUGIN_FILE', __FILE__ );

require_once AATG_PLUGIN_DIR . 'includes/class-aatg-plugin.php';

register_activation_hook( __FILE__, array( 'AATG_Plugin', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'AATG_Plugin', 'deactivate' ) );

AATG_Plugin::get_instance();
```

- [ ] **Step 9: Commit**

```bash
git add ai-alt-text-generator.php includes/class-aatg-plugin.php tests/test-plugin.php tests/bootstrap.php
git commit -m "feat: add plugin bootstrap and Singleton main class"
```

---

## Task 3: OpenAI client (WP 6.x fallback)

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-openai.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-openai.php`

The client has three methods. Two are PURE (no WP calls) and fully unit-tested: `build_request_body()` and `parse_response()`. The third, `request()`, uses `wp_remote_post()` and is tested with Brain Monkey mocks.

- [ ] **Step 1: Write failing tests**

`tests/test-openai.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class OpenAITest extends TestCase {

    public function test_build_request_body_includes_model_and_image() {
        $client = new \AATG_OpenAI();
        $body   = $client->build_request_body( 'https://x/img.jpg', 'Describe this.', 'gpt-4o-mini' );

        $this->assertSame( 'gpt-4o-mini', $body['model'] );
        $this->assertSame( 'Describe this.', $body['messages'][0]['content'][0]['text'] );
        $this->assertSame( 'https://x/img.jpg', $body['messages'][0]['content'][1]['image_url']['url'] );
    }

    public function test_parse_response_returns_text_on_success() {
        $client = new \AATG_OpenAI();
        $data   = array( 'choices' => array( array( 'message' => array( 'content' => 'A red apple.' ) ) ) );

        $this->assertSame( 'A red apple.', $client->parse_response( $data ) );
    }

    public function test_parse_response_returns_wp_error_on_api_error() {
        $client = new \AATG_OpenAI();
        $data   = array( 'error' => array( 'message' => 'Invalid API key' ) );

        $result = $client->parse_response( $data );
        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertSame( 'Invalid API key', $result->get_error_message() );
    }
}
```

- [ ] **Step 2: Run to verify failure**

```bash
./vendor/bin/phpunit --filter OpenAITest
```

Expected: FAIL — `Class "AATG_OpenAI" not found`.

- [ ] **Step 3: Create the OpenAI client**

`includes/class-aatg-openai.php`:

```php
<?php
/**
 * OpenAI API client. Used on WordPress < 7.0 (no native AI Connectors).
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_OpenAI {

    const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

    /**
     * Build the JSON request payload for the vision chat completion.
     * Pure function — no WordPress calls, fully unit-testable.
     *
     * @param string $image_url Public URL of the image.
     * @param string $prompt    Instruction text.
     * @param string $model     Model id, e.g. gpt-4o-mini.
     * @return array
     */
    public function build_request_body( $image_url, $prompt, $model ) {
        return array(
            'model'      => $model,
            'max_tokens' => 150,
            'messages'   => array(
                array(
                    'role'    => 'user',
                    'content' => array(
                        array( 'type' => 'text', 'text' => $prompt ),
                        array( 'type' => 'image_url', 'image_url' => array( 'url' => $image_url ) ),
                    ),
                ),
            ),
        );
    }

    /**
     * Parse the decoded OpenAI response into alt text or a WP_Error.
     * Pure function — fully unit-testable.
     *
     * @param array $data Decoded JSON response.
     * @return string|WP_Error
     */
    public function parse_response( $data ) {
        if ( isset( $data['error']['message'] ) ) {
            return new WP_Error( 'aatg_openai_error', $data['error']['message'] );
        }
        $text = $data['choices'][0]['message']['content'] ?? '';
        if ( '' === $text ) {
            return new WP_Error( 'aatg_empty_response', __( 'OpenAI returned an empty response.', 'ai-alt-text-generator' ) );
        }
        return trim( $text );
    }

    /**
     * Perform the HTTP request to OpenAI. Uses wp_remote_post (WP standard,
     * never raw cURL). Reads the API key + model from options.
     *
     * @param string $image_url Public image URL.
     * @param string $prompt    Instruction text.
     * @return string|WP_Error
     */
    public function request( $image_url, $prompt ) {
        $api_key = get_option( 'aatg_openai_api_key', '' );
        if ( empty( $api_key ) ) {
            return new WP_Error( 'aatg_no_api_key', __( 'OpenAI API key is not configured.', 'ai-alt-text-generator' ) );
        }
        $model = get_option( 'aatg_model', 'gpt-4o-mini' );

        $response = wp_remote_post(
            self::ENDPOINT,
            array(
                'timeout' => 30,
                'headers' => array(
                    'Authorization' => 'Bearer ' . $api_key,
                    'Content-Type'  => 'application/json',
                ),
                'body'    => wp_json_encode( $this->build_request_body( $image_url, $prompt, $model ) ),
            )
        );

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $data = json_decode( wp_remote_retrieve_body( $response ), true );
        return $this->parse_response( is_array( $data ) ? $data : array() );
    }
}
```

> **Why `__()` needs no real WordPress here:** Brain Monkey's `TestCase` auto-stubs common i18n functions (`__`, `_e`, `esc_html__`) to return their first argument. If a test calls a method that uses `__()`, it works. (Confirmed by Brain Monkey docs — `Functions` namespace passes through undefined function calls to no-ops/first-arg returns when set up; if a specific test needs it, add `Functions\when('__')->returnArg(1);`.)

- [ ] **Step 4: Run tests to verify they pass**

```bash
./vendor/bin/phpunit --filter OpenAITest
```

Expected: `OK (3 tests, ...)`. If `parse_response` test errors on `__()` undefined, add to the test's `set_up` or top of each test: `Functions\when( '__' )->returnArg( 1 );`.

- [ ] **Step 5: Commit**

```bash
git add includes/class-aatg-openai.php tests/test-openai.php
git commit -m "feat: add OpenAI client with unit-tested request/response shaping"
```

---

## Task 4: AI Provider router (WP 7.0 detection + fallback)

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-ai-provider.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-ai-provider.php`

The router picks the backend. Because Brain Monkey cannot intercept `function_exists()` in non-namespaced code, the chosen backend is **injectable**: the constructor accepts `'openai'`, `'wp_connector'`, or `null` (auto-detect). Tests exercise both explicit paths; the one-line auto-detect default is verified manually in Task 10.

- [ ] **Step 1: Write failing tests**

`tests/test-ai-provider.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class AIProviderTest extends TestCase {

    protected function set_up() {
        parent::set_up();
        Functions\when( '__' )->returnArg( 1 );
    }

    public function test_build_prompt_auto_language() {
        $provider = new \AATG_AI_Provider( 'openai' );
        $prompt   = $provider->build_prompt( 'auto' );

        $this->assertStringContainsString( '125 characters', $prompt );
        $this->assertStringContainsString( 'same language as the website', $prompt );
    }

    public function test_build_prompt_specific_language() {
        $provider = new \AATG_AI_Provider( 'openai' );
        $prompt   = $provider->build_prompt( 'Spanish' );

        $this->assertStringContainsString( 'in Spanish', $prompt );
    }

    public function test_generate_uses_openai_backend_when_selected() {
        // Stub the option reads the OpenAI client performs.
        Functions\when( 'get_option' )->justReturn( 'sk-test' );
        // Mock wp_remote_post to return a canned OpenAI success body.
        Functions\when( 'wp_remote_post' )->justReturn( array( 'body' => '{}' ) );
        Functions\when( 'is_wp_error' )->justReturn( false );
        Functions\when( 'wp_remote_retrieve_body' )->justReturn(
            wp_json_encode_stub( array( 'choices' => array( array( 'message' => array( 'content' => 'A cat.' ) ) ) ) )
        );
        Functions\when( 'wp_json_encode' )->alias( 'json_encode' );

        $provider = new \AATG_AI_Provider( 'openai' );
        $result   = $provider->generate( 'https://x/cat.jpg', 'auto' );

        $this->assertSame( 'A cat.', $result );
    }
}

/** Tiny helper so the test file can build JSON without WP. */
function wp_json_encode_stub( $data ) {
    return json_encode( $data );
}
```

- [ ] **Step 2: Run to verify failure**

```bash
./vendor/bin/phpunit --filter AIProviderTest
```

Expected: FAIL — `Class "AATG_AI_Provider" not found`.

- [ ] **Step 3: Create the provider**

`includes/class-aatg-ai-provider.php`:

```php
<?php
/**
 * AI Provider router.
 *
 * Chooses between WordPress 7.0's native AI Connectors (wp_ai_client) and a
 * direct OpenAI client. The backend is injectable so both paths are testable;
 * passing null auto-detects based on WordPress capabilities.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_AI_Provider {

    /** @var string 'wp_connector'|'openai' */
    private $backend;

    /**
     * @param string|null $backend Force a backend, or null to auto-detect.
     */
    public function __construct( $backend = null ) {
        $this->backend = $backend ?? self::detect_backend();
    }

    /**
     * Auto-detect: prefer WP 7.0 native client if present.
     * NOT unit-tested (function_exists cannot be mocked here) — verified manually.
     *
     * @return string
     */
    public static function detect_backend() {
        return function_exists( 'wp_ai_client' ) ? 'wp_connector' : 'openai';
    }

    /**
     * Build the instruction prompt. Pure — fully unit-testable.
     *
     * @param string $language 'auto' or a language name.
     * @return string
     */
    public function build_prompt( $language ) {
        $lang = ( 'auto' === $language )
            ? __( 'Use the same language as the website.', 'ai-alt-text-generator' )
            : sprintf(
                /* translators: %s is a language name. */
                __( 'Write the alt text in %s.', 'ai-alt-text-generator' ),
                $language
            );

        return sprintf(
            /* translators: %s is the language instruction. */
            __( 'Generate a concise, descriptive alt text for this image. Maximum 125 characters. %s Return only the alt text, no quotes.', 'ai-alt-text-generator' ),
            $lang
        );
    }

    /**
     * Generate alt text for an image URL using the selected backend.
     *
     * @param string $image_url Public image URL.
     * @param string $language  Language preference.
     * @return string|WP_Error
     */
    public function generate( $image_url, $language = 'auto' ) {
        $prompt = $this->build_prompt( $language );

        if ( 'wp_connector' === $this->backend ) {
            return $this->generate_via_connector( $image_url, $prompt );
        }
        return $this->generate_via_openai( $image_url, $prompt );
    }

    /** WP 6.x path. */
    private function generate_via_openai( $image_url, $prompt ) {
        $client = new AATG_OpenAI();
        return $client->request( $image_url, $prompt );
    }

    /** WP 7.0+ path — uses the native AI Connectors client. */
    private function generate_via_connector( $image_url, $prompt ) {
        $client = wp_ai_client();
        $response = $client->get_chat_completion(
            array(
                'messages' => array(
                    array(
                        'role'    => 'user',
                        'content' => array(
                            array( 'type' => 'text', 'text' => $prompt ),
                            array( 'type' => 'image_url', 'image_url' => array( 'url' => $image_url ) ),
                        ),
                    ),
                ),
            )
        );
        if ( is_wp_error( $response ) ) {
            return $response;
        }
        return trim( $response->get_text() );
    }
}
```

> **Why inject the backend:** it turns an untestable `if ( function_exists(...) )` branch into two independently testable methods. The DI pattern (pass the dependency in rather than hard-coding it) is exactly what makes code testable — a transferable lesson beyond WordPress.

- [ ] **Step 4: Run tests to verify they pass**

```bash
./vendor/bin/phpunit --filter AIProviderTest
```

Expected: `OK (3 tests, ...)`.

- [ ] **Step 5: Commit**

```bash
git add includes/class-aatg-ai-provider.php tests/test-ai-provider.php
git commit -m "feat: add AI provider router with injectable backend and prompt builder"
```

---

## Task 5: Generator (orchestration → postmeta)

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-generator.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-generator.php`

The generator ties it together: resolve the image URL, call the provider, save to `_wp_attachment_image_alt`. The provider is injectable so we can pass a fake in tests.

- [ ] **Step 1: Write failing tests**

`tests/test-generator.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class GeneratorTest extends TestCase {

    protected function set_up() {
        parent::set_up();
        Functions\when( '__' )->returnArg( 1 );
    }

    public function test_generate_for_image_saves_alt_text() {
        Functions\when( 'wp_get_attachment_url' )->justReturn( 'https://x/img.jpg' );
        Functions\when( 'get_option' )->justReturn( 'auto' );
        Functions\when( 'sanitize_text_field' )->returnArg( 1 );

        // Expect the alt text to be saved to the correct postmeta key.
        Functions\expect( 'update_post_meta' )
            ->once()
            ->with( 123, '_wp_attachment_image_alt', 'A red apple.' )
            ->andReturn( true );

        // Fake provider that returns a fixed string.
        $provider = new class {
            public function generate( $url, $lang ) { return 'A red apple.'; }
        };

        $generator = new \AATG_Generator( $provider );
        $result    = $generator->generate_for_image( 123 );

        $this->assertSame( 'A red apple.', $result );
    }

    public function test_generate_for_image_invalid_id_returns_error() {
        Functions\when( 'wp_get_attachment_url' )->justReturn( false );

        $provider  = new class { public function generate( $u, $l ) { return 'x'; } };
        $generator = new \AATG_Generator( $provider );
        $result    = $generator->generate_for_image( 999 );

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertSame( 'aatg_invalid_image', $result->get_error_code() );
    }
}
```

> **Why a fake provider (anonymous class) instead of mocking the real one:** the generator only needs *something* with a `generate()` method. Injecting a fake keeps the test focused on orchestration (does it save correctly?) without involving HTTP or the real provider.

- [ ] **Step 2: Run to verify failure**

```bash
./vendor/bin/phpunit --filter GeneratorTest
```

Expected: FAIL — `Class "AATG_Generator" not found`.

- [ ] **Step 3: Create the generator**

`includes/class-aatg-generator.php`:

```php
<?php
/**
 * Generator — orchestrates: resolve image URL → call provider → save alt text.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_Generator {

    /** @var object Anything with a generate( $url, $language ) method. */
    private $provider;

    /**
     * @param object|null $provider Inject a provider; defaults to AATG_AI_Provider.
     */
    public function __construct( $provider = null ) {
        $this->provider = $provider ?? new AATG_AI_Provider();
    }

    /**
     * Generate and SAVE alt text for an attachment ID.
     *
     * @param int $image_id Attachment post ID.
     * @return string|WP_Error The generated alt text, or error.
     */
    public function generate_for_image( $image_id ) {
        $image_url = wp_get_attachment_url( $image_id );
        if ( ! $image_url ) {
            return new WP_Error( 'aatg_invalid_image', __( 'Image not found.', 'ai-alt-text-generator' ) );
        }

        $alt = $this->generate_for_url( $image_url );
        if ( is_wp_error( $alt ) ) {
            return $alt;
        }

        update_post_meta( $image_id, '_wp_attachment_image_alt', sanitize_text_field( $alt ) );
        return $alt;
    }

    /**
     * Generate alt text for a raw URL WITHOUT saving (no post ID).
     *
     * @param string $image_url Public image URL.
     * @return string|WP_Error
     */
    public function generate_for_url( $image_url ) {
        $language = get_option( 'aatg_language', 'auto' );
        return $this->provider->generate( $image_url, $language );
    }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
./vendor/bin/phpunit --filter GeneratorTest
```

Expected: `OK (2 tests, ...)`.

- [ ] **Step 5: Commit**

```bash
git add includes/class-aatg-generator.php tests/test-generator.php
git commit -m "feat: add generator orchestration with injectable provider"
```

---

## Task 6: REST API endpoint

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-rest-api.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-rest-api.php`

Endpoint `POST /wp-json/ai-alt-text/v1/generate`. Accepts `image_id` (saves) or `image_url` (returns only). Permission: `upload_files`.

- [ ] **Step 1: Write failing tests**

`tests/test-rest-api.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class RestApiTest extends TestCase {

    protected function set_up() {
        parent::set_up();
        Functions\when( '__' )->returnArg( 1 );
        Functions\when( 'rest_ensure_response' )->returnArg( 1 );
    }

    public function test_permission_requires_upload_files_cap() {
        $api = new \AATG_REST_API();

        Functions\when( 'current_user_can' )->justReturn( true );
        $this->assertTrue( $api->check_permission() );

        Functions\when( 'current_user_can' )->justReturn( false );
        $this->assertFalse( $api->check_permission() );
    }

    public function test_handle_generate_with_image_id_saves_and_returns() {
        // Fake generator injected via setter.
        $fake = new class {
            public function generate_for_image( $id ) { return 'Alt for ' . $id; }
            public function generate_for_url( $url ) { return 'Alt for url'; }
        };
        $api = new \AATG_REST_API( $fake );

        $request = new \WP_REST_Request();
        $request->set_param( 'image_id', 55 );

        $response = $api->handle_generate( $request );
        $this->assertSame( 'Alt for 55', $response['alt_text'] );
        $this->assertSame( 55, $response['image_id'] );
        $this->assertTrue( $response['saved'] );
    }

    public function test_handle_generate_with_url_only_does_not_save() {
        $fake = new class {
            public function generate_for_image( $id ) { return 'x'; }
            public function generate_for_url( $url ) { return 'Alt for url'; }
        };
        $api = new \AATG_REST_API( $fake );

        $request = new \WP_REST_Request();
        $request->set_param( 'image_url', 'https://x/y.jpg' );

        $response = $api->handle_generate( $request );
        $this->assertSame( 'Alt for url', $response['alt_text'] );
        $this->assertNull( $response['image_id'] );
        $this->assertFalse( $response['saved'] );
    }
}
```

- [ ] **Step 2: Run to verify failure**

```bash
./vendor/bin/phpunit --filter RestApiTest
```

Expected: FAIL — `Class "AATG_REST_API" not found`.

- [ ] **Step 3: Create the REST controller**

`includes/class-aatg-rest-api.php`:

```php
<?php
/**
 * REST API controller for alt text generation.
 *
 * Route: POST /wp-json/ai-alt-text/v1/generate
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_REST_API {

    const NAMESPACE = 'ai-alt-text/v1';

    /** @var object Generator with generate_for_image()/generate_for_url(). */
    private $generator;

    public function __construct( $generator = null ) {
        $this->generator = $generator; // Lazily created in handle_generate if null.
    }

    /** Register the REST route. Hooked to rest_api_init. */
    public function register_routes() {
        register_rest_route(
            self::NAMESPACE,
            '/generate',
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'handle_generate' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'image_id'  => array(
                        'type'              => 'integer',
                        'required'          => false,
                        'sanitize_callback' => 'absint',
                    ),
                    'image_url' => array(
                        'type'              => 'string',
                        'required'          => false,
                        'sanitize_callback' => 'esc_url_raw',
                    ),
                ),
            )
        );
    }

    /** Only users who can upload files may generate. */
    public function check_permission() {
        return current_user_can( 'upload_files' );
    }

    /**
     * Handle the request. With image_id → save; with image_url → return only.
     *
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public function handle_generate( $request ) {
        $generator = $this->generator ?? new AATG_Generator();

        $image_id  = $request->get_param( 'image_id' );
        $image_url = $request->get_param( 'image_url' );

        if ( $image_id ) {
            $alt = $generator->generate_for_image( (int) $image_id );
            $saved = true;
            $resolved_id = (int) $image_id;
        } elseif ( $image_url ) {
            $alt = $generator->generate_for_url( $image_url );
            $saved = false;
            $resolved_id = null;
        } else {
            return new WP_Error(
                'aatg_missing_param',
                __( 'Provide image_id or image_url.', 'ai-alt-text-generator' ),
                array( 'status' => 400 )
            );
        }

        if ( is_wp_error( $alt ) ) {
            return $alt;
        }

        return rest_ensure_response(
            array(
                'alt_text' => $alt,
                'image_id' => $resolved_id,
                'saved'    => $saved,
            )
        );
    }
}
```

> **Why `absint` and `esc_url_raw` as sanitize callbacks:** WordPress runs these on each param BEFORE your handler sees it. `absint` forces a positive integer (defangs injection in `image_id`); `esc_url_raw` strips dangerous characters from the URL. Sanitizing at the route definition is the WP-idiomatic place to do it.

- [ ] **Step 4: Run tests to verify they pass**

```bash
./vendor/bin/phpunit --filter RestApiTest
```

Expected: `OK (3 tests, ...)`.

- [ ] **Step 5: Commit**

```bash
git add includes/class-aatg-rest-api.php tests/test-rest-api.php
git commit -m "feat: add REST API endpoint for alt text generation"
```

---

## Task 7: Settings (PHP Settings API, adaptive UI)

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-settings.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/admin/class-aatg-admin.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/admin/views/settings-page.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-settings.php`

- [ ] **Step 1: Write failing tests for sanitization**

`tests/test-settings.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class SettingsTest extends TestCase {

    public function test_sanitize_model_allows_known_models() {
        $settings = new \AATG_Settings();
        $this->assertSame( 'gpt-4o-mini', $settings->sanitize_model( 'gpt-4o-mini' ) );
        $this->assertSame( 'gpt-4o', $settings->sanitize_model( 'gpt-4o' ) );
    }

    public function test_sanitize_model_falls_back_on_unknown() {
        $settings = new \AATG_Settings();
        $this->assertSame( 'gpt-4o-mini', $settings->sanitize_model( 'evil-model' ) );
    }

    public function test_sanitize_checkbox() {
        $settings = new \AATG_Settings();
        $this->assertTrue( $settings->sanitize_checkbox( '1' ) );
        $this->assertFalse( $settings->sanitize_checkbox( null ) );
    }
}
```

- [ ] **Step 2: Run to verify failure**

```bash
./vendor/bin/phpunit --filter SettingsTest
```

Expected: FAIL — `Class "AATG_Settings" not found`.

- [ ] **Step 3: Create the Settings class**

`includes/class-aatg-settings.php`:

```php
<?php
/**
 * Settings — registers options via the WordPress Settings API.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_Settings {

    const GROUP = 'aatg_settings';

    /** Allowed model ids. */
    private function allowed_models() {
        return array( 'gpt-4o-mini', 'gpt-4o' );
    }

    /** Hooked to admin_init. */
    public function register() {
        register_setting( self::GROUP, 'aatg_openai_api_key', array( 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ) );
        register_setting( self::GROUP, 'aatg_model', array( 'sanitize_callback' => array( $this, 'sanitize_model' ), 'default' => 'gpt-4o-mini' ) );
        register_setting( self::GROUP, 'aatg_language', array( 'sanitize_callback' => 'sanitize_text_field', 'default' => 'auto' ) );
        register_setting( self::GROUP, 'aatg_auto_generate', array( 'sanitize_callback' => array( $this, 'sanitize_checkbox' ), 'default' => false ) );
    }

    /** Only allow known model ids; fall back to the cheap default. */
    public function sanitize_model( $value ) {
        return in_array( $value, $this->allowed_models(), true ) ? $value : 'gpt-4o-mini';
    }

    /** Normalize a checkbox to a real bool. */
    public function sanitize_checkbox( $value ) {
        return ! empty( $value );
    }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
./vendor/bin/phpunit --filter SettingsTest
```

Expected: `OK (3 tests, ...)`.

- [ ] **Step 5: Create the Admin class (menus + page render)**

`admin/class-aatg-admin.php`:

```php
<?php
/**
 * Admin — registers menu pages and enqueues assets.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_Admin {

    /** Hooked to admin_menu. */
    public function register_menus() {
        add_options_page(
            __( 'AI Alt Text', 'ai-alt-text-generator' ),
            __( 'AI Alt Text', 'ai-alt-text-generator' ),
            'manage_options',
            'aatg-settings',
            array( $this, 'render_settings_page' )
        );

        add_media_page(
            __( 'Bulk Alt Text', 'ai-alt-text-generator' ),
            __( 'Bulk Alt Text', 'ai-alt-text-generator' ),
            'upload_files',
            'aatg-bulk',
            array( $this, 'render_bulk_page' )
        );
    }

    /** Hooked to admin_enqueue_scripts. Loads bulk assets only on our page. */
    public function enqueue_assets( $hook ) {
        if ( 'media_page_aatg-bulk' !== $hook ) {
            return;
        }
        wp_enqueue_style( 'aatg-admin', AATG_PLUGIN_URL . 'admin/css/aatg-admin.css', array(), AATG_VERSION );
        wp_enqueue_script( 'aatg-bulk', AATG_PLUGIN_URL . 'admin/js/aatg-bulk.js', array( 'wp-api-fetch' ), AATG_VERSION, true );
    }

    public function render_settings_page() {
        require AATG_PLUGIN_DIR . 'admin/views/settings-page.php';
    }

    public function render_bulk_page() {
        require AATG_PLUGIN_DIR . 'admin/views/bulk-page.php';
    }
}
```

> **Why check `$hook` before enqueuing:** WP fires `admin_enqueue_scripts` on EVERY admin page. Loading our JS everywhere would be wasteful and could conflict. The `$hook` for a media submenu page is `media_page_{slug}`. Loading only there is the correct, polite behavior reviewers expect.

- [ ] **Step 6: Create the settings page view (adaptive)**

`admin/views/settings-page.php`:

```php
<?php
/**
 * Settings page template. Adapts based on WordPress version:
 * WP 7.0+ hides the API key (uses native Connectors); WP 6.x shows it.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

$aatg_has_connector = function_exists( 'wp_ai_client' );
?>
<div class="wrap">
    <h1><?php esc_html_e( 'AI Alt Text Generator', 'ai-alt-text-generator' ); ?></h1>

    <?php if ( $aatg_has_connector ) : ?>
        <div class="notice notice-success inline">
            <p>
                <?php esc_html_e( 'WordPress AI Connectors detected. This plugin uses your configured AI provider. Manage providers under Settings → Connectors.', 'ai-alt-text-generator' ); ?>
            </p>
        </div>
    <?php endif; ?>

    <form method="post" action="options.php">
        <?php settings_fields( 'aatg_settings' ); ?>
        <table class="form-table" role="presentation">

            <?php if ( ! $aatg_has_connector ) : ?>
            <tr>
                <th scope="row"><label for="aatg_openai_api_key"><?php esc_html_e( 'OpenAI API Key', 'ai-alt-text-generator' ); ?></label></th>
                <td>
                    <input type="password" id="aatg_openai_api_key" name="aatg_openai_api_key"
                           value="<?php echo esc_attr( get_option( 'aatg_openai_api_key', '' ) ); ?>"
                           class="regular-text" autocomplete="off" />
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="aatg_model"><?php esc_html_e( 'Model', 'ai-alt-text-generator' ); ?></label></th>
                <td>
                    <?php $aatg_model = get_option( 'aatg_model', 'gpt-4o-mini' ); ?>
                    <select id="aatg_model" name="aatg_model">
                        <option value="gpt-4o-mini" <?php selected( $aatg_model, 'gpt-4o-mini' ); ?>>gpt-4o-mini</option>
                        <option value="gpt-4o" <?php selected( $aatg_model, 'gpt-4o' ); ?>>gpt-4o</option>
                    </select>
                </td>
            </tr>
            <?php endif; ?>

            <tr>
                <th scope="row"><label for="aatg_language"><?php esc_html_e( 'Language', 'ai-alt-text-generator' ); ?></label></th>
                <td>
                    <input type="text" id="aatg_language" name="aatg_language"
                           value="<?php echo esc_attr( get_option( 'aatg_language', 'auto' ) ); ?>"
                           class="regular-text" />
                    <p class="description"><?php esc_html_e( 'Use "auto" to match the site language, or enter a language name.', 'ai-alt-text-generator' ); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row"><?php esc_html_e( 'Auto-generate', 'ai-alt-text-generator' ); ?></th>
                <td>
                    <label>
                        <input type="checkbox" name="aatg_auto_generate" value="1" <?php checked( get_option( 'aatg_auto_generate', false ) ); ?> />
                        <?php esc_html_e( 'Generate alt text automatically when an image is uploaded.', 'ai-alt-text-generator' ); ?>
                    </label>
                </td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>
</div>
```

> **Why `esc_html_e()`, `esc_attr()`, `selected()`, `checked()`:** the WP rule is *escape on output*. Every dynamic value echoed into HTML is escaped according to context: `esc_html` for text, `esc_attr` for attribute values. `selected()`/`checked()` are WP helpers that echo ` selected="selected"` / ` checked="checked"` when values match — safer than hand-writing conditionals.

- [ ] **Step 7: Commit**

```bash
git add includes/class-aatg-settings.php admin/class-aatg-admin.php admin/views/settings-page.php tests/test-settings.php
git commit -m "feat: add settings (Settings API) with adaptive WP 7.0-aware admin page"
```

---

## Task 8: Media hooks (auto-generate + classic button)

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/includes/class-aatg-media.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/admin/js/aatg-media.js`
- Modify: `E:/dev/02-wordpress/ai-alt-text-generator/admin/class-aatg-admin.php` (enqueue media JS)
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/tests/test-media.php`

- [ ] **Step 1: Write failing tests**

`tests/test-media.php`:

```php
<?php
namespace AATG\Tests;

use Brain\Monkey\Functions;

final class MediaTest extends TestCase {

    protected function set_up() {
        parent::set_up();
        Functions\when( '__' )->returnArg( 1 );
    }

    public function test_auto_generate_skips_when_option_off() {
        Functions\when( 'get_option' )->justReturn( false ); // auto_generate off
        Functions\when( 'wp_attachment_is_image' )->justReturn( true );

        $fake = new class {
            public $called = false;
            public function generate_for_image( $id ) { $this->called = true; return 'x'; }
        };
        $media = new \AATG_Media( $fake );
        $media->maybe_auto_generate( 10 );

        $this->assertFalse( $fake->called, 'Should not generate when auto_generate is off' );
    }

    public function test_auto_generate_runs_when_option_on_and_is_image() {
        Functions\when( 'get_option' )->justReturn( true ); // auto_generate on
        Functions\when( 'wp_attachment_is_image' )->justReturn( true );

        $fake = new class {
            public $called_with = null;
            public function generate_for_image( $id ) { $this->called_with = $id; return 'x'; }
        };
        $media = new \AATG_Media( $fake );
        $media->maybe_auto_generate( 42 );

        $this->assertSame( 42, $fake->called_with );
    }
}
```

- [ ] **Step 2: Run to verify failure**

```bash
./vendor/bin/phpunit --filter MediaTest
```

Expected: FAIL — `Class "AATG_Media" not found`.

- [ ] **Step 3: Create the Media class**

`includes/class-aatg-media.php`:

```php
<?php
/**
 * Media hooks — auto-generate on upload + classic Media Library button.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

class AATG_Media {

    /** @var object Generator with generate_for_image(). */
    private $generator;

    public function __construct( $generator = null ) {
        $this->generator = $generator;
    }

    /**
     * Hooked to add_attachment. Generates alt text if auto-generate is on
     * and the attachment is an image.
     *
     * @param int $attachment_id
     */
    public function maybe_auto_generate( $attachment_id ) {
        if ( ! get_option( 'aatg_auto_generate', false ) ) {
            return;
        }
        if ( ! wp_attachment_is_image( $attachment_id ) ) {
            return;
        }
        $generator = $this->generator ?? new AATG_Generator();
        $generator->generate_for_image( $attachment_id );
    }

    /**
     * Hooked to attachment_fields_to_edit. Adds a "Generate Alt Text" button
     * to the classic attachment edit panel.
     *
     * @param array   $form_fields
     * @param WP_Post $post
     * @return array
     */
    public function add_generate_button( $form_fields, $post ) {
        $button = sprintf(
            '<button type="button" class="button aatg-generate-btn" data-image-id="%d">%s</button>',
            esc_attr( $post->ID ),
            esc_html__( 'Generate Alt Text', 'ai-alt-text-generator' )
        );
        $form_fields['aatg_generate'] = array(
            'label' => __( 'AI Alt Text', 'ai-alt-text-generator' ),
            'input' => 'html',
            'html'  => $button,
        );
        return $form_fields;
    }
}
```

- [ ] **Step 4: Add the media class to the bootstrap loader**

In `tests/bootstrap.php`, add `'class-aatg-media.php'` to the `foreach` file array.

- [ ] **Step 5: Run tests to verify they pass**

```bash
./vendor/bin/phpunit --filter MediaTest
```

Expected: `OK (2 tests, ...)`.

- [ ] **Step 6: Create the classic-button JS handler**

The button rendered by `add_generate_button()` needs a click handler to actually
call the REST API. We use event delegation on `document` because the classic
attachment panel is rendered dynamically (Backbone media modal), so a static
`addEventListener` on the button at load time would miss it.

`admin/js/aatg-media.js`:

```js
/**
 * Classic Media Library "Generate Alt Text" button handler.
 * Delegated click listener — works even when the attachment panel is rendered
 * dynamically inside the media modal.
 */
( function () {
	document.addEventListener( 'click', async function ( event ) {
		const btn = event.target.closest( '.aatg-generate-btn' );
		if ( ! btn ) {
			return;
		}
		event.preventDefault();

		const imageId = parseInt( btn.dataset.imageId, 10 );
		if ( ! imageId ) {
			return;
		}

		const original = btn.textContent;
		btn.disabled = true;
		btn.textContent = '…';

		try {
			const res = await wp.apiFetch( {
				path: '/ai-alt-text/v1/generate',
				method: 'POST',
				data: { image_id: imageId },
			} );

			// Update the alt text field in the same panel if present.
			const field = document.getElementById( 'attachments-' + imageId + '-alt' );
			if ( field ) {
				field.value = res.alt_text;
				// Trigger change so WP saves it.
				field.dispatchEvent( new Event( 'change', { bubbles: true } ) );
			}
			btn.textContent = '✓';
		} catch ( e ) {
			btn.textContent = '✗';
			window.console.error( 'AATG:', e.message || e );
		} finally {
			setTimeout( function () {
				btn.disabled = false;
				btn.textContent = original;
			}, 1500 );
		}
	} );
} )();
```

> **Why event delegation:** WordPress renders the attachment edit panel on demand inside a Backbone modal. The button does not exist in the DOM at page load, so we attach ONE listener to `document` and check whether the click target matches `.aatg-generate-btn`. This is the robust pattern for dynamically injected elements.

- [ ] **Step 7: Enqueue the media JS on the relevant admin screens**

In `admin/class-aatg-admin.php`, extend `enqueue_assets()` so the media handler
loads on the post editor and the media library (where the classic panel appears).
Replace the method with:

```php
    public function enqueue_assets( $hook ) {
        // Bulk page assets.
        if ( 'media_page_aatg-bulk' === $hook ) {
            wp_enqueue_style( 'aatg-admin', AATG_PLUGIN_URL . 'admin/css/aatg-admin.css', array(), AATG_VERSION );
            wp_enqueue_script( 'aatg-bulk', AATG_PLUGIN_URL . 'admin/js/aatg-bulk.js', array( 'wp-api-fetch' ), AATG_VERSION, true );
            return;
        }

        // Classic media button handler — load where the attachment panel appears.
        if ( in_array( $hook, array( 'post.php', 'post-new.php', 'upload.php' ), true ) ) {
            wp_enqueue_script( 'aatg-media', AATG_PLUGIN_URL . 'admin/js/aatg-media.js', array( 'wp-api-fetch' ), AATG_VERSION, true );
        }
    }
```

> **Why `wp-api-fetch` as a dependency:** declaring it makes WordPress load its bundled `wp.apiFetch` (with the REST nonce pre-configured) before our script runs. We never manage the nonce ourselves.

- [ ] **Step 8: Run the full suite to confirm no regressions**

```bash
./vendor/bin/phpunit
```

Expected: all tests `OK`. (The JS isn't unit-tested; it's verified manually in Task 10.)

- [ ] **Step 9: Commit**

```bash
git add includes/class-aatg-media.php admin/js/aatg-media.js admin/class-aatg-admin.php tests/test-media.php tests/bootstrap.php
git commit -m "feat: add media hooks + classic library button with REST-powered JS"
```

---

## Task 9: Bulk generator admin page

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/admin/views/bulk-page.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/admin/js/aatg-bulk.js`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/admin/css/aatg-admin.css`

This page lists images missing alt text and processes them by calling the REST endpoint one at a time, updating a progress bar. Phase 1 uses vanilla JS + `wp-api-fetch` (no React yet).

- [ ] **Step 1: Create the bulk page view**

`admin/views/bulk-page.php`:

```php
<?php
/**
 * Bulk generator page. Lists attachments missing alt text and lets the user
 * generate for all of them. Processing happens client-side via the REST API.
 *
 * @package AI_Alt_Text_Generator
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

// Query images with empty alt text.
$aatg_query = new WP_Query(
    array(
        'post_type'      => 'attachment',
        'post_mime_type' => 'image',
        'post_status'    => 'inherit',
        'posts_per_page' => 100,
        'meta_query'     => array(
            'relation' => 'OR',
            array( 'key' => '_wp_attachment_image_alt', 'compare' => 'NOT EXISTS' ),
            array( 'key' => '_wp_attachment_image_alt', 'value' => '', 'compare' => '=' ),
        ),
    )
);

$aatg_ids = wp_list_pluck( $aatg_query->posts, 'ID' );
?>
<div class="wrap aatg-bulk">
    <h1><?php esc_html_e( 'Bulk Alt Text Generator', 'ai-alt-text-generator' ); ?></h1>

    <p>
        <?php
        printf(
            /* translators: %d is the number of images. */
            esc_html( _n( '%d image is missing alt text.', '%d images are missing alt text.', count( $aatg_ids ), 'ai-alt-text-generator' ) ),
            count( $aatg_ids )
        );
        ?>
    </p>

    <?php if ( ! empty( $aatg_ids ) ) : ?>
        <button type="button" class="button button-primary" id="aatg-start"
                data-ids="<?php echo esc_attr( wp_json_encode( $aatg_ids ) ); ?>">
            <?php esc_html_e( 'Generate All', 'ai-alt-text-generator' ); ?>
        </button>

        <div class="aatg-progress-wrap" style="display:none;">
            <div class="aatg-progress-bar"><span id="aatg-progress-fill"></span></div>
            <p id="aatg-progress-text"></p>
        </div>
        <ul id="aatg-log" class="aatg-log"></ul>
    <?php else : ?>
        <p><?php esc_html_e( 'All your images already have alt text. ', 'ai-alt-text-generator' ); ?></p>
    <?php endif; ?>
</div>
```

> **Why `meta_query` with NOT EXISTS + empty:** an image can either have no `_wp_attachment_image_alt` row at all (NOT EXISTS) or have one that's an empty string. We catch both. `wp_list_pluck` extracts just the IDs into a flat array.

- [ ] **Step 2: Create the bulk JS**

`admin/js/aatg-bulk.js`:

```js
/**
 * Bulk alt text generator. Calls the REST API once per image, sequentially,
 * updating a progress bar. Uses wp.apiFetch (handles the nonce automatically).
 */
( function () {
	const startBtn = document.getElementById( 'aatg-start' );
	if ( ! startBtn ) {
		return;
	}

	startBtn.addEventListener( 'click', async function () {
		const ids = JSON.parse( startBtn.dataset.ids || '[]' );
		const total = ids.length;
		if ( ! total ) {
			return;
		}

		startBtn.disabled = true;
		document.querySelector( '.aatg-progress-wrap' ).style.display = 'block';

		const fill = document.getElementById( 'aatg-progress-fill' );
		const text = document.getElementById( 'aatg-progress-text' );
		const log = document.getElementById( 'aatg-log' );

		let done = 0;
		for ( const id of ids ) {
			try {
				const res = await wp.apiFetch( {
					path: '/ai-alt-text/v1/generate',
					method: 'POST',
					data: { image_id: id },
				} );
				addLog( log, '#' + id + ': ' + res.alt_text, true );
			} catch ( e ) {
				addLog( log, '#' + id + ': ' + ( e.message || 'error' ), false );
			}
			done++;
			const pct = Math.round( ( done / total ) * 100 );
			fill.style.width = pct + '%';
			text.textContent = done + ' / ' + total;
		}

		startBtn.disabled = false;
	} );

	function addLog( log, message, ok ) {
		const li = document.createElement( 'li' );
		li.textContent = ( ok ? '✓ ' : '✗ ' ) + message;
		li.className = ok ? 'aatg-ok' : 'aatg-err';
		log.appendChild( li );
	}
} )();
```

> **Why sequential (`for...of` with `await`) and not `Promise.all`:** firing 100 OpenAI calls at once would hit rate limits and could overwhelm the server. Processing one at a time is slower but reliable, and the progress bar reflects real progress. (Phase 2's React version can add controlled concurrency.)

- [ ] **Step 3: Create the admin CSS**

`admin/css/aatg-admin.css`:

```css
.aatg-progress-wrap { margin: 20px 0; max-width: 600px; }
.aatg-progress-bar {
	background: #e0e0e0; border-radius: 10px; overflow: hidden; height: 20px;
}
.aatg-progress-bar span {
	display: block; height: 100%; width: 0; background: #2271b1;
	transition: width 0.3s ease;
}
.aatg-log { margin-top: 16px; max-height: 300px; overflow: auto; }
.aatg-log li { font-family: monospace; font-size: 12px; padding: 2px 0; }
.aatg-ok { color: #1a7f37; }
.aatg-err { color: #cf222e; }
.aatg-generate-btn { margin-top: 4px; }
```

- [ ] **Step 4: Verify the suite still passes (no regressions)**

```bash
cd "E:/dev/02-wordpress/ai-alt-text-generator"
./vendor/bin/phpunit
```

Expected: all tests `OK` (this task adds no PHP logic, only views/assets).

- [ ] **Step 5: Commit**

```bash
git add admin/views/bulk-page.php admin/js/aatg-bulk.js admin/css/aatg-admin.css
git commit -m "feat: add bulk generator admin page with progress bar"
```

---

## Task 10: readme.txt, i18n, uninstall.php + manual E2E verification

**Files:**
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/uninstall.php`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/readme.txt`
- Create: `E:/dev/02-wordpress/ai-alt-text-generator/languages/ai-alt-text-generator.pot`

- [ ] **Step 1: Create `uninstall.php`**

Runs only when the user DELETES the plugin (not on deactivate). Cleans every option we created.

```php
<?php
/**
 * Uninstall — remove all plugin options. Runs on plugin deletion.
 *
 * @package AI_Alt_Text_Generator
 */

// If uninstall is not called from WordPress, exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    die;
}

delete_option( 'aatg_openai_api_key' );
delete_option( 'aatg_model' );
delete_option( 'aatg_language' );
delete_option( 'aatg_auto_generate' );
```

> **Why `WP_UNINSTALL_PLUGIN` guard:** WordPress defines this constant only when it runs `uninstall.php`. The guard ensures the file does nothing if accessed directly via URL — a security requirement.

- [ ] **Step 2: Create `readme.txt`**

```
=== AI Alt Text Generator ===
Contributors: internick2017
Tags: alt text, accessibility, seo, ai, openai
Requires at least: 6.4
Tested up to: 7.0
Stable tag: 1.0.0
Requires PHP: 8.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Automatically generate descriptive alt text for images using AI. Supports WordPress 7.0 AI Connectors and OpenAI for older versions.

== Description ==

AI Alt Text Generator uses artificial intelligence to create descriptive,
SEO-friendly alt text for your WordPress images — improving accessibility
(WCAG) and search rankings.

Features:

* Native WordPress 7.0 AI Connectors support — no separate API key needed
* Bulk generator — process every image missing alt text at once
* Auto-generate on upload
* REST API endpoint for external tools and automation
* Generates alt text in your site's language

On WordPress 6.x the plugin uses your OpenAI API key. On WordPress 7.0+ it
uses your configured AI Connectors automatically.

== Installation ==

1. Upload the plugin to `/wp-content/plugins/ai-alt-text-generator`.
2. Activate it through the Plugins screen.
3. (WP 6.x only) Go to Settings → AI Alt Text and enter your OpenAI API key.
4. Go to Media → Bulk Alt Text to process existing images.

== Frequently Asked Questions ==

= Do I need an OpenAI account? =
Only on WordPress 6.x. On 7.0+ the plugin uses your AI Connectors configuration.

= How much does generation cost? =
With gpt-4o-mini, roughly $0.001 per image.

== Changelog ==

= 1.0.0 =
* Initial release: settings, media button, bulk generator, REST API.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
```

- [ ] **Step 3: Generate the translation template**

If WP-CLI is available:

```bash
cd "E:/dev/02-wordpress/ai-alt-text-generator"
wp i18n make-pot . languages/ai-alt-text-generator.pot --domain=ai-alt-text-generator
```

If WP-CLI is NOT available, create a minimal valid `.pot` header manually:

```
# Copyright (C) 2026 Nick Granados
# This file is distributed under the GPL-2.0-or-later license.
msgid ""
msgstr ""
"Project-Id-Version: AI Alt Text Generator 1.0.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"X-Domain: ai-alt-text-generator\n"
```

- [ ] **Step 4: Run the full test suite one final time**

```bash
cd "E:/dev/02-wordpress/ai-alt-text-generator"
./vendor/bin/phpunit
```

Expected: all tests pass (Plugin, OpenAI, AIProvider, Generator, RestApi, Settings, Media, Smoke).

- [ ] **Step 5: Manual end-to-end verification in a real WordPress install**

This step cannot be automated — it confirms the WP-integration glue (hooks, REST registration, admin pages) that unit tests cannot cover.

1. Symlink or copy the plugin folder into a local WordPress 6.x install's `wp-content/plugins/`.
2. Activate the plugin. Confirm no PHP errors (check `wp-content/debug.log` with `WP_DEBUG` on).
3. Go to **Settings → AI Alt Text**. Confirm the page renders. Enter an OpenAI API key, save. Confirm it persists.
4. Go to **Media → Bulk Alt Text**. Confirm it lists images missing alt text.
5. Upload a new image with auto-generate ON. Confirm alt text appears on the attachment.
6. In the classic Media Library, open an image. Confirm the "Generate Alt Text" button appears, click it, and confirm the alt text field populates with generated text.
7. Test the REST endpoint directly:
   ```bash
   curl -X POST "http://your-local-wp.test/wp-json/ai-alt-text/v1/generate" \
     -H "Content-Type: application/json" \
     -H "X-WP-Nonce: <nonce>" \
     --cookie "<auth cookies>" \
     -d '{"image_id": 1}'
   ```
   Confirm it returns `{ "alt_text": "...", "image_id": 1, "saved": true }`.
8. (If you have WP 7.0 available) Activate on WP 7.0, confirm the settings page shows the "AI Connectors detected" notice and hides the API key field.

Document any issues found. Fix and re-test before proceeding.

- [ ] **Step 6: Commit**

```bash
git add uninstall.php readme.txt languages/
git commit -m "feat: add uninstall cleanup, WP.org readme, and i18n template"
```

---

## After Phase 1

Phase 1 delivers a complete, installable, WP.org-ready plugin. Phase 2 (separate plan) replaces the PHP/Settings-API admin with React using `@wordpress/components`, adds the Gutenberg media sidebar panel, and rebuilds the bulk generator in React. Phase 1's REST API is the contract Phase 2's React UI will consume — nothing in Phase 1 is throwaway.
