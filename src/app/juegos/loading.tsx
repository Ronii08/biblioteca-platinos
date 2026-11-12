export default function JuegosLoading() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 6 cajas grises que "laten" imitando las tarjetas */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </main>
  );
}