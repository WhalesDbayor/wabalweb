import { useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown, Star } from "lucide-react";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0" ref={parallaxRef}>
        <img
          src={heroBg}
          alt="Carpentry workshop"
          className="w-full h-[120%] object-cover object-center"
          style={{ marginTop: "-10%" }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Stars badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "hsl(32 85% 48% / 0.15)",
            border: "1px solid hsl(32 85% 48% / 0.4)",
            backdropFilter: "blur(10px)",
            animation: "fade-in 0.8s ease-out forwards",
          }}
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={13}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-white text-sm font-medium">
            4.8 Stars · 39 Google Reviews
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-black text-white mb-6 leading-[1.05]"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            animation: "fade-in 0.9s ease-out 0.1s both",
          }}
        >
          Crafted with
          <br />
          <span className="gradient-text">Pride & Precision</span>
        </h1>

        <p
          className="text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            animation: "fade-in 1s ease-out 0.2s both",
          }}
        >
          Lynn, MA's trusted carpentry and painting professionals. Expert craftsmanship for homes and businesses since day one.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "fade-in 1s ease-out 0.3s both" }}
        >
          <a
            href="#contact"
            className="btn-3d px-8 py-4 rounded-xl font-display font-bold text-lg text-accent-foreground"
            style={{
              background: "linear-gradient(135deg, hsl(32 85% 48%), hsl(25 75% 38%))",
              minWidth: "200px",
            }}
          >
            Get a Free Quote
          </a>
          <a
            href="#work"
            className="btn-ghost-3d px-8 py-4 rounded-xl font-display font-bold text-lg text-white border border-white/30"
            style={{
              background: "hsl(0 0% 100% / 0.1)",
              backdropFilter: "blur(10px)",
              minWidth: "200px",
            }}
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors flex flex-col items-center gap-1"
        style={{ animation: "fade-in 1.2s ease-out 0.6s both" }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
