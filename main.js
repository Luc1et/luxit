(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal on load (simple, no extra content)
  const items = document.querySelectorAll("[data-reveal]");
  if (!prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const delay = Number(el.getAttribute("data-delay") || "0");
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.15 });

    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  // Subtle parallax tilt for logo area only
  const logoWrap = document.getElementById("logoWrap");
  if (!logoWrap || prefersReduced) return;

  let raf = null;

  const onMove = (ev) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = logoWrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = (ev.clientX - cx) / r.width;   // ~ -0.5..0.5
      const dy = (ev.clientY - cy) / r.height;

      const rx = Math.max(-1, Math.min(1, dy)) * -6; // deg
      const ry = Math.max(-1, Math.min(1, dx)) * 6;

      logoWrap.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  };

  const onLeave = () => {
    if (raf) cancelAnimationFrame(raf);
    logoWrap.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  logoWrap.addEventListener("mouseleave", onLeave, { passive: true });
})();
