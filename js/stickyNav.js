// js/stickyNav.js

/**
 * Initializes the sticky navigation bar using IntersectionObserver.
 */
export const initStickyNav = () => {
  const nav = document.querySelector(".sticky-nav");
  const sentinel = document.querySelector(".nav-sentinel");

  if (!nav || !sentinel) {
    console.warn("Sticky navigation elements not found.");
    return;
  }

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        nav.classList.toggle("fixed", !entry.isIntersecting);
      });
    },
    {
      root: null,
      threshold: 0,
    }
  );

  navObserver.observe(sentinel);
};
