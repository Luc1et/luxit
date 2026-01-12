document.addEventListener("DOMContentLoaded", () => {
  // Rok ve footeru
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Logo „přijede“ zleva
  const logo = document.querySelector(".logo");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (logo && !reduceMotion) {
    requestAnimationFrame(() => logo.classList.add("logo--visible"));
  } else if (logo) {
    logo.classList.add("logo--visible");
  }

  // Jemný fade-up (bez parallax)
  const animated = document.querySelectorAll("[data-animate]");
  if (!animated.length) return;

  if (reduceMotion) {
    animated.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("is-visible"));
  }
});
