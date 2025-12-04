document.addEventListener("DOMContentLoaded", () => {
  // 1) Logo – jemné přijetí zleva
  const logo = document.querySelector(".logo");
  if (logo) {
    requestAnimationFrame(() => {
      logo.classList.add("logo--visible");
    });
  }

  // 2) Rok ve footeru
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3) Jemné fade-up animace při scrollu (hero text + vizuál)
  const animated = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window && animated.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    animated.forEach((el) => observer.observe(el));
  } else {
    // Fallback – rovnou zobrazit
    animated.forEach((el) => el.classList.add("is-visible"));
  }

  // 4) Ultra jemný mikro-parallax na hero vizuál – prakticky neviditelný,
  // ale dává scéně hloubku.
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const maxShift = 6; // v px – maličký pohyb

    const update = () => {
      // plynulé přibližování k cíli
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      heroVisual.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(update);
    };

    const handleMove = (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (event.clientX - centerX) / rect.width;
      const y = (event.clientY - centerY) / rect.height;

      targetX = Math.max(-1, Math.min(1, x)) * maxShift;
      targetY = Math.max(-1, Math.min(1, y)) * maxShift;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    requestAnimationFrame(update);
  }
});
