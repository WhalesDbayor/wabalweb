import { useEffect, useRef } from "react";
import paintingWork from "@/assets/painting-work.jpg";
import carpentryWork from "@/assets/carpentry-work.jpg";
import exteriorPainting from "@/assets/exterior-painting.jpg";

const works = [
  {
    src: carpentryWork,
    alt: "Custom carpentry cabinetry",
    label: "Custom Cabinetry",
    tag: "Carpentry",
  },
  {
    src: paintingWork,
    alt: "Interior painting service",
    label: "Interior Refresh",
    tag: "Painting",
  },
  {
    src: exteriorPainting,
    alt: "Exterior house painting",
    label: "Exterior Renovation",
    tag: "Painting",
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function WorkSection() {
  const titleRef = useReveal();

  return (
    <section id="work" className="py-28" style={{ background: "hsl(var(--secondary))" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
            Our Portfolio
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground mb-5">
            Work We're Proud Of
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Every project is a story of dedication and skill, delivered right here in the Greater Lynn area.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <WorkCard key={work.label} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work, index }: { work: typeof works[0]; index: number }) {
  const ref = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="reveal-scale group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transitionDelay: `${index * 150}ms`,
        boxShadow: "var(--shadow-md)",
        aspectRatio: index === 0 ? "3/4" : "4/3",
      }}
    >
      <div className="img-zoom w-full h-full">
        <img
          src={work.src}
          alt={work.alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Tag */}
      <div className="absolute top-4 left-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold text-accent-foreground"
          style={{ background: "hsl(var(--accent))" }}
        >
          {work.tag}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        <p className="font-display font-bold text-xl text-white">{work.label}</p>
      </div>
    </div>
  );
}
