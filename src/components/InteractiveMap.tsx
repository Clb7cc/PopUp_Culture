import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Link } from "@tanstack/react-router";
import L, { divIcon, LatLngBounds } from "leaflet";
import { Star, Users, ExternalLink, MapPin, Navigation2 } from "lucide-react";
import type { Listing } from "@/lib/listings";
import { SafeImg } from "@/components/SafeImg";

// ── Fix Leaflet's default icon paths (Vite bundler issue) ──────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Build a custom price-badge marker icon ─────────────────────────────
function makePriceIcon(listing: Listing, selected: boolean) {
  const price = `$${listing.price}/${listing.unit === "day" ? "d" : "h"}`;
  const shared = listing.sharingEnabled;

  const bg      = selected ? "#d4773a"  : shared ? "#3b82f6" : "#ffffff";
  const color   = selected ? "#ffffff"  : shared ? "#ffffff" : "#1a1a1a";
  const border  = selected ? "#b05a20"  : shared ? "#2563eb" : "#cbd5e1";
  const shadow  = selected
    ? "0 4px 14px rgba(212,119,58,0.55)"
    : "0 2px 8px rgba(0,0,0,0.20)";
  const scale   = selected ? "scale(1.18)" : "scale(1)";
  const zIndex  = selected ? 1000 : 100;

  return divIcon({
    className: "",
    iconSize: undefined,
    iconAnchor: [0, 0],
    html: `
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: ${bg};
        color: ${color};
        border: 2px solid ${border};
        border-radius: 999px;
        padding: 5px 10px 5px 7px;
        font-family: 'Archivo', system-ui, sans-serif;
        font-size: 11px;
        font-weight: 800;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: ${shadow};
        transform: ${scale};
        transform-origin: left center;
        transition: transform .18s ease, box-shadow .18s ease;
        z-index: ${zIndex};
        position: relative;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"
             viewBox="0 0 24 24" fill="currentColor" style="opacity:.9;flex-shrink:0">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75
                   7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5
                   -2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        ${price}
      </div>`,
  });
}

// ── Inner component: manages markers imperatively inside MapContainer ──
function MarkersLayer({
  listings,
  selectedId,
  onSelect,
}: {
  listings: Listing[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const map = useMap();
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const prevListingIdsRef = useRef<string>("");

  // Rebuild markers only when listings array changes
  useEffect(() => {
    const newIds = listings.map((l) => l.id).join(",");

    // Remove stale markers
    markersRef.current.forEach((marker, id) => {
      if (!listings.find((l) => l.id === id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add new markers
    listings.forEach((l) => {
      if (!markersRef.current.has(l.id)) {
        const marker = L.marker([l.lat, l.lng], {
          icon: makePriceIcon(l, selectedId === l.id),
          zIndexOffset: selectedId === l.id ? 1000 : 0,
        }).addTo(map);

        marker.on("click", () => onSelect(l.id));
        markersRef.current.set(l.id, marker);
      }
    });

    // Fit bounds when listings change
    if (listings.length > 1) {
      const bounds = new LatLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14, animate: true });
    } else if (listings.length === 1) {
      map.setView([listings[0].lat, listings[0].lng], 15, { animate: true });
    }

    prevListingIdsRef.current = newIds;

    return () => {
      // cleanup on unmount
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings]);

  // Update icon styles when selection changes (no full rebuild)
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const listing = listings.find((l) => l.id === id);
      if (!listing) return;
      marker.setIcon(makePriceIcon(listing, id === selectedId));
      marker.setZIndexOffset(id === selectedId ? 1000 : 0);
    });
  }, [selectedId, listings]);

  return null;
}

// ── Inner component: pans map to selected listing ─────────────────────
function PanToSelected({
  listing,
}: {
  listing: Listing | undefined;
}) {
  const map = useMap();
  const prevId = useRef<string | null>(null);

  useEffect(() => {
    if (!listing || listing.id === prevId.current) return;
    prevId.current = listing.id;
    map.panTo([listing.lat, listing.lng], { animate: true, duration: 0.5 });
  }, [listing, map]);

  return null;
}

// ── Detect dark mode for tile layer ──────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return dark;
}

