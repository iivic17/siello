// js/mobileNavVisibility.js

/**
 * Initializes the mobile navigation visibility control.
 * Ensures that the mobile nav is hidden on initial load to prevent FOUC.
 */
export const initMobileNavVisibility = () => {
  const mobileNav = document.querySelector(".mobile-nav-navigation");

  if (!mobileNav) {
    console.warn('Element with class "mobile-nav-navigation" not found.');
    return;
  }

  mobileNav.classList.remove("js-hidden");
};
