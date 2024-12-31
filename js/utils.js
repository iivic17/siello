// js/utils.js

/**
 * Throttle function limits the number of times a function can be called
 * within a specified timeframe.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - Time in milliseconds.
 * @returns {Function} - Throttled function.
 */
export const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };
  
  /**
   * Debounce function delays the execution of a function until after
   * a specified time has elapsed since the last time it was invoked.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - Time in milliseconds.
   * @returns {Function} - Debounced function.
   */
  export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };
  