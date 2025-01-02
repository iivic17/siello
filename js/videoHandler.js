// js/videoHandler.js

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} True if mobile, else false.
 */
const isMobileDevice = () => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  /**
   * Checks if the browser can play the specified video type.
   * @param {string} type - The MIME type of the video.
   * @returns {boolean} True if supported, else false.
   */
  const canPlayVideoType = (type) => {
    const video = document.createElement('video');
    return video.canPlayType(type) !== '';
  };
  
  /**
   * Disables the video playback by removing sources and relevant attributes.
   */
  const disableVideo = () => {
    const videoElement = document.querySelector('.hero-video');
    if (videoElement) {
      // Remove all <source> elements
      while (videoElement.firstChild) {
        videoElement.removeChild(videoElement.firstChild);
      }
  
      // Remove playback-related attributes
      videoElement.removeAttribute('autoplay');
      videoElement.removeAttribute('muted');
      videoElement.removeAttribute('loop');
  
      // Optionally, add a class to style the poster appropriately
      videoElement.classList.add('video-disabled');
  
      // Pause the video in case it started playing
      videoElement.pause();
    }
  };
  
  /**
   * Initializes the video handler based on device and support.
   */
  const initVideoHandler = () => {
    const videoSupported = canPlayVideoType('video/mp4');
    const mobile = isMobileDevice();
  
    if (mobile || !videoSupported) {
      disableVideo();
    }
  };
  
  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initVideoHandler);
  