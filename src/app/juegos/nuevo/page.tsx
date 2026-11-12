import GameForm from "@/components/GameForm";

// Server Component sencillo: solo el marco; la interacción vive en GameForm
export default function NuevoJuegoPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Agregar juego</h1>
      <GameForm />
    </main>
  );
}