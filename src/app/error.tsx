"use client"; // obligatorio: los archivos error.tsx siempre son Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; // función que vuelve a intentar renderizar la página
}) {
  // Efecto: dejamos constancia del error en la consola
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Algo salió mal 😵</h1>
      <p className="mt-2 text-gray-500">
        No pudimos cargar la información. Revisa tu conexión e inténtalo de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-lg bg-sky-500 px-4 py-2 font-medium text-white"
      >
        Reintentar
      </button>
    </main>
  );
}