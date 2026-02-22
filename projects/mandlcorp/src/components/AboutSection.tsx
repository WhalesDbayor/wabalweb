import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const stats = [
  { value: "4.8", label: "Google Rating", suffix: "★" },
  { value: "39", label: "Reviews", suffix: "+" },
  { value: "15", label: "Years Experience", suffix: "+" },
  { value: "500", label: "Projects Completed", suffix: "+" },
];

const reviews = [
  {
    name: "Maria S.",
    rating: 5,
    text: "M & L did an amazing job painting our entire house. Clean, professional, and the results were outstanding. Highly recommend!",
  },
  {
    name: "James R.",
    rating: 5,
    text: "They built custom cabinets for our kitchen renovation. The craftsmanship was exceptional and they finished on time and on budget.",
  },
  {
    name: "Patricia L.",
    rating: 5,
    text: "Best contractors in Lynn! They repainted our exterior and it looks brand new. Very professional and courteous team.",
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

function AnimatedStat({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="font-display font-black text-5xl md:text-6xl text-accent mb-2">
        {stat.value}
        <span className="text-3xl">{stat.suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
    </div>
  );
}

export default function AboutSection() {
  const titleRef = useReveal();

  return (
    <section id="about" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats bar */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24 py-12 px-8 rounded-2xl"
          style={{
            background: "hsl(var(--secondary))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>

        {/* About content */}
        <div ref={titleRef} className="reveal grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
              About Us
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Built on Trust,<br />
              <span className="gradient-text">Delivered with Care</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              M & L Carpentry and Painting Corp is a family-owned business proudly serving Lynn, MA and the surrounding communities. We specialize in expert carpentry and professional painting services that transform homes and commercial spaces.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every project, big or small, receives our full attention and dedication. Our team combines traditional craftsmanship with modern techniques to deliver results that exceed expectations.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>7 Cressey Pl, Lynn, MA 01902, United States</span>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex flex-col gap-4">
            {reviews.map((review, i) => (
              <ReviewCard key={review.name} review={review} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, delay }: { review: typeof reviews[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`relative p-6 rounded-xl border border-border transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-sm)" }}
    >
      <Quote size={20} className="text-accent/40 absolute top-4 right-4" />
      <div className="flex mb-2">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed mb-3">"{review.text}"</p>
      <p className="text-accent text-sm font-semibold">— {review.name}</p>
    </div>
  );
}
