# Store Up — evidencia capturada antes del cierre

Capturas del storefront **tomadas el 2026-08-28**, mientras la tienda seguía en línea.

## Por qué existen

La suscripción de Shopify se vence y no se va a renovar (la tienda no generó ingresos).
Cuando eso pase, `https://storeup.store` deja de responder y no hay forma de volver a
capturar el sitio. Estas imágenes son la única prueba visual que va a quedar del trabajo.

| Archivo | Qué muestra |
|---|---|
| `home-es.png` | Home en español: hero, propuesta de valor, producto y popup de captura de email |
| `home-en.png` | La misma home en inglés, que evidencia el multi-idioma real (nav, banner y popup traducidos) |
| `catalogo.png` | Página de catálogo |

## Qué quedó verificado en vivo antes del cierre

- **Tres idiomas** con `hreflang` para `en`, `es`, `pt` más `x-default`.
- **Multi-moneda**: formulario de localización de Shopify, precios en EUR.
- **Tema propio**: Dawn personalizado, servido desde el dominio propio `storeup.store`.

## Qué hacer cuando la tienda caiga

1. En `src/data/projects.ts`, card `store-up`: poner `demo: null`.
   El link quedaría roto y un link roto es peor que no tener link.
2. El texto del case study YA está redactado en pasado ("construida y operada"), así que
   **no hay que reescribirlo**: sigue siendo cierto con la tienda fuera de línea.
3. La card se queda en el portfolio. Montar y operar una tienda real es trabajo válido;
   cerrarla por falta de ventas es un desenlace de negocio normal, no un fracaso técnico.
