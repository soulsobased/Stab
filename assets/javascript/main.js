'use strict';

const timeouts = [];

const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Load main function
const loadMain = () => {
  // Clear timeouts
  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  // Remove start block
  $('.start-block').remove();

  // Hide main and fade in container
  $('#main').fadeOut(100, () => {
    $('#main').remove();

    requestAnimationFrame(() => {
      // Pulse title block
      $('.title_block').addClass('animated pulse');
    });

    requestAnimationFrame(() => {
      // Typed animation
      if (settings.description_Texts) {
        const typed = new Typed('#description_block', {
          strings: settings.description_Texts,
          typeSpeed: 40,
          onComplete: () => {
            clearCursor();
          },
        });
      }
    });

    requestAnimationFrame(() => {
      // Play video and audio
      if (settings.videoElement && settings.audioElement) {
        settings.videoElement.play();
        settings.audioElement.play();

        settings.videoElement.addEventListener(
          'timeupdate',
          () => {
            if ($.cookie) {
              $.cookie('videoTime', settings.videoElement.currentTime, { expires: 1 });
            }
          },
          false
        );

        $('.container').fadeIn();

        requestAnimationFrame(() => {
          $('.background').fadeIn(200, () => {
            if (settings.musicVolume) {
              $('#audio').animate({ volume: settings.musicVolume }, 0);
            }
          });
        });
      }
    });
  });
};

// Clear cursor function
const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};

// Animate CSS function
$.fn.extend({
  animateCss: function (animationName) {
    const
