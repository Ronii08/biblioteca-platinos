import type { GameStatus } from "@/lib/types";

// Diccionario: para cada estado, su texto y sus colores de Tailwind
const STYLES: Record<GameStatus, { label: string; classes: string }> = {
  pending: { label: "Pendiente", classes: "bg-gray-200 text-gray-800" },
  in_progress: { label: "En proceso", classes: "bg-amber-200 text-amber-900" },
  platinum: { label: "Platinado", classes: "bg-sky-200 text-sky-900" },
};

export default function StatusBadge({ status }: { status: GameStatus }) {
  const { label, classes } = STYLES[status];
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}