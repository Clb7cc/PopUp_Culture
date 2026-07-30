import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  BadgeCheck, Star, Users, ShieldCheck, Calendar, CheckCircle2,
  ArrowLeft, ChevronRight, Share2, Heart, Info, MapPin, UserPlus,
  Sparkles, ChevronLeft
} from "lucide-react";
import { getListingById, LISTINGS } from "@/lib/listings";
import { BookingModal, buildQuote, QuoteTable } from "@/components/BookingModal";
import { ShareSpaceModal } from "@/components/ShareSpaceModal";
import { SafeImg } from "@/components/SafeImg";

export function ListingDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const listing = getListingById(params.id || "") || LISTINGS[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [duration, setDuration] = useState<number>(listing.unit === "day" ? 2 : 5);
  const [bookingDate, setBookingDate] = useState<string>("2026-08-15");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const allImages = listing.images.length > 0 ? listing.images : [listing.image];
  const quote = buildQuote(listing, duration);

  const prevImage = () => setSelectedImage((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const nextImage = () => setSelectedImage((i) => (i === allImages.length - 1 ? 0 : i + 1));

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 space-y-8">
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <Link to={"/search" as any} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to search
        </Link>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 hover:bg-secondary transition-colors text-foreground">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors text-foreground ${saved ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card hover:bg-secondary"}`}
          >
            <Heart className={`h-3.5 w-3.5 transition-all ${saved ? "fill-primary text-primary" : ""}`} /> {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {listing.category} Pop-up
          </span>
          {listing.sharingEnabled && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1 text-xs font-bold text-verified border border-verified/20">
              <Users className="h-3.5 w-3.5" /> Co-Sharing Available · {listing.availableSlots} slot{listing.availableSlots !== 1 ? "s" : ""} open
            </span>
          )}
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {listing.neighborhood}, {listing.city}
          </span>
        </div>
        <h1 className="font-display text-3xl font-black sm:text-5xl text-foreground leading-tight">
          {listing.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold pt-1">
          <span className="inline-flex items-center gap-1 text-foreground">
            <Star className="h-4 w-4 fill-current text-primary" />
            {listing.rating} <span className="text-muted-foreground font-normal">({listing.reviewsCount} reviews)</span>
          </span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">{listing.sqft.toLocaleString()} sq ft</span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" /> Up to {listing.capacity} guests
          </span>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden border border-border/80 shadow-card">
        {/* Main image with navigation arrows */}
        <div className="md:col-span-2 relative aspect-[16/10] overflow-hidden group">
          <SafeImg
            src={allImages[selectedImage]}
            alt={listing.title}
            className="h-full w-full object-cover transition-all duration-500"
          />
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {allImages.map((_, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`h-1.5 rounded-full transition-all ${i === selectedImage ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
                ))}
              </div>
            </>
          )}
        </div>
        {/* Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 p-1.5 bg-secondary/20">
          {allImages.slice(0, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative aspect-[16/10] overflow-hidden rounded-2xl border-2 transition-all ${selectedImage === i ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-75 hover:opacity-100"}`}
            >
              <SafeImg src={img} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Details */}
        <div className="lg:col-span-7 space-y-10">

          {/* Host */}
          <div className="flex items-center gap-4 rounded-3xl bg-card p-5 border border-border/80 shadow-card">
            <SafeImg src={listing.host.avatar} alt={listing.host.name} className="h-14 w-14 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-lg font-extrabold">{listing.host.name}</h3>
                {listing.host.verified && <BadgeCheck className="h-4 w-4 text-verified shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground font-medium line-clamp-2 mt-0.5">{listing.host.bio}</p>
              <p className="text-xs text-primary font-bold mt-1">{listing.host.responseTime}</p>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-extrabold">About this space</h2>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">{listing.description}</p>
            <div className="rounded-2xl bg-secondary/50 p-4 border border-border/60 text-xs font-semibold text-muted-foreground flex items-start gap-2">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Exact address ({listing.address}) is shared instantly upon booking confirmation.</span>
            </div>
          </div>

          {/* ===== CO-SHARING SECTION ===== */}
          {listing.sharingEnabled && (
            <div className="space-y-4 border-t border-border/60 pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-extrabold">Co-Sharing Artists</h2>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {listing.coArtists?.length || 0} artist{(listing.coArtists?.length || 0) !== 1 ? "s" : ""} confirmed · {listing.availableSlots} zone{listing.availableSlots !== 1 ? "s" : ""} still available
                  </p>
                </div>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Join as Co-Artist
                </button>
              </div>

              {/* Co-sharing explainer */}
              <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-verified/5 border border-primary/15 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" /> What is co-sharing?
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This space is divided into <strong className="text-foreground">{(listing.coArtists?.length || 0) + (listing.availableSlots || 0)} independent artist zones</strong>. Each artist books their own section, signs their own agreement, and gets their own insurance — at a fraction of the full rental cost. You share the address and foot traffic, but keep your own brand identity.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-xl bg-background/60 p-2.5 text-center border border-border/40">
                    <p className="font-display text-lg font-black text-primary">3x</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">More affordable</p>
                  </div>
                  <div className="rounded-xl bg-background/60 p-2.5 text-center border border-border/40">
                    <p className="font-display text-lg font-black text-primary">100%</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Own identity</p>
                  </div>
                  <div className="rounded-xl bg-background/60 p-2.5 text-center border border-border/40">
                    <p className="font-display text-lg font-black text-primary">$2M</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Each insured</p>
                  </div>
                </div>
              </div>

              {/* Registered artists */}
              {listing.coArtists && listing.coArtists.length > 0 && (
                <div className="space-y-2">
                  {listing.coArtists.map((artist) => (
                    <div key={artist.id} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm">
                      <div className="relative shrink-0">
                        <img src={artist.avatar} alt={artist.name} className="h-12 w-12 rounded-xl object-cover" />
                        {artist.verified && (
                          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-card">
                            <BadgeCheck className="h-4 w-4 text-verified" />
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm">{artist.name}</p>
                        <p className="text-xs text-muted-foreground">{artist.type}</p>
                        {artist.instagram && <p className="text-xs text-primary font-semibold mt-0.5">{artist.instagram}</p>}
                      </div>
                      <div className="text-right shrink-0 space-y-1">
                        <div className="flex items-center gap-1 text-xs font-semibold text-foreground justify-end">
                          <Calendar className="h-3.5 w-3.5 text-primary" />{artist.dateRange}
                        </div>
                        {artist.section && <p className="text-[11px] text-muted-foreground">{artist.section}</p>}
                        <span className="inline-block rounded-full bg-verified/10 px-2 py-0.5 text-[10px] font-bold text-verified">Confirmed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Available slots */}
              {Array.from({ length: listing.availableSlots || 0 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 px-4 py-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 shrink-0 text-xl">✨</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground/80">Zone {String.fromCharCode(65 + (listing.coArtists?.length || 0) + i)} — Available</p>
                    <p className="text-xs text-muted-foreground">~{Math.round(listing.sqft / ((listing.coArtists?.length || 0) + (listing.availableSlots || 0)))} sqft · Any dates from Aug 2026</p>
                  </div>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
                  >
                    Claim <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full rounded-full border-2 border-primary/30 bg-primary/5 py-3.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <UserPlus className="inline h-4 w-4 mr-1.5" /> Apply to Share this Space
              </button>
            </div>
          )}

          {/* Amenities */}
          <div className="space-y-4 border-t border-border/60 pt-8">
            <h2 className="font-display text-2xl font-extrabold">Space Specs & Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {listing.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2.5 rounded-xl bg-card p-3.5 border border-border/60 text-xs font-bold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-verified shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-4 border-t border-border/60 pt-8">
            <h2 className="font-display text-2xl font-extrabold">House Rules & Terms</h2>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
              {listing.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Booking Widget */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl bg-card p-6 shadow-float border border-border/80 space-y-6">
            <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
              <div>
                <span className="font-display text-3xl font-black text-foreground">${listing.price}</span>
                <span className="text-sm text-muted-foreground font-semibold">/{listing.unit}</span>
                {listing.sharingEnabled && (
                  <span className="ml-2 text-xs text-muted-foreground">per zone</span>
                )}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                <Star className="h-3.5 w-3.5 fill-current text-primary" />
                {listing.rating} <span className="text-muted-foreground font-normal">({listing.reviewsCount})</span>
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> Start Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between mb-1.5">
                  <span>Duration ({listing.unit}s)</span>
                  <span className="text-foreground">{duration} {listing.unit}{duration > 1 ? "s" : ""}</span>
                </label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setDuration(Math.max(1, duration - 1))} className="grid h-10 w-12 place-items-center rounded-xl border border-border bg-secondary font-bold text-lg hover:bg-border transition-colors">-</button>
                  <div className="flex-1 text-center font-display text-lg font-extrabold bg-background py-2 rounded-xl border border-border">
                    {duration} {listing.unit}{duration > 1 ? "s" : ""}
                  </div>
                  <button onClick={() => setDuration(duration + 1)} className="grid h-10 w-12 place-items-center rounded-xl border border-border bg-secondary font-bold text-lg hover:bg-border transition-colors">+</button>
                </div>
              </div>
            </div>

            <QuoteTable listing={listing} quote={quote} />

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-base font-extrabold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
            >
              Reserve Space & Sign Contract <ChevronRight className="h-4 w-4" />
            </button>

            {listing.sharingEnabled && (
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary/30 bg-primary/5 px-6 py-3.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <UserPlus className="h-4 w-4" /> Share this Space with Others
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground font-semibold">
              <ShieldCheck className="h-4 w-4 text-verified shrink-0" />
              <span>Includes $2M automatic insurance certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          listing={listing}
          quote={quote}
          date={bookingDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Share Space Modal */}
      {isShareModalOpen && listing.sharingEnabled && (
        <ShareSpaceModal
          listing={listing}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}
