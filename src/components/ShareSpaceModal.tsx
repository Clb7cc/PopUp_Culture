import { useState } from "react";
import { X, Users, BadgeCheck, Instagram, MapPin, Calendar, ChevronRight, Share2, Sparkles } from "lucide-react";
import type { Listing, CoArtist } from "@/lib/listings";

type ShareSpaceModalProps = {
  listing: Listing;
  onClose: () => void;
};

export function ShareSpaceModal({ listing, onClose }: ShareSpaceModalProps) {
  const [step, setStep] = useState<"browse" | "apply" | "success">("browse");
  const [form, setForm] = useState({
    name: "",
    artistType: "",
    instagram: "",
    dateRange: "",
    zone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  const availableZones = listing.sqft
    ? [
        `Zone A — Front Glass Display (${Math.round(listing.sqft / 3)} sqft)`,
        `Zone B — Central Studio Stage (${Math.round(listing.sqft / 3)} sqft)`,
        `Zone C — Rear Gallery & Lounge (${Math.round(listing.sqft / 3)} sqft)`,
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6 animate-in fade-in duration-200">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-card shadow-float sm:rounded-3xl border border-border/80">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Co-Sharing</p>
              <h3 className="font-display text-lg font-extrabold">Share this Space</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === "browse" && (
            <>
              {/* Concept Explainer */}
              <div className="rounded-2xl bg-primary/8 border border-primary/20 p-4 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <Sparkles className="h-4 w-4" /> How Co-Sharing Works
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  The <strong>{listing.title}</strong> is divided into <strong>{listing.availableSlots! + (listing.coArtists?.length || 0)} independent artist zones</strong>. Each artist books and manages their own section at a fraction of the full rental cost — you share the address, foot traffic, and energy, but keep your own brand identity and inventory.
                </p>
                <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> Shared address & entrance</span>
                  <span className="flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5 text-primary" /> Split cost up to {listing.availableSlots! + (listing.coArtists?.length || 0)}x cheaper</span>
                  <span className="flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-verified" /> Each artist signs own agreement</span>
                </div>
              </div>

              {/* Slots Overview */}
              <div>
                <h4 className="font-display text-base font-bold mb-3">
                  Artist Zones — {listing.sqft?.toLocaleString()} sqft total
                </h4>
                <div className="space-y-2">
                  {/* Registered artists */}
                  {listing.coArtists?.map((artist) => (
                    <RegisteredArtistRow key={artist.id} artist={artist} />
                  ))}
                  {/* Available slots */}
                  {Array.from({ length: listing.availableSlots || 0 }).map((_, i) => (
                    <div
                      key={`slot-${i}`}
                      className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-border/80 bg-secondary/30 px-4 py-3.5"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 shrink-0">
                        <span className="text-xl">✨</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground/70">
                          Zone {String.fromCharCode(65 + (listing.coArtists?.length || 0) + i)} — Available
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {availableZones[(listing.coArtists?.length || 0) + i]?.split("—")[1]?.trim() || "~" + Math.round((listing.sqft || 0) / 3) + " sqft"}
                        </p>
                      </div>
                      <button
                        onClick={() => setStep("apply")}
                        className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
                      >
                        Claim Zone <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep("apply")}
                className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Apply to Join This Space
              </button>
            </>
          )}

          {step === "apply" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-2xl bg-secondary/50 border border-border/60 px-4 py-3 text-xs text-muted-foreground font-medium">
                Applying to share <strong className="text-foreground">{listing.title}</strong> — you'll receive a separate digital space agreement and insurance certificate.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Artist / Brand Name"
                  placeholder="e.g. Nova Studio"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <FormField
                  label="Type of Art / Product"
                  placeholder="e.g. Jewellery & Accessories"
                  value={form.artistType}
                  onChange={(v) => setForm({ ...form, artistType: v })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Instagram Handle (optional)"
                  placeholder="@yourhandle"
                  value={form.instagram}
                  onChange={(v) => setForm({ ...form, instagram: v })}
                />
                <FormField
                  label="Desired Dates"
                  placeholder="e.g. Aug 8–10, 2026"
                  value={form.dateRange}
                  onChange={(v) => setForm({ ...form, dateRange: v })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                  Preferred Zone
                </label>
                <select
                  value={form.zone}
                  onChange={(e) => setForm({ ...form, zone: e.target.value })}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary"
                >
                  <option value="">Select a zone...</option>
                  {Array.from({ length: listing.availableSlots || 0 }).map((_, i) => {
                    const label = availableZones[(listing.coArtists?.length || 0) + i] || `Zone ${String.fromCharCode(65 + (listing.coArtists?.length || 0) + i)}`;
                    return <option key={i} value={label}>{label}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                  Tell the host about your pop-up
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Briefly describe what you'll be selling and how your brand complements the other artists..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("browse")}
                  className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-bold hover:bg-secondary transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="py-8 text-center space-y-5">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-verified/15 text-verified ring-8 ring-verified/5">
                <BadgeCheck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-display text-2xl font-extrabold">Application Sent!</h4>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                  Your co-sharing request has been sent to <strong>{listing.host.name}</strong>. They'll respond within {listing.host.responseTime.replace("Responds", "").trim()}.
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4 text-left text-xs space-y-2 text-muted-foreground border border-border/40">
                <div className="flex justify-between"><span>Application ID</span><span className="font-bold text-foreground">PC-CO-7293</span></div>
                <div className="flex justify-between"><span>Your agreement</span><span className="font-bold text-foreground">Sent to email on approval</span></div>
                <div className="flex justify-between"><span>Insurance certificate</span><span className="font-bold text-foreground">Issued on payment</span></div>
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-full border border-border px-5 py-3.5 text-sm font-bold transition-colors hover:bg-secondary"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RegisteredArtistRow({ artist }: { artist: CoArtist }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm">
      <div className="relative shrink-0">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="h-12 w-12 rounded-xl object-cover"
        />
        {artist.verified && (
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-card">
            <BadgeCheck className="h-4 w-4 text-verified" />
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-bold text-sm truncate">{artist.name}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{artist.type}</p>
        {artist.instagram && (
          <p className="text-xs text-primary font-semibold">{artist.instagram}</p>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          {artist.dateRange}
        </div>
        {artist.section && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{artist.section}</p>
        )}
        <span className="inline-block mt-1 rounded-full bg-verified/10 px-2 py-0.5 text-[10px] font-bold text-verified">
          Confirmed
        </span>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
