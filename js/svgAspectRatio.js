// js/svgAspectRatio.js

/**
 * Sets the aspect ratio for all SVG icons based on their viewBox.
 */
export const setSvgAspectRatios = () => {
  const svgs = document.querySelectorAll("svg.icon");

  svgs.forEach((svg) => {
    const viewBox = svg.getAttribute("viewBox");
    if (viewBox) {
      const [, , widthStr, heightStr] = viewBox.split(" ").map(Number);
      const width = parseFloat(widthStr);
      const height = parseFloat(heightStr);

      if (width > 0 && height > 0) {
        svg.style.aspectRatio = `${width} / ${height}`;
      }
    }
  });
};
