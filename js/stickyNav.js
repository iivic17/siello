// js/stickyNav.js

let navObserver = null;

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

  // Prevent multiple observers
  if (navObserver) {
    return;
  }

  navObserver = new IntersectionObserver(
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

/**
 * Destroys the sticky navigation by disconnecting the IntersectionObserver.
 */
export const destroyStickyNav = () => {
  if (navObserver) {
    navObserver.disconnect();
    navObserver = null;
  }

  const nav = document.querySelector(".sticky-nav");
  if (nav) {
    nav.classList.remove("fixed");
  }
};
