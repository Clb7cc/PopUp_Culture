import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, Filter, SlidersHorizontal, Map, LayoutGrid, X } from "lucide-react";
import { LISTINGS } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";
import { InteractiveMap } from "@/components/InteractiveMap";

type SearchParams = {
  q?: string;
  category?: string;
  neighborhood?: string;
};

export function SearchPage() {
  const navigate = useNavigate();
  const rawParams = (useSearch({ strict: false }) || {}) as SearchParams;

  const [query, setQuery] = useState(rawParams.q || "");
  const [selectedCategory, setSelectedCategory] = useState(rawParams.category || "all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(rawParams.neighborhood || "all");
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"split" | "grid" | "map">("split");

  const filteredListings = LISTINGS.filter((l) => {
    if (query.trim()) {
      const qLower = query.toLowerCase();
      const match =
        l.title.toLowerCase().includes(qLower) ||
        l.blurb.toLowerCase().includes(qLower) ||
        l.neighborhood.toLowerCase().includes(qLower) ||
        l.category.toLowerCase().includes(qLower);
      if (!match) return false;
    }
    if (selectedCategory !== "all" && l.category !== selectedCategory) return false;
    if (selectedNeighborhood !== "all" && l.neighborhood !== selectedNeighborhood) return false;
    if (l.price > maxPrice) return false;
    if (l.capacity < minCapacity) return false;
    return true;
  });

  const updateFilters = (newParams: Partial<SearchParams>) => {
    navigate({
      to: "/search",
      search: {
        q: query,
        category: selectedCategory,
        neighborhood: selectedNeighborhood,
        ...newParams,
      } as any,
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 space-y-6">
      {/* Search Header & Filter Controls */}
      <div className="rounded-3xl bg-card border border-border/80 p-5 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateFilters({ q: query });
            }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-2.5 w-full md:max-w-md shadow-sm"
          >
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. glasshouse, kitchen, gallery)..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  updateFilters({ q: "" });
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-border/80 bg-secondary/50 p-1 self-end md:self-auto">
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === "split" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> Split
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === "grid" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Grid
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === "map" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Map className="h-3.5 w-3.5" /> Map
            </button>
          </div>
        </div>

        {/* Filters Dropdown Selectors */}
        <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-4 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <span className="font-bold text-foreground">Filters:</span>
          </div>

          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              updateFilters({ category: e.target.value });
            }}
            className="rounded-xl border border-border bg-background px-3 py-1.5 font-semibold text-foreground outline-none focus:border-primary"
          >
            <option value="all">All Categories</option>
            <option value="retail">Storefronts & Retail</option>
            <option value="gallery">Art Galleries</option>
            <option value="event">Rooftops & Event Lofts</option>
            <option value="photoshoot">Photo & Film Studios</option>
            <option value="culinary">Culinary & Kitchens</option>
          </select>

          {/* Neighborhood Selector */}
          <select
            value={selectedNeighborhood}
            onChange={(e) => {
              setSelectedNeighborhood(e.target.value);
              updateFilters({ neighborhood: e.target.value });
            }}
            className="rounded-xl border border-border bg-background px-3 py-1.5 font-semibold text-foreground outline-none focus:border-primary"
          >
            <option value="all">All Neighborhoods</option>
            <option value="Queen West">Queen West</option>
            <option value="Yorkville">Yorkville</option>
            <option value="King West">King West</option>
            <option value="Kensington Market">Kensington Market</option>
            <option value="Distillery District">Distillery District</option>
            <option value="Ossington Strip">Ossington Strip</option>
          </select>

          {/* Max Price Slider */}
          <div className="flex items-center gap-2">
            <span>Max Price: <strong className="text-foreground">${maxPrice}/hr</strong></span>
            <input
              type="range"
              min="80"
              max="400"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-primary h-1.5 w-24 rounded-lg bg-secondary cursor-pointer"
            />
          </div>

          {/* Min Capacity Selector */}
          <div className="flex items-center gap-2">
            <span>Min Guests: <strong className="text-foreground">{minCapacity}+</strong></span>
            <input
              type="range"
              min="0"
              max="150"
              step="10"
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              className="accent-primary h-1.5 w-20 rounded-lg bg-secondary cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-semibold">
          Showing <strong className="text-foreground">{filteredListings.length}</strong> pop-up spaces in Toronto
        </p>
      </div>

      {/* View Options */}
      {viewMode === "split" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} compact />
              ))
            ) : (
              <NoResultsFound onReset={() => {
                setQuery("");
                setSelectedCategory("all");
                setSelectedNeighborhood("all");
                setMaxPrice(400);
                setMinCapacity(0);
              }} />
            )}
          </div>
          <div className="lg:col-span-5 sticky top-24 h-[calc(100vh-140px)] min-h-[500px]">
            <InteractiveMap listings={filteredListings} />
          </div>
        </div>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <NoResultsFound onReset={() => {
              setQuery("");
              setSelectedCategory("all");
              setSelectedNeighborhood("all");
              setMaxPrice(400);
              setMinCapacity(0);
            }} />
          )}
        </div>
      )}

      {viewMode === "map" && (
        <div className="h-[75vh] min-h-[550px]">
          <InteractiveMap listings={filteredListings} />
        </div>
      )}
    </div>
  );
}

function NoResultsFound({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full py-16 text-center space-y-4 rounded-3xl border border-dashed border-border bg-card p-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl font-bold">No matching spaces found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Try broadening your search criteria or resetting filters to explore all available venues.
      </p>
      <button
        onClick={onReset}
        className="rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Reset Filters
      </button>
    </div>
  );
}
