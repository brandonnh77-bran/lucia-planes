## Goal

Reemplazar el flujo actual de checkout (que crea sesiones vía `/api/create-checkout` con price IDs) por redirecciones directas a los 3 Payment Links de Stripe live que proporcionaste.

## Cambios en `src/routes/index.tsx`

1. Definir un mapa de Payment Links:
   - `basic` → `https://buy.stripe.com/28E9AT3cY4xygej5LNcEw00`
   - `luna` → `https://buy.stripe.com/dRmbJ1bJu3tu2nt6PRcEw01`
   - `vip` → `https://buy.stripe.com/8x25kDbJuaVWbY3a23cEw02`

2. Simplificar `handleCheckout(plan)`:
   - Mostrar el overlay de loading.
   - Construir la URL del Payment Link y, si existen, anexar `client_reference_id` (con `ref`) y `prefilled_phone` como query params para preservar el tracking actual.
   - `window.location.href = url`.
   - Eliminar el `fetch` a `/api/create-checkout` y el manejo de respuesta JSON.

3. Actualizar los 3 botones para llamar `handleCheckout("basic" | "luna" | "vip")` sin pasar `priceId`.

## Notas

- No se modifica `src/routes/api/create-checkout.ts` (queda inactivo pero sin romper nada). Puedo borrarlo si lo prefieres.
- El secreto `STRIPE_SECRET_KEY` deja de ser necesario para el flujo de pago, pero no lo toco.
- Los Payment Links de Stripe ya gestionan success/cancel URLs desde su propia configuración en el dashboard.
