"use client"; // usePathname es un hook, así que necesita ser Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/juegos", label: "Mis juegos" },
  { href: "/juegos/nuevo", label: "Agregar" },
];

export default function Navbar() {
  // pathname = la ruta actual, por ejemplo "/juegos"
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 p-4">
        <span className="font-bold">🏆 Platinos</span>
        <div className="flex gap-4 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              // Resalta el enlace de la página en la que estás
              className={
                pathname === l.href
                  ? "font-semibold text-sky-600"
                  : "text-gray-600 hover:text-sky-600"
              }
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}