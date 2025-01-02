// js/main.js

import { initSmoothScroll } from "./smoothScroll.js";
import { initNavHighlighter } from "./navHighlighter.js";
import { initCarousel } from "./carousel.js";
import { initStickyNav, destroyStickyNav } from "./stickyNav.js";
import { setSvgAspectRatios } from "./svgAspectRatio.js";
import { initMobileNav } from "./mobileNav.js";

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNavHighlighter();
  initCarousel();
  setSvgAspectRatios();
  initMobileNav();

  // Define the media query
  const stickyNavMediaQuery = window.matchMedia("(min-width: 81.25em)");

  // Function to handle media query changes
  const handleStickyNav = (e) => {
    if (e.matches) {
      // If media query matches, initialize sticky nav
      initStickyNav();
    } else {
      // If media query does not match, destroy sticky nav
      destroyStickyNav();
    }
  };

  // Initial check
  handleStickyNav(stickyNavMediaQuery);

  // Listen for changes
  stickyNavMediaQuery.addEventListener("change", handleStickyNav);
});
