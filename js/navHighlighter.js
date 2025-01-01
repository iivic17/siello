// js/navHighlighter.js

import { throttle } from "./utils.js";

let currentActive = null;

/**
 * Initializes the navigation link highlighter using IntersectionObserver.
 */
export const initNavHighlighter = () => {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) {
    console.warn("No sections or navigation links found for highlighting.");
    return;
  }

  /**
   * Maps section IDs to their corresponding navigation links.
   */
  const sectionToNavLink = {};
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href?.startsWith("#")) {
      const sectionId = href.slice(1);
      sectionToNavLink[sectionId] = link;
    }
  });

  /**
   * Callback for IntersectionObserver.
   * @param {IntersectionObserverEntry[]} entries
   */
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      const navLink = sectionToNavLink[sectionId];

      if (!navLink) return;

      if (entry.isIntersecting) {
        // Remove 'active' class and 'aria-current' from the previously active link.
        if (currentActive && currentActive !== navLink) {
          currentActive.closest("li").classList.remove("active");
          currentActive.removeAttribute("aria-current");
        }

        // Add 'active' class and 'aria-current' to the new active link.
        navLink.closest("li").classList.add("active");
        navLink.setAttribute("aria-current", "page");

        // Update the current active link reference.
        currentActive = navLink;
      } else if (navLink === currentActive) {
        // Remove 'active' class when section is not intersecting.
        navLink.closest("li").classList.remove("active");
        navLink.removeAttribute("aria-current");
        currentActive = null;
      }
    });
  };

  /**
   * Creates an IntersectionObserver with specified options.
   */
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.6, // 60% of the section is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  /**
   * Fallback for scenarios where IntersectionObserver might not work as expected.
   * Ensures at least one link is active based on initial scroll position.
   */
  const fallbackSetActiveNavLink = throttle(() => {
    let activeSection = null;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight * 0.4 &&
        rect.bottom >= window.innerHeight * 0.4
      ) {
        activeSection = section;
      }
    });

    if (activeSection) {
      const sectionId = activeSection.id;
      const navLink = sectionToNavLink[sectionId];
      if (navLink && navLink !== currentActive) {
        if (currentActive) {
          currentActive.closest("li").classList.remove("active");
          currentActive.removeAttribute("aria-current");
        }
        navLink.closest("li").classList.add("active");
        navLink.setAttribute("aria-current", "page");
        currentActive = navLink;
      }
    }
  }, 200);

  window.addEventListener("scroll", fallbackSetActiveNavLink, {
    passive: true,
  });

  // Initial invocation to set the active link on page load.
  fallbackSetActiveNavLink();
};
