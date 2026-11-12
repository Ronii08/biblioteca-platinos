import { supabase } from "@/lib/supabase";

// Al ser un Server Component, puede ser "async" y pedir datos directamente
export default async function Home() {
  // Equivale a: SELECT * FROM games
  const { data: games, error } = await supabase.from("games").select("*");

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Mis juegos</h1>
      <ul>
        {games?.map((g) => (
          <li key={g.id}>
            {g.title} — {g.status} ({g.progress}%)
          </li>
        ))}
      </ul>
    </main>
  );
}