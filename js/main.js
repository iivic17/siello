// js/main.js

import { initSmoothScroll } from "./smoothScroll.js";
import { initNavHighlighter } from "./navHighlighter.js";
import { initCarousel } from "./carousel.js";
import { initStickyNav } from "./stickyNav.js";
import { setSvgAspectRatios } from "./svgAspectRatio.js";

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNavHighlighter();
  initCarousel();
  initStickyNav();
  setSvgAspectRatios();
});
