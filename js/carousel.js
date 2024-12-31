// js/carousel.js

import { throttle } from './utils.js';

/**
 * Initializes the carousel functionality.
 */
export const initCarousel = () => {
  const carousel = document.querySelector(".carousel");
  const leftControl = document.querySelector(".controls-container .controls:first-child");
  const rightControl = document.querySelector(".controls-container .controls:last-child");
  const firstCard = document.querySelector(".carousel li.card:first-child");
  const lastCard = document.querySelector(".carousel li.card:last-child");
  const servicesSection = document.querySelector(".services-section");
  const headingContainer = document.querySelector(".services-section .heading-container");

  if (!carousel || !leftControl || !rightControl || !firstCard || !lastCard || !servicesSection || !headingContainer) {
    console.warn("Carousel elements not found.");
    return;
  }

  /**
   * Updates the margins of the first and last carousel items based on the heading container's position.
   */
  const updateCarouselMargins = () => {
    const headingRect = headingContainer.getBoundingClientRect();
    const distance = headingRect.left;

    firstCard.style.marginLeft = `${distance}px`;
    lastCard.style.marginRight = `${distance}px`;

    // Update custom CSS variable for gradient sizing.
    servicesSection.style.setProperty("--section-gradient-size", `${distance}px`);
  };

  // Initial margin adjustment on load.
  updateCarouselMargins();

  // Update margins on window resize with throttling for performance.
  window.addEventListener("resize", throttle(updateCarouselMargins, 200));

  // Retrieve the computed column-gap of the carousel.
  const carouselStyles = window.getComputedStyle(carousel);
  let columnGap = parseFloat(carouselStyles.columnGap);

  if (isNaN(columnGap)) {
    // Fallback to general gap if column-gap is not defined.
    const gapValues = carouselStyles.gap.split(" ");
    columnGap = gapValues.length > 1 ? parseFloat(gapValues[1]) : parseFloat(gapValues[0]) || 0;
  }

  const cardWidth = firstCard.offsetWidth + columnGap;

  /**
   * Scrolls the carousel by a specified amount.
   * @param {string} direction - 'left' or 'right'.
   */
  const scrollByAmount = (direction) => {
    carousel.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // Attach click event listeners to carousel controls.
  leftControl.addEventListener("click", () => scrollByAmount('left'));
  rightControl.addEventListener("click", () => scrollByAmount('right'));

  /**
   * Updates the state of carousel controls based on the current scroll position.
   */
  const updateControls = () => {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const currentScrollLeft = carousel.scrollLeft;

    leftControl.classList.toggle("controls-end", currentScrollLeft <= 0);
    rightControl.classList.toggle("controls-end", currentScrollLeft >= maxScrollLeft - 1);
  };

  // Throttled version of the updateControls function.
  const throttledUpdateControls = throttle(updateControls, 100);

  // Attach scroll event listener to the carousel.
  carousel.addEventListener("scroll", throttledUpdateControls, { passive: true });

  // Attach resize event listener to update controls state on window resize.
  window.addEventListener("resize", throttle(updateControls, 200));

  // Initial invocation to set the correct state of controls.
  updateControls();
};
