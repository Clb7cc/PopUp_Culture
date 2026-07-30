import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles, Store, Palette, PartyPopper, Camera, Utensils, ShieldCheck, FileCheck, Zap, ArrowRight, Award, Users, Building, TrendingUp } from "lucide-react";
import { LISTINGS } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";
import { InteractiveMap } from "@/components/InteractiveMap";

const CATEGORIES = [
  { id: "all", label: "All Spaces", icon: Sparkles },
  { id: "retail", label: "Storefronts", icon: Store },
  { id: "gallery", label: "Galleries", icon: Palette },
  { id: "event", label: "Rooftops & Events", icon: PartyPopper },
  { id: "photoshoot", label: "Studios", icon: Camera },
  { id: "culinary", label: "Culinary", icon: Utensils },
];

const NEIGHBORHOODS = [
  { name: "Queen West", tag: "Fashion & Retail", count: "48 spaces", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80" },
  { name: "Yorkville", tag: "Luxury & Fine Art", count: "32 spaces", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80" },
  { name: "King West", tag: "Nightlife & Rooftops", count: "55 spaces", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80" },
  { name: "Kensington Market", tag: "Creative Lofts", count: "29 spaces", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80" },
];

const STATS = [
  { label: "Active Spaces", value: "340+", icon: Building },
  { label: "Creators Hosted", value: "2,100+", icon: Users },
  { label: "Avg. Rating", value: "4.95", icon: TrendingUp },
];

export function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = LISTINGS.filter(
    (l) => activeCategory === "all" || l.category === activeCategory
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search" as any, search: { q: searchQuery, category: activeCategory } as any });
  };

  return (
    <div className="space-y-20 py-6 sm:py-10">
      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 shadow-card">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/40 dark:from-primary/10 dark:via-background dark:to-card" />
          {/* Decorative orbs */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-verified/10 blur-2xl" />

          <div className="relative z-10 p-8 sm:p-14">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Toronto&apos;s Short-Term Space Marketplace
              </div>

              <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-6xl leading-[1.08]">
                Launch your next pop-up in <span className="text-primary italic bg-primary/5 px-2 rounded-xl">Toronto.</span>
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg max-w-2xl leading-relaxed">
                Book prime storefronts, skylit lofts, rooftops, and creative studios — solo or shared. Instant digital agreements & $2M host insurance included.
              </p>

              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Queen West storefront, rooftop event..."
                    className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm font-medium shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 shadow-md shrink-0"
                >
                  Find Spaces <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-verified" /> $2M Auto Insurance</span>
                <span className="flex items-center gap-1.5"><FileCheck className="h-4 w-4 text-primary" /> Instant Digital Lease</span>
                <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-amber-500" /> Verified Toronto Hosts</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> Co-sharing Available</span>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative z-10 border-t border-border/60 bg-secondary/30 dark:bg-card/50 backdrop-blur px-8 sm:px-14 py-5">
            <div className="flex flex-wrap items-center gap-8">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-extrabold text-foreground leading-none">{stat.value}</p>
                      <p className="text-[11px] font-semibold text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md scale-[1.03]"
                    : "bg-card text-foreground/80 hover:bg-secondary border border-border/60 hover:scale-[1.02]"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== FEATURED LISTINGS ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-bold">Curated Venues</p>
            <h2 className="font-display text-2xl font-black sm:text-3xl text-foreground">
              Explore Pop-Up Spaces
            </h2>
          </div>
          <Link to={"/search" as any} search={{ q: "" } as any} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
            View all {LISTINGS.length} spaces <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* ===== CO-SHARING BANNER ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary/8 to-verified/8 border border-primary/15 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-bold text-primary">
                <Users className="h-3.5 w-3.5" /> New Feature — Co-Sharing
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground">
                Split a space with other artists. Pay a fraction of the cost.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Co-sharing lets multiple independent artists rent different zones of the same venue simultaneously. Each artist manages their own booking, signs their own agreement, and gets their own insurance certificate — but shares the address, entrance, and foot traffic.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5 text-foreground"><ShieldCheck className="h-4 w-4 text-verified" /> Individual insurance per artist</span>
                <span className="flex items-center gap-1.5 text-foreground"><FileCheck className="h-4 w-4 text-primary" /> Separate digital agreements</span>
                <span className="flex items-center gap-1.5 text-foreground"><Users className="h-4 w-4 text-primary" /> Up to 3x lower cost</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
              <Link
                to={"/listing/$id" as any}
                params={{ id: "kensington-shared-collective" } as any}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-md whitespace-nowrap"
              >
                View Co-Sharing Example <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={"/search" as any}
                search={{ q: "shared" } as any}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
              >
                Browse Shareable Spaces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-bold">Interactive Map</p>
            <h2 className="font-display text-2xl font-black sm:text-3xl text-foreground">
              Map of Downtown Toronto Venues
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Click any pin to preview</p>
        </div>
        <InteractiveMap listings={filteredListings} />
      </section>

      {/* ===== NEIGHBORHOODS ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-primary font-bold">Prime Locations</p>
          <h2 className="font-display text-2xl font-black sm:text-3xl text-foreground">
            Top Toronto Pop-Up Neighborhoods
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n.name}
              to={"/search" as any}
              search={{ q: n.name } as any}
              className="group relative overflow-hidden rounded-2xl shadow-card transition-all hover:-translate-y-1 hover:shadow-float"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={n.img} alt={n.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <p className="text-[11px] font-bold text-white/70 uppercase tracking-wider">{n.tag}</p>
                <h3 className="font-display text-lg font-bold mt-0.5">{n.name}</h3>
                <p className="text-xs text-white/70 font-medium">{n.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="rounded-3xl bg-ink text-surface p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/20 px-3 py-1 text-xs font-bold text-verified">
              <Zap className="h-3.5 w-3.5" /> Built for Frictionless Pop-Ups
            </span>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              Why Toronto Creators Trust Popup Culture
            </h2>
            <p className="text-sm text-surface/80 leading-relaxed">
              No 6-month leases. No lawyers. No middlemen. Book premium spaces with full legal & insurance coverage in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                color: "bg-verified/20 text-verified",
                title: "Instant $2M Insurance",
                desc: "Commercial General Liability coverage issued automatically upon payment. Shared to both host and guest."
              },
              {
                icon: FileCheck,
                color: "bg-primary/20 text-primary",
                title: "Digital Agreements",
                desc: "Legally binding Ontario short-term space-use agreements with e-signature — co-sharing clauses included for split venues."
              },
              {
                icon: Users,
                color: "bg-amber-500/20 text-amber-400",
                title: "Co-Sharing Network",
                desc: "Browse other artists already registered in co-sharing spaces, or list your own zone to split costs with other creators."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="space-y-3 rounded-2xl bg-white/5 p-6 border border-white/10 hover:bg-white/8 transition-colors">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-surface/70 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
