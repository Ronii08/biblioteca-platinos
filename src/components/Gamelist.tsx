"use client"; // ← esta línea la convierte en Client Component (necesaria para hooks)

import { useEffect, useState } from "react";
import type { Game, GameStatus } from "@/lib/types";
import GameCard from "./Gamecard";

const FILTERS: { value: GameStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendientes" },
  { value: "in_progress", label: "En proceso" },
  { value: "platinum", label: "Platinados" },
];

export default function GamesList({ games }: { games: Game[] }) {
  // useState = la "memoria" de la mesa: texto buscado y estado elegido
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<GameStatus | "all">("all");

  // Cada vez que cambia algo, se recalcula qué juegos mostrar
  const filtered = games.filter(
    (g) =>
      (status === "all" || g.status === status) &&
      g.title.toLowerCase().includes(query.toLowerCase())
  );

  // useEffect = "cuando cambie esto, haz algo fuera de React":
  // aquí actualizamos el título de la pestaña del navegador
  useEffect(() => {
    document.title = `Mis juegos (${filtered.length})`;
  }, [filtered.length]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Buscar juego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`rounded-full border px-3 py-1 text-sm ${
                status === f.value ? "bg-sky-500 text-white" : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No hay juegos que coincidan.</p>
      ) : (
        // Responsive: 1 columna en móvil, 2 en tablet, 3 en escritorio
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
}