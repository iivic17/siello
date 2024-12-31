document.addEventListener("DOMContentLoaded", () => {
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll("section[id], header[id]");

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
   * 2. HIGHLIGHT ACTIVE NAV LINK BASED ON SCROLL POSITION
   * --------------------------------------- */
  // Function to determine the active section
  const setActiveNavLink = () => {
    let closestSection = null;
    let minDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < minDistance && rect.top <= window.innerHeight) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      const sectionId = closestSection.getAttribute("id");
      const activeLink = document.querySelector(`a.nav-link[href="#${sectionId}"]`);

      if (activeLink && activeLink !== currentActive) {
        // Remove 'active' from the previously active nav item
        if (currentActive) {
          currentActive.closest('li').classList.remove("active");
          currentActive.removeAttribute("aria-current");
        }

        // Add 'active' to the current nav item
        activeLink.closest('li').classList.add("active");
        activeLink.setAttribute("aria-current", "page");

        // Update the current active link
        currentActive = activeLink;
      }
    }
  };

  // Initialize current active link
  let currentActive = null;

  // Throttle the scroll event using requestAnimationFrame
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call to set the active nav link
  setActiveNavLink();


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
  document.querySelectorAll("svg.icon").forEach((svg) => {
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

  /* ---------------------------------------
   * 6. STICKY NAV POSITION ON SCROLL
   * --------------------------------------- */
  const nav = document.querySelector(".sticky-nav");
  const sentinel = document.querySelector(".nav-sentinel");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          nav.classList.add("fixed");
        } else {
          nav.classList.remove("fixed");
        }
      });
    },
    {
      root: null,
      threshold: 0,
    }
  );
  
  navObserver.observe(sentinel);
});
