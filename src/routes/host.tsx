import { useState } from "react";
import { Building2, ShieldCheck, ArrowRight, FileText, Zap } from "lucide-react";

export function HostPage() {
  const [spaceType, setSpaceType] = useState("storefront");
  const [sqft, setSqft] = useState(1500);
  const [daysPerMonth, setDaysPerMonth] = useState(8);

  const ratePerDay = spaceType === "storefront" ? 1200 : spaceType === "gallery" ? 1800 : spaceType === "rooftop" ? 2200 : 800;
  const estimatedMonthlyEarnings = Math.round(ratePerDay * daysPerMonth * 0.88); // after 12% fee

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 sm:py-12 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-ink text-surface p-8 sm:p-14 border border-border/80 shadow-float">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-3.5 py-1.5 text-xs font-bold text-primary-foreground backdrop-blur-md">
            <Building2 className="h-4 w-4 text-primary" /> PopUpCulture for Property Owners & Hosts
          </div>
          
          <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-6xl leading-tight">
            Monetize your Toronto commercial space on your terms.
          </h1>

          <p className="text-base text-surface/80 sm:text-lg max-w-2xl leading-relaxed">
            Turn vacant storefronts, lofts, galleries, and rooftop terraces into high-yielding short-term pop-up venues. Complete with $2M liability protection and instant digital leases.
          </p>

          <div className="pt-2">
            <a
              href="#estimator"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-extrabold text-primary-foreground shadow-md transition-all hover:opacity-90"
            >
              Calculate Your Earnings <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Host Earnings Estimator */}
      <section id="estimator" className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-wider text-primary font-bold">Earnings Calculator</p>
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">
            See how much your space could make
          </h2>
        </div>

        <div className="rounded-3xl bg-card p-8 border border-border/80 shadow-card grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Space Type
              </label>
              <select
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none focus:border-primary"
              >
                <option value="storefront">Retail Storefront / Pop-Up Shop</option>
                <option value="gallery">Art & Fashion Gallery Loft</option>
                <option value="rooftop">Rooftop Terrace & Outdoor Venue</option>
                <option value="studio">Photo & Creative Studio</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Approximate Size ({sqft} sq ft)
              </label>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="accent-primary h-2 w-full rounded-lg bg-secondary cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Days Rented Per Month ({daysPerMonth} days)
              </label>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                className="accent-primary h-2 w-full rounded-lg bg-secondary cursor-pointer"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-secondary/60 p-8 border border-border/60 text-center space-y-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Estimated Monthly Earnings</p>
            <div className="font-display text-5xl font-black text-primary">
              ${estimatedMonthlyEarnings.toLocaleString()} <span className="text-lg text-muted-foreground font-medium">CAD</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on Toronto market averages for {spaceType}s ({sqft} sq ft) rented {daysPerMonth} days/month. Net payout after 12% platform fee.
            </p>
            <button
              onClick={() => alert("Thank you for your interest! Host onboarding team will contact you within 24 hours.")}
              className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Start Host Application
            </button>
          </div>
        </div>
      </section>

      {/* Host Advantages */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-wider text-primary font-bold">Peace of Mind</p>
          <h2 className="font-display text-3xl font-black text-foreground">
            Host with 100% Protection & Total Control
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-card p-6 border border-border/80 space-y-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-verified/15 text-verified">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-extrabold">Automated $2M Insurance</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every booking issued on Popup Culture includes a $2,000,000 Commercial General Liability policy protecting your property against accidental damage.
            </p>
          </div>

          <div className="rounded-3xl bg-card p-6 border border-border/80 space-y-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-extrabold">Legal Space Contracts</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Guests sign enforceable Ontario short-term commercial space agreements digitally before payment authorization.
            </p>
          </div>

          <div className="rounded-3xl bg-card p-6 border border-border/80 space-y-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/15 text-amber-500">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-extrabold">Guaranteed Payouts</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Payouts are deposited directly to your bank account 24 hours after event checkout via automated Stripe processing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
