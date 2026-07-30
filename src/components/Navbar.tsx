import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Sparkles, Building2, Moon, Sun, Menu, X } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 border-b transition-all duration-200 ${scrolled ? "border-border/80 bg-background/90 backdrop-blur-xl shadow-sm" : "border-border/40 bg-background/70 backdrop-blur-md"}`}>
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-5 sm:px-8">
          {/* Logo */}
          <Link to={"/" as any} className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-xl font-black shadow-sm">
              P
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Popup<span className="text-primary">Culture</span>
            </span>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/search" as any, search: { q } as any });
              setMobileOpen(false);
            }}
            className="hidden flex-1 items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 shadow-card transition-all focus-within:border-primary/50 focus-within:shadow-md md:flex max-w-lg"
          >
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Toronto spaces — Queen West, lofts, storefronts…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>

          {/* Desktop nav */}
          <nav className="ml-auto flex items-center gap-2">
            <Link
              to={"/search" as any}
              search={{ q: "" } as any}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary sm:block"
            >
              Explore
            </Link>
            <Link
              to={"/host" as any}
              className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary sm:inline-flex"
            >
              <Building2 className="h-4 w-4 text-primary" /> List your space
            </Link>
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all hover:bg-secondary hover:text-foreground"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/70 hover:bg-secondary hover:text-foreground transition-all sm:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-background px-5 py-4 space-y-3 sm:hidden animate-in slide-in-from-top-2 duration-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/search" as any, search: { q } as any });
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5"
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Toronto spaces…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>
            <div className="flex flex-col gap-2">
              <Link to={"/search" as any} search={{ q: "" } as any} onClick={() => setMobileOpen(false)} className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-foreground">
                🔍 Explore Spaces
              </Link>
              <Link to={"/host" as any} onClick={() => setMobileOpen(false)} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
                🏢 List Your Space
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Scroll-to-top button */}
      <ScrollToTop />
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-float transition-all hover:scale-110 hover:opacity-90 animate-in fade-in duration-300"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
