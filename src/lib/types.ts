// Los únicos 3 estados posibles 
export type GameStatus = "pending" | "in_progress" | "platinum";

// La "ficha" de un juego: refleja las columnas de la tabla games
export interface Game {
  id: string;
  title: string;
  platform: string;
  status: GameStatus;
  progress: number;
  cover_url: string | null; // null = no tiene portada
  notes: string | null;
  platinum_date: string | null;
  created_at: string;
}