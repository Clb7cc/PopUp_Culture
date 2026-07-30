import { Link } from "@tanstack/react-router";
import { BadgeCheck, Star, Users } from "lucide-react";
import type { Listing } from "@/lib/listings";
import { SafeImg } from "@/components/SafeImg";

export function ListingCard({ listing, compact = false }: { listing: Listing; compact?: boolean }) {
  return (
    <Link
      to={"/listing/$id" as any}
      params={{ id: listing.id } as any}
      className="group block overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float border border-border/50"
    >
      <div className={`relative overflow-hidden ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <SafeImg
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {listing.host.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-verified shadow-sm backdrop-blur-sm">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
          )}
          {listing.sharingEnabled && (listing.availableSlots ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm backdrop-blur-sm">
              <Users className="h-3.5 w-3.5" /> {listing.availableSlots} Zone{(listing.availableSlots ?? 0) > 1 ? "s" : ""} Free
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
            <Star className="h-3.5 w-3.5 fill-current text-primary" />
            {listing.rating}
          </span>
        </div>

        <p className="text-sm text-muted-foreground font-medium">{listing.neighborhood}, {listing.city}</p>
        <p className="line-clamp-1 text-sm text-muted-foreground/80">{listing.blurb}</p>

        {/* Co-artist avatars */}
        {listing.sharingEnabled && listing.coArtists && listing.coArtists.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex -space-x-2">
              {listing.coArtists.slice(0, 3).map((artist) => (
                <SafeImg
                  key={artist.id}
                  src={artist.avatar}
                  alt={artist.name}
                  className="h-5 w-5 rounded-full object-cover ring-2 ring-card"
                />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground font-semibold">
              {listing.coArtists.length} artist{listing.coArtists.length > 1 ? "s" : ""} sharing
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-2">
          <p className="font-display text-lg font-extrabold">
            ${listing.price.toLocaleString()}
            <span className="text-sm font-medium text-muted-foreground">/{listing.unit}</span>
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <Users className="h-3.5 w-3.5" /> up to {listing.capacity}
          </span>
        </div>
      </div>
    </Link>
  );
}
