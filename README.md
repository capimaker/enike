# enike

## Descripcion
Proyecto e-commerce basado en Next.js con React, Tailwind CSS y Drizzle ORM, preparado para autenticacion con Better Auth y base de datos Postgres (Neon).

## Tecnologias usadas (explicacion breve)
- Next.js 15 (App Router) para el framework web y el build.
- React 19 para la UI.
- Tailwind CSS 4 + PostCSS para estilos.
- Drizzle ORM + Drizzle Kit para el modelo y migraciones de la base de datos.
- Neon (Postgres serverless) como base de datos.
- Better Auth para autenticacion (ej. Google OAuth).
- Zustand para estado global ligero.
- Lucide React para iconos.
- TypeScript para tipado.
- ESLint para linting.

## Lista completa de tecnologias
Dependencias de runtime:
- next
- react
- react-dom
- drizzle-orm
- drizzle-kit
- @neondatabase/serverless
- better-auth
- zustand
- lucide-react
- query-string
- uuid
- dotenv

Dependencias de desarrollo:
- typescript
- tsx
- eslint
- eslint-config-next
- @eslint/eslintrc
- @types/node
- @types/react
- @types/react-dom
- tailwindcss
- @tailwindcss/postcss

## Instrucciones de uso
1) Instalar dependencias:
```bash
npm install
```

2) Configurar variables de entorno en `.env.local` (ejemplo de claves):
```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="tu-secret-de-32-caracteres-o-mas"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"
```

3) Base de datos (opcional, segun tu flujo):
```bash
npm run db:push
npm run db:migrate
npm run db:seed
```

4) Desarrollo:
```bash
npm run dev
```

5) Build y produccion:
```bash
npm run build
npm run start
```

6) Lint:
```bash
npm run lint
```

## Scripts disponibles
- `npm run dev`: servidor de desarrollo (Turbopack).
- `npm run build`: build de produccion.
- `npm run start`: servidor de produccion.
- `npm run lint`: linting.
- `npm run db:generate`: genera artefactos de Drizzle.
- `npm run db:migrate`: aplica migraciones.
- `npm run db:push`: sincroniza esquema.
- `npm run db:studio`: UI de Drizzle Studio.
- `npm run db:seed`: seed de datos.
