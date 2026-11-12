import { supabase } from "@/lib/supabase";
import GamesList from "@/components/Gamelist";
import type { Game } from "@/lib/types";

// Server Component: se ejecuta en el servidor, antes de llegar al navegador
export default async function JuegosPage() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false }); // los más nuevos primero

  // Si falla, lanzamos el error; el error.tsx (lo haremos pronto) lo mostrará
  if (error) throw new Error(error.message);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Mis juegos</h1>
      {/* Pasamos los datos a la "mesa" (Client Component) */}
      <GamesList games={(data ?? []) as Game[]} />
    </main>
  );
}