// ── Main exported component ───────────────────────────────────────────
export function InteractiveMap({ listings }: { listings: Listing[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    listings[0]?.id ?? null
  );
  const dark = useDarkMode();

  // Keep selection valid when listings change
  useEffect(() => {
    if (!listings.find((l) => l.id === selectedId)) {
      setSelectedId(listings[0]?.id ?? null);
    }
  }, [listings]);

  const selectedListing = listings.find((l) => l.id === selectedId) ?? listings[0];

  const center = useMemo<[number, number]>(() => {
    if (!listings.length) return [43.653, -79.383];
    const lats = listings.map((l) => l.lat);
    const lngs = listings.map((l) => l.lng);
    return [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
    ];
  }, []);

  // Tile URL: CartoDB light/dark (free, no API key)
  const tileUrl = dark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const tileAttribution =
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/">CARTO</a>';

  return (
    <div className="relative h-full min-h-[500px] w-full overflow-hidden rounded-3xl border border-border/80 shadow-card">
      {/* ── Leaflet Map ────────────────────────────────────────────── */}
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        zoomControl
        className="absolute inset-0 h-full w-full z-0"
        style={{ minHeight: 500 }}
      >
        <TileLayer
          key={dark ? "dark" : "light"}  // force remount on theme switch
          url={tileUrl}
          attribution={tileAttribution}
          maxZoom={19}
          subdomains="abcd"
        />

        <MarkersLayer
          listings={listings}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <PanToSelected listing={selectedListing} />
      </MapContainer>

      {/* ── Legend ─────────────────────────────────────────────────── */}
      <div className="absolute right-12 top-3 z-[1000] flex items-center gap-3 rounded-full bg-card/90 backdrop-blur-md border border-border/60 px-3 py-2 text-[11px] font-semibold shadow-card pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-white border border-border shadow-sm" />
          Solo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
          Co-sharing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-[#d4773a]" />
          Selecionado
        </span>
      </div>

      {/* ── Listing count badge ────────────────────────────────────── */}
      <div className="absolute left-3 top-3 z-[1000] flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border/60 px-3 py-1.5 text-[11px] font-bold shadow-card pointer-events-none">
        <MapPin className="h-3 w-3 text-primary" />
        {listings.length} espaço{listings.length !== 1 ? "s" : ""} no mapa
      </div>

      {/* ── Selected Listing Preview Card ──────────────────────────── */}
      {selectedListing && (
        <div
          key={selectedListing.id}
          className="absolute bottom-5 left-5 z-[1000] w-[300px] animate-in slide-in-from-bottom-3 duration-300"
        >
          <Link
            to={"/listing/$id" as any}
            params={{ id: selectedListing.id } as any}
            className="group flex items-center gap-3 rounded-2xl bg-card/96 p-3 shadow-float border border-border/80 backdrop-blur-md transition-all hover:scale-[1.025] hover:border-primary/30"
          >
            <SafeImg
              src={selectedListing.image}
              alt={selectedListing.title}
              className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-start justify-between gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary leading-none truncate">
                  {selectedListing.neighborhood}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold shrink-0">
                  <Star className="h-3 w-3 fill-current text-primary" />
                  {selectedListing.rating}
                </span>
              </div>

              <h4 className="text-sm font-bold leading-snug font-display line-clamp-2">
                {selectedListing.title}
              </h4>

              {selectedListing.sharingEnabled && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                  <Users className="h-3 w-3" />
                  {selectedListing.availableSlots} vaga{(selectedListing.availableSlots ?? 0) !== 1 ? "s" : ""} de co-sharing
                </span>
              )}

              <div className="flex items-center justify-between pt-0.5">
                <p className="font-display text-sm font-extrabold">
                  ${selectedListing.price}
                  <span className="text-xs font-normal text-muted-foreground">/{selectedListing.unit}</span>
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation hint */}
          <div className="mt-1.5 flex items-center gap-1 pl-1 text-[10px] text-muted-foreground font-medium">
            <Navigation2 className="h-3 w-3" />
            {selectedListing.address}
          </div>
        </div>
      )}

      {/* ── Empty state ────────────────────────────────────────────── */}
      {listings.length === 0 && (
        <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
          <MapPin className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-muted-foreground">
            Nenhum espaço corresponde aos filtros
          </p>
        </div>
      )}
    </div>
  );
}
