// js/mobileNavVisibility.js

/**
 * Initializes the mobile navigation visibility to prevent FOUC.
 * Removes the 'js-hidden' class from the mobile nav to reveal it after CSS is loaded.
 */
export const initMobileNavVisibility = () => {
  const mobileNav = document.querySelector(".mobile-nav");
  if (mobileNav) {
    mobileNav.classList.remove("js-hidden");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  queueMicrotask(() => {
    initMobileNavVisibility();
  });
});
