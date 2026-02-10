(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  let raf = null;

  const onMove = (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = canvas.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;

      canvas.style.background = `
        radial-gradient(520px 360px at ${mx}% ${my}%,
          rgba(255, 200, 110, 0.18),
          transparent 60%)
      `;
    });
  };

  window.addEventListener("mousemove", onMove, { passive: true });
})();
