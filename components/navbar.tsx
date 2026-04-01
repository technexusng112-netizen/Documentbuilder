import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Topics Explorer", "/topics"],
  ["Contact", "/contact"],
  ["Hire Us", "/hire"]
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-brand-700">
          ProjectHelper
        </Link>
        <div className="hidden gap-4 md:flex">
          {nav.map(([name, href]) => (
            <Link key={href} href={href} className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300">
              {name}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
