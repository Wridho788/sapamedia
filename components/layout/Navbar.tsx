import Link from "next/link";
import Container from "@/components/ui/Container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/category/teknologi", label: "Teknologi" },
  { href: "/category/bisnis", label: "Bisnis" },
  { href: "/search", label: "Search" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            Sapamedia
          </Link>

          <nav className="flex items-center gap-3 text-sm font-medium text-slate-700 sm:gap-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-(--color-accent)">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
