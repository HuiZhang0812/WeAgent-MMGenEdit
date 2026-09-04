(() => {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const tabs = [...carousel.querySelectorAll('.carousel-tabs button')];
    const counter = carousel.querySelector('.carousel-counter');
    const previous = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    const autoplayDelay = Number(carousel.dataset.autoplay || 0);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = 0;
    let paused = false;
    let touchStartX = null;

    if (slides.length === 0) return;

    const render = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === active;
        slide.hidden = !isActive;
        if (isActive) {
          slide.style.animation = 'none';
          void slide.offsetWidth;
          slide.style.animation = '';
        }
      });
      tabs.forEach((tab, tabIndex) => {
        const isActive = tabIndex === active;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
      if (counter) {
        counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      }
    };

    previous?.addEventListener('click', () => render(active - 1));
    next?.addEventListener('click', () => render(active + 1));
    tabs.forEach((tab, index) => tab.addEventListener('click', () => render(index)));

    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { paused = false; });
    carousel.addEventListener('focusin', () => { paused = true; });
    carousel.addEventListener('focusout', () => { paused = false; });
    carousel.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) >= 45) render(active + (distance < 0 ? 1 : -1));
    }, { passive: true });

    if (autoplayDelay > 0 && !reduceMotion) {
      window.setInterval(() => {
        if (!paused) render(active + 1);
      }, autoplayDelay);
    }

    render(0);
  });
})();
