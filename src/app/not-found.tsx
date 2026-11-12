import Link from "next/link";

// Se muestra cuando una ruta no existe o llamamos a notFound()
export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-gray-500">Ese juego o esa página no existe.</p>
      <Link href="/juegos" className="mt-4 inline-block text-sky-600 hover:underline">
        ← Volver a mis juegos
      </Link>
    </main>
  );
}