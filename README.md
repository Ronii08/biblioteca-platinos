# 🏆 Biblioteca de Platinos

Aplicación web para llevar el control de los videojuegos que quiero platinar,
con tres estados: **pendiente**, **en proceso** y **platinado**.
Proyecto desarrollado con la metodología de Vibe Coding usando Claude como copiloto.

🔗 **Demo en producción:** https://TU-APP.vercel.app

## Funcionalidades

- Resumen en la home con el conteo de juegos por estado.
- Lista de juegos con buscador por título y filtro por estado.
- Agregar juegos desde un formulario.
- Detalle de cada juego, con edición de estado/progreso y borrado.
- Pantallas de carga, error y 404.
- Diseño responsive (móvil y escritorio).

## Tecnologías

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Supabase · Vercel

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Resumen de la biblioteca |
| `/juegos` | Lista con buscador y filtro |
| `/juegos/nuevo` | Formulario para agregar un juego |
| `/juegos/[id]` | Detalle, edición y borrado |

## Instalación

1. Clona el repositorio e instala las dependencias:
   ```bash
   git clone https://github.com/Ronii08/biblioteca-platinos.git
   cd biblioteca-platinos
   npm install
   ```
2. Crea un proyecto gratuito en [Supabase](https://supabase.com) y ejecuta el
   contenido de `supabase/schema.sql` en el **SQL Editor**.
3. Copia `.env.example` a `.env.local` y completa los valores
   (Supabase → Project Settings → API):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000.

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción
- `npm run lint`: revisión de código

## Proceso de desarrollo

El registro de prompts, iteraciones, decisiones técnicas y desafíos está en
[VIBE_CODING.md](./VIBE_CODING.md).

## Limitaciones conocidas

Las políticas de Supabase son públicas (cualquiera puede leer, crear, editar
y borrar) por tratarse de una actividad académica. En producción real se
agregaría autenticación y reglas por usuario.