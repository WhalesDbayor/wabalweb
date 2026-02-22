import { Star, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold font-display">M</span>
            </div>
            <div>
              <p className="font-display font-bold text-foreground">M & L Carpentry and Painting Corp</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-muted-foreground" />
                <p className="text-muted-foreground text-xs">7 Cressey Pl, Lynn, MA 01902</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-medium">4.8 · 39 Reviews on Google</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} M & L Carpentry and Painting Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
