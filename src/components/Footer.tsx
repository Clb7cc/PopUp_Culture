import { Link } from "@tanstack/react-router";
import { ShieldCheck, FileText, Heart, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-surface text-muted-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <Link to={"/" as any} className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-extrabold">
                P
              </span>
              <span className="font-display text-xl font-extrabold text-foreground tracking-tight">
                Popup<span className="text-primary">Culture</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed">
              Toronto&apos;s premier platform for short-term retail pop-ups, event lofts, galleries, and photoshoots. Instant digital agreements &amp; automated host insurance included.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold pt-1">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Toronto, Ontario, Canada
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              Explore Spaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={"/search" as any} search={{ q: "Queen West" } as any} className="hover:text-primary transition-colors">
                  Queen West Retail Storefronts
                </Link>
              </li>
              <li>
                <Link to={"/search" as any} search={{ q: "Yorkville" } as any} className="hover:text-primary transition-colors">
                  Yorkville Luxury Galleries
                </Link>
              </li>
              <li>
                <Link to={"/search" as any} search={{ q: "King West" } as any} className="hover:text-primary transition-colors">
                  King West Rooftops &amp; Event Venues
                </Link>
              </li>
              <li>
                <Link to={"/search" as any} search={{ q: "Kensington" } as any} className="hover:text-primary transition-colors">
                  Kensington Photo &amp; Video Studios
                </Link>
              </li>
              <li>
                <Link to={"/search" as any} search={{ q: "Distillery" } as any} className="hover:text-primary transition-colors">
                  Distillery Culinary Pop-ups
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              For Hosts
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={"/host" as any} className="hover:text-primary transition-colors">
                  List Your Space
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary transition-colors">
                  Host Protection Guarantee ($2M CGL)
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary transition-colors">
                  Digital Space Use Contracts
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-primary transition-colors">
                  Payouts &amp; P&amp;L Calculator
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              Trust &amp; Safety
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-verified shrink-0 mt-0.5" />
                <p>
                  Every booking automatically generates a binding digital space agreement and $2M liability certificate.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p>
                  100% transparent pricing — 12% service fee with clear damage deposit holds.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Popup Culture Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Crafted for Toronto&apos;s creative entrepreneurs <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
