import { createClient } from "@supabase/supabase-js";

// Lee la dirección y la llave desde .env.local (nunca las escribimos aquí a mano)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Exportamos un solo cliente para reutilizarlo en toda la app.
export const supabase = createClient(url, key);