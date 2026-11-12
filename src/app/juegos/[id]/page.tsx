import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import StatusBadge from "@/components/StatusBadge";
import GameEditor from "@/components/GameEditor";
import type { Game } from "@/lib/types";

// Igual que en la lista: datos frescos en cada visita
export const dynamic = "force-dynamic";

// Un id válido tiene forma de uuid; si no, ni consultamos la base de datos
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// "2026-11-11" -> "11 de noviembre de 2026", armada con fecha LOCAL
function formatDateOnly(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es", { dateStyle: "long" });
}

// En Next 16, params llega como promesa: hay que esperarla con await
export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!UUID_REGEX.test(id)) notFound(); // muestra la página 404

  // Equivale a: SELECT * FROM games WHERE id = '...'
  // maybeSingle() devuelve null (sin error) si no existe
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) notFound();

  const game = data as Game;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/juegos" className="text-sm text-sky-600 hover:underline">
        ← Volver a mis juegos
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold">{game.title}</h1>
        <StatusBadge status={game.status} />
      </div>
      <p className="mt-1 text-gray-500">{game.platform}</p>

      <div className="mt-6 h-3 rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-sky-500"
          style={{ width: `${game.progress}%` }}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">{game.progress}% de trofeos</p>

      {game.platinum_date && (
        <p className="mt-4 text-sm">
          🏆 Platinado el {formatDateOnly(game.platinum_date)}
        </p>
      )}
      {game.notes && <p className="mt-4 whitespace-pre-wrap">{game.notes}</p>}

      <hr className="my-8" />

      {/* La "mesa" interactiva: recibe el juego ya cargado */}
      <GameEditor game={game} />
    </main>
  );
}