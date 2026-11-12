import Link from "next/link";
import type { Game } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function GameCard({ game }: { game: Game }) {
  return (
    // Link navega entre páginas sin recargar todo el sitio
    <Link
      href={`/juegos/${game.id}`}
      className="block rounded-lg border p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold">{game.title}</h2>
        <StatusBadge status={game.status} />
      </div>
      <p className="mt-1 text-sm text-gray-500">{game.platform}</p>

      {/* Barra de progreso: un rectángulo cuyo ancho es el porcentaje */}
      <div className="mt-3 h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-sky-500"
          style={{ width: `${game.progress}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">{game.progress}% de trofeos</p>
    </Link>
  );
}