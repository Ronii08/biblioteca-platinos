-- Tabla principal: cada fila es un juego
create table games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  platform text not null default 'PS5',
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'platinum')),
  progress int not null default 0 check (progress between 0 and 100),
  cover_url text,
  notes text,
  platinum_date date,
  created_at timestamptz not null default now()
);

-- Seguridad a nivel de fila (RLS)
alter table games enable row level security;

-- Políticas públicas: suficientes para esta actividad.
-- En producción real se restringirían con autenticación.
create policy "lectura publica" on games for select using (true);
create policy "insertar publico" on games for insert with check (true);
create policy "actualizar publico" on games for update using (true) with check (true);
create policy "borrar publico" on games for delete using (true);

-- Datos de ejemplo (opcional)
insert into games (title, platform, status, progress) values
  ('Elden Ring', 'PS5', 'in_progress', 45),
  ('Stray', 'PS5', 'platinum', 100),
  ('God of War', 'PS4', 'pending', 0);