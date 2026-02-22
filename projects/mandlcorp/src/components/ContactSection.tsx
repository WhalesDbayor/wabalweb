import { useEffect, useRef } from "react";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

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

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "7 Cressey Pl, Lynn, MA 01902",
    href: "https://maps.google.com/?q=7+Cressey+Pl+Lynn+MA+01902",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "Request a callback",
    href: "tel:+1",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Get in touch online",
    href: "#contact",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat, 7am – 6pm",
    href: null,
  },
];

export default function ContactSection() {
  const titleRef = useReveal();
  const formRef = useReveal(0.1);

  return (
    <section id="contact" className="py-28" style={{ background: "hsl(var(--foreground))" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: CTA info */}
          <div ref={titleRef} className="reveal">
            <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
              Let's Work Together
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-primary-foreground mb-6 leading-tight">
              Ready to Transform
              <br />
              <span className="gradient-text">Your Space?</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed max-w-md">
              Get a free, no-obligation quote today. We'll walk through your project and provide an honest estimate.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const inner = (
                  <div
                    className="p-5 rounded-xl border border-white/10 flex items-start gap-4 transition-all duration-300 hover:border-accent/50 hover:-translate-y-1"
                    style={{ background: "hsl(0 0% 100% / 0.05)" }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{info.label}</p>
                      <p className="text-white text-sm font-medium">{info.value}</p>
                    </div>
                  </div>
                );
                return info.href ? (
                  <a key={info.label} href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={info.label}>{inner}</div>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={formRef}
            className="reveal-right p-8 rounded-2xl"
            style={{
              background: "hsl(var(--background))",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <h3 className="font-display font-bold text-2xl text-foreground mb-6">Get Your Free Quote</h3>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(617) 555-0100"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Service Needed
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all">
                  <option>Select a service...</option>
                  <option>Custom Carpentry</option>
                  <option>Interior Painting</option>
                  <option>Exterior Painting</option>
                  <option>Home Renovation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-3d w-full py-4 rounded-xl font-display font-bold text-lg text-accent-foreground"
                style={{ background: "linear-gradient(135deg, hsl(32 85% 48%), hsl(25 75% 38%))" }}
              >
                Send My Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
