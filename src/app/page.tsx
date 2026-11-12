import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { GameStatus } from "@/lib/types";

export const dynamic = "force-dynamic"; // conteos frescos en cada visita

// Tarjeta pequeña para un número del resumen
function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default async function Home() {
  // Solo pedimos la columna status: es lo único que necesitamos para contar
  const { data, error } = await supabase.from("games").select("status");
  if (error) throw new Error(error.message);

  const games = (data ?? []) as { status: GameStatus }[];

  // Contamos cuántos hay de cada estado
  const total = games.length;
  const pending = games.filter((g) => g.status === "pending").length;
  const inProgress = games.filter((g) => g.status === "in_progress").length;
  const platinum = games.filter((g) => g.status === "platinum").length;

  // Evitamos dividir entre 0 cuando todavía no hay juegos
  const rate = total === 0 ? 0 : Math.round((platinum / total) * 100);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Biblioteca de Platinos</h1>
      <p className="mt-2 text-gray-500">
        Lleva el control de los juegos que quieres platinar.
      </p>

      {/* Responsive: 2 columnas en móvil, 4 en escritorio */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Juegos en total" value={total} />
        <StatCard label="Pendientes" value={pending} />
        <StatCard label="En proceso" value={inProgress} />
        <StatCard label="Platinados" value={platinum} />
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Has platinado el {rate}% de tu biblioteca.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/juegos"
          className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white"
        >
          Ver mis juegos
        </Link>
        <Link href="/juegos/nuevo" className="rounded-lg border px-4 py-2 font-medium">
          + Agregar juego
        </Link>
      </div>
    </main>
  );
}