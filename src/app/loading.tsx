// Se muestra automáticamente mientras una página espera sus datos
export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-center gap-3 text-gray-500">
        {/* Círculo que gira: animate-spin es de Tailwind */}
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-sky-500" />
        <p>Cargando...</p>
      </div>
    </main>
  );
}