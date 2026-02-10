// LUXIT – V1 motion & interactions
(() => {
  // year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Scroll reveal
  const items = document.querySelectorAll("[data-animate]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const delay = Number(el.getAttribute("data-delay") || "0");
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");

          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));
  } else {
    // no motion
    items.forEach((el) => el.classList.add("is-visible"));
  }

  // Subtle parallax on hero image (decor only)
  const hero = document.getElementById("heroParallax");
  if (hero && !prefersReduced) {
    let rafId = null;

    const onMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();

        // center point of hero wrap
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = (e.clientX - cx) / rect.width;  // -0.5..0.5-ish
        const dy = (e.clientY - cy) / rect.height;

        const max = 10; // px
        const tx = Math.max(-1, Math.min(1, dx)) * max;
        const ty = Math.max(-1, Math.min(1, dy)) * max;

        hero.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      hero.style.transform = "translate3d(0,0,0)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave, { passive: true });
  }
})();
