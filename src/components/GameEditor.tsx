"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Game, GameStatus } from "@/lib/types";

export default function GameEditor({ game }: { game: Game }) {
  const router = useRouter();

  // Arrancan con los valores actuales del juego
  const [status, setStatus] = useState<GameStatus>(game.status);
  const [progress, setProgress] = useState(game.progress);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setBusy(true);
    setError(null);
    setMessage(null);

    // Equivale a: UPDATE games SET ... WHERE id = '...'
    // .select() al final nos devuelve las filas modificadas
    const { data, error: updateError } = await supabase
      .from("games")
      .update({
        status,
        progress: status === "platinum" ? 100 : progress,
        platinum_date:
          status === "platinum"
            ? // si ya tenía fecha la conservamos; si no, usamos la de hoy (local)
              game.platinum_date ?? new Date().toLocaleDateString("en-CA")
            : null,
      })
      .eq("id", game.id)
      .select();

    if (updateError) {
      setError(updateError.message);
    } else if (!data || data.length === 0) {
      // Sin error pero sin filas: casi seguro faltan las políticas RLS
      setError("No se guardó nada. Revisa las políticas (RLS) en Supabase.");
    } else {
      setMessage("Cambios guardados ✅");
      router.refresh(); // vuelve a pedir los datos al servidor
    }
    setBusy(false);
  }

  async function handleDelete() {
    // confirm() es el cuadro nativo del navegador: evita borrar por accidente
    if (!window.confirm("¿Borrar este juego? No se puede deshacer.")) return;

    setBusy(true);
    setError(null);

    const { data, error: deleteError } = await supabase
      .from("games")
      .delete()
      .eq("id", game.id)
      .select();

    if (deleteError || !data || data.length === 0) {
      setError(deleteError?.message ?? "No se pudo borrar. Revisa las políticas (RLS).");
      setBusy(false);
      return;
    }

    router.push("/juegos");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Actualizar progreso</h2>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Estado
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as GameStatus)}
          className="rounded-lg border px-3 py-2 font-normal"
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En proceso</option>
          <option value="platinum">Platinado</option>
        </select>
      </label>

      {status !== "platinum" && (
        <label className="flex flex-col gap-1 text-sm font-medium">
          Progreso de trofeos: {progress}%
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </label>
      )}

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={busy}
          className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {busy ? "Procesando..." : "Guardar cambios"}
        </button>
        <button
          onClick={handleDelete}
          disabled={busy}
          className="rounded-lg border border-red-500 px-4 py-2 font-medium text-red-600 disabled:opacity-50"
        >
          Borrar juego
        </button>
      </div>
    </div>
  );
}