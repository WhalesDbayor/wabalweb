import { useEffect, useRef } from "react";
import { Hammer, Paintbrush, Home, Wrench, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Custom Carpentry",
    description:
      "Bespoke woodwork, custom cabinetry, trim, moldings, and structural carpentry crafted to the highest standard.",
    highlights: ["Custom cabinets & built-ins", "Crown molding & trim", "Hardwood flooring", "Deck & porch construction"],
    color: "hsl(32 85% 48%)",
  },
  {
    icon: Paintbrush,
    title: "Interior Painting",
    description:
      "Flawless interior finishes with premium paints, meticulous prep work, and clean, crisp results every time.",
    highlights: ["Walls, ceilings & trim", "Faux finishes & textures", "Cabinet refinishing", "Color consultation"],
    color: "hsl(200 70% 45%)",
  },
  {
    icon: Home,
    title: "Exterior Painting",
    description:
      "Weather-resistant exterior coatings that protect and beautify your home's façade for years to come.",
    highlights: ["Full exterior painting", "Power washing & prep", "Deck staining & sealing", "Siding & shutters"],
    color: "hsl(155 60% 40%)",
  },
  {
    icon: Wrench,
    title: "Home Renovation",
    description:
      "Complete renovation projects combining expert carpentry and painting for a total transformation.",
    highlights: ["Kitchen & bathroom remodels", "Basement finishing", "Room additions", "Full home renovation"],
    color: "hsl(280 60% 50%)",
  },
];

function useReveal() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useReveal();
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className="reveal group"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className="relative p-8 rounded-2xl border border-border h-full flex flex-col transition-all duration-500 hover:-translate-y-2"
        style={{
          background: "var(--gradient-card)",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `var(--shadow-lg), 0 0 0 1px ${service.color}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)";
        }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${service.color}18`, border: `1.5px solid ${service.color}30` }}
        >
          <Icon size={24} style={{ color: service.color }} />
        </div>

        <h3 className="font-display font-bold text-xl text-foreground mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

        <ul className="flex flex-col gap-2 mt-auto">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-foreground/80">
              <ChevronRight size={13} style={{ color: service.color }} className="shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const titleRef = useReveal();

  return (
    <section id="services" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
            What We Do
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground mb-5">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            From raw wood to polished walls, we bring skill, care, and craftsmanship to every project in Lynn and the surrounding areas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
