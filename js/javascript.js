// header
$(function() {
  const $gnb = $("header>nav>.gnb>li");
  const $sub = $gnb.find(".sub");
  let nowIdx = 0;

  $gnb.on({
    mouseenter: function() {
      nowIdx = $gnb.index(this);
      $sub.eq(nowIdx).fadeIn(200);

      $gnb.eq(nowIdx).children("a").append('<span class="bar"></span>');
      const barW = $gnb.eq(nowIdx).find("span").first().width();

      $gnb.eq(nowIdx).find(".bar").css({
        width: barW,
        marginLeft: -barW / 2
      });
    },
    mouseleave: function() {
      $(".bar").remove();
      $sub.hide();
    }
  });
});

// slides
$(function() {
  const $container = $("section>.slides>.slides-container");
  const $prev = $("section>.slides>.slides-direction>.prev");
  const $next = $("section>.slides>.slides-direction>.next");
  const $indicators = $("section>.slides>.slides-pagination>li>a");
  const $pauseplay = $("section>.slides>.slides-pauseplay>a.pause");

  let nowIdx = 0;
  let intervalKey = null;

  const slideAction = function() {
    $container.stop().animate({
      left: -940 * nowIdx
    });

    $indicators.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
  };

  const nextIdx = function() {
    if (nowIdx < 2) {
      nowIdx++;
    } else {
      nowIdx = 0;
    }
  };

  const autoPlay = function() {
    clearInterval(intervalKey);
    intervalKey = setInterval(function() {
      nextIdx();
      slideAction();
    }, 3000);
  };

  const autoStop = function() {
    clearInterval(intervalKey);
  };

  $(window).on("load", function() {
    autoPlay();
  });

  $("section>.slides").on({
    mouseover: function() {
      $prev.stop().animate(
        {
          left: 0
        },
        200
      );

      $next.stop().animate(
        {
          right: 0
        },
        200
      );
    },
    mouseout: function() {
      $prev.stop().animate(
        {
          left: -50
        },
        200
      );

      $next.stop().animate(
        {
          right: -50
        },
        200
      );
    }
  });

  $indicators.on("click", function(evt) {
    evt.preventDefault();

    nowIdx = $indicators.index(this);

    slideAction();
  });

  $pauseplay.on("click", function(evt) {
    evt.preventDefault();

    if ($(this).hasClass("pause")) {
      autoStop();
      $(this).removeClass("pause");
    } else {
      autoPlay();
      $(this).addClass("pause");
    }
  });

  $next.on("click", function(evt) {
    evt.preventDefault();

    nextIdx();
    slideAction();
  });

  $prev.on("click", function(evt) {
    evt.preventDefault();

    if (nowIdx > 0) {
      nowIdx--;
    } else {
      nowIdx = 2;
    }

    slideAction();
  });

  // sampyo_story
  $(function() {
    const $storyTit = $("section>.cont2>.sampyo_story>ul>li>h3+a");
    const $slides = $("section>.cont2>.sampyo_story>ul>li");
    const $btnplay = $("section>.cont2>.sampyo_story>.pauseplay>a.btn_play");
    const $btnStop = $("section>.cont2>.sampyo_story>.pauseplay>a.btn_stop");

    let intervalKey = null;
    let nowIdx = 0;

    const autoPlay = function() {
      $btnplay.addClass("on").next().removeClass("on");

      clearInterval(intervalKey);

      intervalKey = setInterval(function() {
        $slides.eq(nowIdx).stop().fadeOut();

        if (nowIdx < 1) {
          nowIdx = 1;
        } else {
          nowIdx = 0;
        }

        $slides.eq(nowIdx).stop().fadeIn();
      }, 4000);
    };

    const autoStop = function() {
      $btnplay.removeClass("on").next().addClass("on");

      clearInterval(intervalKey);
    };

    $(window).on("load", function() {
      autoPlay();
    });

    $storyTit.on("click", function(evt) {
      evt.preventDefault();

      autoStop();

      $(this).parent().stop().fadeOut();
      $(this).parent().siblings().stop().fadeIn();
    });

    $btnplay.on("click", function(evt) {
      evt.preventDefault();

      autoPlay();
    });

    $btnStop.on("click", function(evt) {
      evt.preventDefault();

      autoStop();
    });
  });

  // path
  $(function() {
    const $option = $(".path>.wrap>.option");
    const $select = $("#box-1 , #box-2");
    const $tx = $("section>.cont3>.path>.wrap .list>ul>li>a");
    const $input = $(".path>.wrap>.option input");

    $select.on("click", function() {
      $(this).siblings(".list").show();
    });

    $option.on("mouseleave", function() {
      $(this).find(".list").hide();
    });

    $tx.on("click", function(evt) {
      evt.preventDefault();

      const txtContent = $(this).text();
      $(this).parents(".list").siblings().find("input").val(txtContent);

      $(this).parents(".list").hide();
    });
  });
});
