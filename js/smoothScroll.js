// js/smoothScroll.js

/**
 * Initializes smooth scrolling for all internal anchor links.
 */
export const initSmoothScroll = () => {
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  
    allAnchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
  
        // If the href is just "#", prevent default behavior.
        if (href === "#") {
          event.preventDefault();
          return;
        }
  
        // Smooth scroll to the target element if it exists.
        if (href.startsWith("#")) {
          const targetId = href.slice(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            event.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  };
  