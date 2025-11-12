# Frontend React (Vite)

Este frontend consume el middleware (API única) que coordina los microservicios (registro, login y servicios adicionales con espejo/failover).

## Requisitos
- Node 18+
- pnpm / npm / yarn

## Configuración
1. Copia el archivo `.env.example` a `.env` y ajusta la URL del middleware si es necesario.

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Scripts
- `pnpm dev` / `npm run dev` — entorno de desarrollo
- `pnpm build` / `npm run build` — build de producción
- `pnpm preview` / `npm run preview` — previsualizar build

## Rutas y endpoints
- Registro: `POST /register` (body: `{ name, email, password }`)
- Login: `POST /login` (body: `{ user, password }`)
- Producto (ejemplo adicional): `POST /products` (body: `{ name, price }`)
- Salud: `GET /health` — usado por el componente de estado para mostrar disponibilidad general.

Puedes ajustar rutas en `src/config.ts` para alinearlas con tu middleware.

## Notas
- El frontend asume que el failover entre servicios adicionales y sus espejos lo maneja el middleware. Si un servicio falla, el middleware redirige al espejo y el frontend simplemente recibe la respuesta.
- No se usa JWT ni OAuth2; el login es básico. Si el middleware maneja sesiones por cookie, el navegador las enviará automáticamente.

