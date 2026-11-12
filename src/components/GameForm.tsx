"use client"; // necesita hooks, así que es Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { GameStatus } from "@/lib/types";

export default function GameForm() {
  const router = useRouter(); // para navegar por código después de guardar

  // Un useState por campo: la "memoria" del formulario
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("PS5");
  const [status, setStatus] = useState<GameStatus>("pending");
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");

  // Estados de la operación: ¿está guardando? ¿hubo error?
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // evita que el navegador recargue la página
    setSaving(true);
    setError(null);

    // Equivale a: INSERT INTO games (...) VALUES (...)
    const { error: insertError } = await supabase.from("games").insert({
      title: title.trim(),
      platform,
      status,
      // Si ya está platinado, el progreso es 100 por definición
      progress: status === "platinum" ? 100 : progress,
      notes: notes.trim() || null, // texto vacío -> null
      // "en-CA" da formato AAAA-MM-DD con la fecha LOCAL (no la de UTC)
      platinum_date:
        status === "platinum" ? new Date().toLocaleDateString("en-CA") : null,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return; // nos quedamos en el formulario para que pueda reintentar
    }

    router.push("/juegos"); // volvemos a la lista
    router.refresh(); // fuerza a Next a pedir los datos otra vez
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Título
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border px-3 py-2 font-normal"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Plataforma
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-lg border px-3 py-2 font-normal"
        >
          <option>PS5</option>
          <option>PS4</option>
          <option>PS3</option>
          <option>PC</option>
        </select>
      </label>

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

      {/* Si ya está platinado, ocultamos el progreso porque sería 100 */}
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

      <label className="flex flex-col gap-1 text-sm font-medium">
        Notas (opcional)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="rounded-lg border px-3 py-2 font-normal"
        />
      </label>

      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Guardar juego"}
      </button>
    </form>
  );
}