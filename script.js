document.addEventListener("DOMContentLoaded", () => {
    // SELECTORS
    // 1) All links that point to an ID (including CTA, logo, nav links, etc.)
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    // 2) Only nav links (for the "active" highlight)
    const navLinks = document.querySelectorAll("a.nav-link");
    // 3) All sections that have an id, for Intersection Observer
    const sections = document.querySelectorAll("section[id]");
  
    /* ---------------------------------------
     * 1. SMOOTH SCROLL for ANY # LINK
     * --------------------------------------- */
    allAnchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        // If just "#", likely a placeholder—abort.
        if (href === "#") {
          event.preventDefault();
          return;
        }
  
        // Otherwise, do normal smooth scroll if it matches an ID on the page
        if (href.startsWith("#")) {
          // e.g. href="#contact"
          const targetId = href.substring(1); // 'contact'
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            event.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  
    /* ---------------------------------------
     * 2. HIGHLIGHT ACTIVE NAV LINK
     *    (Intersection Observer)
     * --------------------------------------- */
    // We only highlight links in the nav, so we look for nav-links
    const highlightOptions = {
      root: null,
      // rootMargin so highlight triggers around ~center of viewport
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
  
    const highlightObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the current section is in view
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          // Find the corresponding nav link
          const navLink = document.querySelector(`a.nav-link[href="#${sectionId}"]`);
          if (navLink) {
            // Remove 'active' from all nav links
            navLinks.forEach((link) => link.classList.remove("active"));
            // Set 'active' on the link that matches the current section
            navLink.classList.add("active");
          }
        }
      });
    }, highlightOptions);
  
    // Observe each section
    sections.forEach((section) => highlightObserver.observe(section));
  });
  