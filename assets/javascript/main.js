'use strict';

const timeouts = [];

const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


if ($.cookie('videoTime')) {
  settings.videoElement.currentTime = $.cookie('videoTime');
  settings.audioElement.currentTime = $.cookie('videoTime');
}

$('.start-btn').click(() => {
  loadMain();
});

$.fn.extend({
  animateCss: function (animationName) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const loadMain = () => {

  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  $('.start-block').remove();

  $('#main').fadeOut(100, () => {
    $('#main').remove();


    setTimeout(() => {
      $('.title_block').animateCss('pulse');
    }, 200);

    setTimeout(() => {
      const typed = new Typed('#description_block', {
        strings: settings.description_Texts,
        typeSpeed: 40,

        onComplete: () => {
          clearCursor();
        },
      });
    }, 1350);

    setTimeout(() => {
      settings.videoElement.play();
      settings.audioElement.play();

      settings.videoElement.addEventListener(
        'timeupdate',
        () => {
          $.cookie('videoTime', settings.videoElement.currentTime, { expires: 1 });
        },
        false
      );

      $('.container').fadeIn();

      $('.background').fadeIn(200, () => {
        $('#audio').animate({ volume: settings.musicVolume }, 0);
      });
    }, 200);
  });
};

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
