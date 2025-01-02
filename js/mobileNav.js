// js/mobileNav.js

/**
 * Handles the mobile navigation toggle behavior.
 */

export const initMobileNav = () => {
    // Select the navigation toggle checkbox
    const navToggleCheckbox = document.getElementById("navi-toggle");
  
    if (!navToggleCheckbox) {
      console.warn('Element with ID "navi-toggle" not found.');
      return;
    }
  
    // Select all mobile navigation links
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  
    if (mobileNavLinks.length === 0) {
      console.warn('No elements with class "mobile-nav-link" found.');
      return;
    }
  
    /**
     * Closes the mobile navigation by unchecking the toggle checkbox.
     */
    const closeMobileNav = () => {
      if (navToggleCheckbox.checked) {
        navToggleCheckbox.checked = false;
      }
    };
  
    // Add click event listeners to each mobile navigation link
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
  };
  