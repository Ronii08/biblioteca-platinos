# Proceso de Vibe Coding

## Paso 1: Arquitectura y planificación

**Prompt principal:**
> "Quiero hacer una app en Next.js 16 para llevar el control de juegos que
> quiero platinar, con estados pendiente, en proceso y platinado. Necesito
> mínimo 4 rutas, Server y Client Components, y Supabase. Ayúdame a diseñar
> la arquitectura antes de generar código."

**Iteración:** la IA propuso 4 rutas (`/`, `/juegos`, `/juegos/[id]`,
`/juegos/nuevo`) y una tabla `games`. Acepté la estructura tal cual.

**Decisión técnica:** separar `components/` (piezas reutilizables) y `lib/`
(conexión a la base de datos) dentro de `src/`, para poder cambiar de base de
datos tocando un solo lugar.

---

## Paso 2: Creación del proyecto y repositorio

**Prompt:** "¿Qué opciones elijo en create-next-app para cumplir la rúbrica?"

**Decisión técnica:** TypeScript, ESLint, Tailwind, carpeta `src/` y App Router.
Verifiqué en `package.json` que la versión de Next.js fuera 16.

**Desafío y solución:** al hacer commit de este archivo, Git me dijo que el
archivo estaba "untracked". Había olvidado `git add`: `commit` solo guarda
lo que ya está agregado. Además lo nombré `vibe_CODING.md` en vez de
`VIBE_CODING.md`; lo renombré antes del commit para cumplir la rúbrica.

---

## Paso 3: Conexión con Supabase

**Prompt:** "Dame el SQL para crear la tabla games con estados y progreso, y
cómo conectarla a Next.js con variables de entorno."

**Iteración:** [aquí anota si cambiaste algo, por ejemplo columnas que
agregaste o quitaste]

**Decisiones técnicas:**
- Usé un `check` en `status` y `progress` para que la base de datos rechace
  valores inválidos aunque el código falle.
- Activé RLS con lectura e inserción públicas. Es suficiente para esta tarea;
  en producción real agregaría login y reglas por usuario.
- Claves en `.env.local` (ignorado por Git) y un `.env.example` vacío que
  documenta las variables necesarias.

## Paso 4: Lista de juegos con buscador y filtro

**Prompt principal:**
> "Crea una página /juegos en Next.js 16 que lea los juegos de Supabase en un
> Server Component y los muestre en una lista con buscador por título y filtro
> por estado, usando un Client Component con useState. Con Tailwind y responsive."

**Iteración:** la IA separó la página (servidor) de la lista (cliente) y creó
componentes pequeños (GameCard, StatusBadge). Dejé las portadas para más
adelante para no complicar este paso. [anota aquí algo que hayas cambiado tú]

**Decisión técnica:** los datos se piden en el servidor y se pasan por props al
cliente. Así la clave no se expone y el cliente solo se encarga de la
interacción. Moví components/ a src/components/ (fuera de app/) para que app/
solo tenga rutas.

## Paso 5: Formulario para agregar juegos

**Prompt principal:**
> "Crea la ruta /juegos/nuevo con un formulario (Client Component) que guarde
> un juego en Supabase con título, plataforma, estado, progreso y notas.
> Que muestre estado de guardado y errores, y vuelva a la lista al terminar."

**Iteración:** la IA generó el formulario con un useState por campo. Lo revisé
y pedí/ajusté que el progreso quede en 100 si el estado es "platinado", y que
la fecha de platino use la fecha local y no la de UTC. [anota tus cambios]

**Decisión técnica:** la página es Server Component y el formulario un Client
Component aparte, para mantener el JS del cliente mínimo. Agregué
`export const dynamic = "force-dynamic"` en /juegos para que en producción los
juegos nuevos aparezcan en cada visita y no se quede la versión del build.

## Paso 6: Detalle del juego, edición y borrado

**Prompt principal:**
> "Crea la ruta dinámica /juegos/[id] en Next.js 16 que muestre el detalle de
> un juego desde Supabase y permita cambiar estado y progreso, o borrarlo.
> Maneja el caso de id inexistente con notFound()."

**Iteración:** la IA propuso la página de servidor más un Client Component
para editar. Revisé el código y ajusté tres cosas: usar `await params`
(en Next 16 es una promesa), validar el formato del uuid antes de consultar y
formatear la fecha de platino con hora local para que no se corra un día.
[anota tus cambios]

**Decisión técnica:** el editor verifica con `.select()` que la operación sí
modificó una fila. Con RLS, un update sin permiso no lanza error, solo afecta
0 filas, así que sin esa verificación la app diría "guardado" sin haber
guardado. Dejé políticas públicas de update/delete por ser una tarea; en
producción usaría autenticación.

**Desafío y solución:** [anota aquí lo que te pasó. Ejemplo: "Al guardar no
cambiaba nada y no daba error. Era RLS: faltaban las políticas de update y
delete. Las agregué en el SQL Editor."]