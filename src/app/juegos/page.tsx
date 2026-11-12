import Link from "next/link";
import { supabase } from "@/lib/supabase";
import GamesList from "@/components/Gamelist";
import type { Game } from "@/lib/types";

export const dynamic = "force-dynamic";
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis juegos</h1>
        <Link
          href="/juegos/nuevo"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white"
        >
          + Agregar juego
        </Link>
      </div>
      <GamesList games={(data ?? []) as Game[]} />
    </main>
  );
}