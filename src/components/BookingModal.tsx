import { useEffect, useState } from "react";
import { BadgeCheck, Check, CreditCard, FileSignature, Loader2, X } from "lucide-react";
import type { Listing } from "@/lib/listings";

export type Quote = {
  duration: number;
  base: number;
  serviceFee: number;
  cleaning: number;
  tax: number;
  total: number;
  deposit: number;
};

export function buildQuote(listing: Listing, duration: number): Quote {
  const base = listing.price * duration;
  const serviceFee = Math.round(base * 0.12);
  const cleaning = listing.unit === "day" ? 120 : 45;
  const tax = Math.round((base + serviceFee + cleaning) * 0.13);
  return {
    duration,
    base,
    serviceFee,
    cleaning,
    tax,
    total: base + serviceFee + cleaning + tax,
    deposit: listing.deposit,
  };
}

const STEPS = ["Review", "Agreement", "Payment", "Confirmed"];

export function BookingModal({
  listing,
  quote,
  date,
  onClose,
}: {
  listing: Listing;
  quote: Quote;
  date: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postal, setPostal] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(3);
    }, 1600);
  };

  const confirmationId = `PC-${Math.floor(1000 + Math.random() * 9000)}-TOR`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-in fade-in duration-200">
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-card shadow-float sm:rounded-3xl border border-border/80">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              Step {Math.min(step + 1, 4)} of 4
            </p>
            <h3 className="font-display text-lg font-extrabold">{STEPS[step]}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking"
            className="rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 px-6 pt-4">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>

        <div className="space-y-5 p-6">
          {/* STEP 1: REVIEW */}
          {step === 0 && (
            <>
              <div className="flex gap-4 rounded-2xl bg-secondary/60 p-4 border border-border/40">
                <img
                  src={listing.image}
                  alt={listing.title}
                  loading="lazy"
                  className="h-20 w-24 rounded-xl object-cover shrink-0"
                />
                <div className="text-sm">
                  <p className="font-display font-bold text-base leading-tight">{listing.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{listing.neighborhood}, {listing.city}</p>
                  <p className="mt-1.5 text-muted-foreground font-medium text-xs">
                    {date} · {quote.duration} {listing.unit}{quote.duration > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <QuoteTable listing={listing} quote={quote} />
              <button
                onClick={() => setStep(1)}
                className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 shadow-sm"
              >
                Continue to agreement →
              </button>
            </>
          )}

          {/* STEP 2: AGREEMENT */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-2 text-sm font-bold">
                <FileSignature className="h-4 w-4 text-primary" /> Short-Term Space Use Agreement
              </div>
              <div className="h-52 space-y-3 overflow-y-auto rounded-2xl border border-border bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground font-sans">
                <p>
                  This agreement is made between <strong>{listing.host.name}</strong> (&ldquo;Host&rdquo;) and the
                  booking creator (&ldquo;Guest&rdquo;) for use of <strong>{listing.title}</strong>,{" "}
                  {listing.neighborhood}, Toronto on {date}.
                </p>
                <p>1. <strong>Term.</strong> Guest may occupy the space for {quote.duration} {listing.unit}{quote.duration > 1 ? "s" : ""} including load-in and load-out.</p>
                <p>2. <strong>Insurance.</strong> {listing.host.insurance}. A certificate is issued automatically by Popup Culture at payment and shared with the Host.</p>
                <p>3. <strong>Damage deposit.</strong> ${listing.deposit.toLocaleString()} is placed on hold and released 48 hours after checkout absent a claim.</p>
                <p>4. <strong>House rules.</strong> {listing.rules.join(". ")}.</p>
                {listing.sharingEnabled && (
                  <p>5. <strong>Co-sharing clause.</strong> This is a co-shared venue. Guest agrees to respect other registered co-tenants' zones and understands that shared common areas (entrance, washrooms, loading bay) are available to all registered artists.</p>
                )}
                <p>{listing.sharingEnabled ? "6." : "5."} <strong>Cancellation.</strong> Full refund up to 7 days before start; 50% within 7 days; non-refundable within 48 hours.</p>
                <p>{listing.sharingEnabled ? "7." : "6."} <strong>Platform fee.</strong> Popup Culture retains a 12% service fee, disclosed in the price breakdown, and remits the balance to the Host after checkout.</p>
              </div>
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <span className="text-muted-foreground text-xs leading-normal">
                  I have read the agreement and accept the insurance, deposit, and house rule terms{listing.sharingEnabled ? ", including the co-sharing clause" : ""}.
                </span>
              </label>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Type your full name to sign
                </label>
                <input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Alex Rivera"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-lg italic outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>
              <button
                disabled={!agreed || signature.trim().length < 3}
                onClick={() => setStep(2)}
                className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 shadow-sm"
              >
                Sign digital agreement →
              </button>
            </>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 2 && (
            <>
              <div className="rounded-2xl border border-verified/30 bg-verified/10 p-3.5 text-xs text-verified font-medium">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <BadgeCheck className="h-4 w-4 shrink-0" /> Agreement signed digitally by {signature}
                </span>
              </div>
              <div className="space-y-3">
                <CardField label="Card number" placeholder="4242 4242 4242 4242" value={cardNum} onChange={setCardNum} />
                <div className="grid grid-cols-2 gap-3">
                  <CardField label="Expiry" placeholder="09 / 28" value={expiry} onChange={setExpiry} />
                  <CardField label="CVC" placeholder="123" value={cvc} onChange={setCvc} />
                </div>
                <CardField label="Billing postal code" placeholder="M6K 1X8" value={postal} onChange={setPostal} />
              </div>
              <QuoteTable listing={listing} quote={quote} />
              <button
                onClick={pay}
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70 shadow-sm"
              >
                {processing ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Authorizing payment…</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Pay ${quote.total.toLocaleString()} CAD</>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Refundable deposit of ${quote.deposit.toLocaleString()} is held on card, not charged.
              </p>
            </>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === 3 && (
            <div className="space-y-5 py-4 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-verified/15 text-verified ring-8 ring-verified/5">
                <Check className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-display text-2xl font-extrabold">Your space is booked!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {listing.title} · {date} · {quote.duration} {listing.unit}{quote.duration > 1 ? "s" : ""}
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4 text-left text-sm space-y-2 border border-border/40">
                <Row label="Confirmation ID" value={confirmationId} />
                <Row label="Signed agreement" value="Sent to your email" />
                <Row label="Insurance certificate" value="Issued ($2M CGL)" />
                {listing.sharingEnabled && <Row label="Co-sharing info" value="Host will connect co-artists" />}
                <Row label="Host response" value={listing.host.responseTime} />
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-full border border-ink/15 bg-background px-5 py-3.5 text-sm font-bold transition-colors hover:bg-secondary shadow-sm"
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

function CardField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-0.5 text-sm">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

export function QuoteTable({ listing, quote }: { listing: Listing; quote: Quote }) {
  return (
    <div className="space-y-2 text-sm bg-secondary/30 p-4 rounded-2xl border border-border/40">
      <Row
        label={`$${listing.price.toLocaleString()} × ${quote.duration} ${listing.unit}${quote.duration > 1 ? "s" : ""}`}
        value={`$${quote.base.toLocaleString()}`}
      />
      <Row label="Platform commission (12%)" value={`$${quote.serviceFee.toLocaleString()}`} />
      <Row label="Cleaning & reset" value={`$${quote.cleaning.toLocaleString()}`} />
      <Row label="HST (13%)" value={`$${quote.tax.toLocaleString()}`} />
      <div className="mt-2 flex justify-between border-t border-border pt-3 font-display text-base font-extrabold text-foreground">
        <span>Total due today</span>
        <span className="text-primary">${quote.total.toLocaleString()} CAD</span>
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Refundable damage deposit of ${quote.deposit.toLocaleString()} held on your card.
      </p>
    </div>
  );
}
