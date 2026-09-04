"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/Visualization.webp",
    alt: "Qualitative comparison across knowledge-intensive generation and multi-reference editing cases",
    label: "System comparison",
    caption: "Our complete stack satisfies more knowledge and editing checklist items than direct and existing agentic baselines.",
  },
  {
    src: "/images/template_cases.webp",
    alt: "Examples of WeAgent-MMGenEdit outputs for sports, finance, technology, film, and rankings",
    label: "Application cases",
    caption: "Representative knowledge-intensive generation and multi-reference editing outputs across diverse domains.",
  },
];

export function ShowcaseGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const show = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];

  return (
    <div
      className="gallery-shell"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(distance) > 45) show(active + (distance < 0 ? 1 : -1));
      }}
    >
      <div className="gallery-toolbar">
        <div className="gallery-tabs" role="tablist" aria-label="Choose a qualitative result">
          {slides.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? "active" : ""}
              onClick={() => show(index)}
              key={item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
      <div className="gallery-stage">
        <button type="button" className="gallery-arrow gallery-prev" onClick={() => show(active - 1)} aria-label="Previous example">←</button>
        <figure key={slide.src}>
          <img src={slide.src} alt={slide.alt} />
          <figcaption>{slide.caption}</figcaption>
        </figure>
        <button type="button" className="gallery-arrow gallery-next" onClick={() => show(active + 1)} aria-label="Next example">→</button>
      </div>
    </div>
  );
}
