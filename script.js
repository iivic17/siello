document.addEventListener("DOMContentLoaded", () => {
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const navLinks = document.querySelectorAll("a.nav-link");
  const sections = document.querySelectorAll("section[id]");

  /* ---------------------------------------
   * 1. SMOOTH SCROLL for ANY # LINK
   * --------------------------------------- */
  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      // If just "#", likely a placeholder—abort
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
        const navLink = document.querySelector(
          `a.nav-link[href="#${sectionId}"]`
        );
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

  /* ---------------------------------------
   * 3. ADD EXTRA LEFT/RIGHT MARGINS TO
   *    FIRST/LAST CAROUSEL ITEMS
   *    + UPDATE ON RESIZE
   * --------------------------------------- */
  const servicesSection = document.querySelector(".services-section");
  const headingContainer = document.querySelector(
    ".services-section .heading-container"
  );
  const firstCard = document.querySelector(".carousel li.card:first-child");
  const lastCard = document.querySelector(".carousel li.card:last-child");

  function updateCarouselMargins() {
    if (headingContainer && firstCard && lastCard && servicesSection) {
      const headingRect = headingContainer.getBoundingClientRect();
      const distance = headingRect.left;

      firstCard.style.marginLeft = `${distance}px`;
      lastCard.style.marginRight = `${distance}px`;

      // Sets custom CSS variable used by ::before and ::after linear-gradient
      servicesSection.style.setProperty(
        "--section-gradient-size",
        `${distance}px`
      );
    }
  }

  // Initial call on load
  updateCarouselMargins();

  // Listen for window resize
  window.addEventListener("resize", updateCarouselMargins);

  /* ---------------------------------------
   * 4. SET ASPECT RATIO FOR SVG ICONS
   * --------------------------------------- */
  document.querySelectorAll("svg.card-icon").forEach((svg) => {
    const vb = svg.getAttribute("viewBox");

    if (vb) {
      const [, , wStr, hStr] = vb.split(" ");
      const w = parseFloat(wStr);
      const h = parseFloat(hStr);
      if (w > 0 && h > 0) {
        svg.style.aspectRatio = `${w} / ${h}`;
      }
    }
  });

  /* ---------------------------------------
   * 5. CAROUSEL CONTROLS LOGIC
   * --------------------------------------- */
  const carousel = document.querySelector(".carousel");
  const leftControl = document.querySelector(
    ".controls-container .controls:first-child"
  );
  const rightControl = document.querySelector(
    ".controls-container .controls:last-child"
  );

  function updateControls() {
    // Calculate maximum scroll left value
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    // Current scroll position
    const currentScrollLeft = carousel.scrollLeft;

    // Update left control
    if (currentScrollLeft <= 0) {
      leftControl.classList.add("controls-end");
    } else {
      leftControl.classList.remove("controls-end");
    }

    // Update right control
    if (currentScrollLeft >= maxScrollLeft - 1) {
      // -1 to account for minor differences
      rightControl.classList.add("controls-end");
    } else {
      rightControl.classList.remove("controls-end");
    }
  }

  if (firstCard && carousel) {
    // Get the computed styles of the carousel (parent container)
    const carouselStyles = window.getComputedStyle(carousel);

    // Retrieve the column-gap; fallback to gap or 0 if not defined
    let columnGap = parseFloat(carouselStyles.columnGap);
    if (isNaN(columnGap)) {
      // If columnGap is not defined, try to get the general gap
      const gapValues = carouselStyles.gap.split(" ");
      columnGap =
        gapValues.length > 1
          ? parseFloat(gapValues[1])
          : parseFloat(gapValues[0]) || 0;
    }

    // Calculate the width including the column-gap
    const cardWidth = firstCard.offsetWidth + columnGap;

    // Use scrollAmount for scrolling logic
    leftControl.addEventListener("click", () => {
      carousel.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    });

    rightControl.addEventListener("click", () => {
      carousel.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    });
  }

  // Initial update of controls
  updateControls();

  // Update controls when the carousel is scrolled manually
  carousel.addEventListener("scroll", () => {
    updateControls();
  });

  // Update controls on window resize (to handle changes in carousel width)
  window.addEventListener("resize", () => {
    updateControls();
  });
});
