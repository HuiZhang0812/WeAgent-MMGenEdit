(() => {
  const slides = [
    {
      src: 'static/images/Visualization.webp',
      alt: 'Qualitative comparison across knowledge-intensive generation and multi-reference editing cases',
      caption: 'Our complete stack satisfies more knowledge and editing checklist items than direct and existing agentic baselines.',
    },
    {
      src: 'static/images/template_cases.webp',
      alt: 'Examples of WeAgent-MMGenEdit outputs for sports, finance, technology, film, and rankings',
      caption: 'Representative knowledge-intensive generation and multi-reference editing outputs across diverse domains.',
    },
  ];

  const shell = document.querySelector('.gallery-shell');
  if (!shell) return;

  const slide = shell.querySelector('.gallery-slide');
  const image = shell.querySelector('#gallery-image');
  const caption = shell.querySelector('#gallery-caption');
  const counter = shell.querySelector('.gallery-counter');
  const tabs = [...shell.querySelectorAll('.gallery-tabs button')];
  const previous = shell.querySelector('.gallery-prev');
  const next = shell.querySelector('.gallery-next');
  let active = 0;
  let paused = false;
  let touchStartX = null;

  const render = (index) => {
    active = (index + slides.length) % slides.length;
    const item = slides[active];
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.caption;
    counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === active;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    slide.style.animation = 'none';
    void slide.offsetWidth;
    slide.style.animation = '';
  };

  previous.addEventListener('click', () => render(active - 1));
  next.addEventListener('click', () => render(active + 1));
  tabs.forEach((tab, index) => tab.addEventListener('click', () => render(index)));

  shell.addEventListener('mouseenter', () => { paused = true; });
  shell.addEventListener('mouseleave', () => { paused = false; });
  shell.addEventListener('focusin', () => { paused = true; });
  shell.addEventListener('focusout', () => { paused = false; });
  shell.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  shell.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) >= 45) render(active + (distance < 0 ? 1 : -1));
  }, { passive: true });

  window.setInterval(() => {
    if (!paused) render(active + 1);
  }, 7000);
})();
