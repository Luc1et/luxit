(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const card = document.getElementById("card");
  if (!card) return;

  const resetCard = () => {
    card.style.transform = "";
  };

  const onMove = (event) => {
    const bounds = card.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  card.addEventListener("mousemove", onMove, { passive: true });
  card.addEventListener("mouseleave", resetCard);
})();
