export default (function () {
  const $news = $(".reviews__item"); // Получаю все новости
  const $item = $(".blog-nav__item"); // Получаю все новости в левом меню
  const $Menu = $("#nav");
  let positionArticle = [];
  let flagAnimation = false;

  // выполняем расчет позиций для каждой статьи
  const _setPositionArticle = function (elements) {
    elements.each(function (index) {
      positionArticle[index] = {};
      positionArticle[index].top = $(this).offset().top;
      positionArticle[index].height = $(this).innerHeight();
      positionArticle[index].bottom =
        positionArticle[index].top + positionArticle[index].height;
    });
  };

  const _pageFixMenu = function () {
    let scroll = window.pageYOffset;

    if (scroll >= $news.offset().top) {
      $Menu.addClass("blog-nav__fixed");
    }
  };

  const _scrollPageFixMenu = function () {
    let scroll = window.pageYOffset;

    if (scroll >= $news.offset().top) {
      $Menu.addClass("blog-nav__fixed");
    } else {
      $Menu.removeClass("blog-nav__fixed");
      $Menu.removeClass("blog-nav__fixed_active");
    }
  };

  const _scrollPage = function () {
    positionArticle.forEach((element, index) => {
      let $currentElement = $item.eq(index);
      if (isFirstVision(element, $currentElement)) {
        $currentElement
          .addClass("blog-nav__item_active")
          .siblings()
          .removeClass("blog-nav__item_active");
      }
    });

    function isFirstVision(element, current) {
      let scroll = window.pageYOffset + $(window).height() / 3;
      return (
        scroll >= element.top &&
        scroll < element.bottom &&
        !current.hasClass("blog-nav__item_active")
      );
    }
  };

  const _clickMenu = function (e) {
    let element = e.target;

    if (!flagAnimation && element.tagName === "LI") {
      flagAnimation = true;
      let index = $(element).index();
      let sectionOffset = positionArticle[index].top;

      $(document).off("scroll", _scrollPage);
      $(element)
        .siblings(["blog - nav__item"])
        .removeClass("blog-nav__item_active");
      $("body, html").animate({ scrollTop: sectionOffset }, 1000, () => {
        $(element).addClass("blog-nav__item_active");
        $Menu.removeClass("blog-nav__fixed_active");
        flagAnimation = false;
        $(document).on("scroll", _scrollPage);
      });
    }
  };

  const addListener = function () {
    $(window).one("load", function () {
      _setPositionArticle($news);
      _pageFixMenu();
      $(".blog-nav__list").on("click", _clickMenu);
      $(document).on("scroll", _scrollPage);
      $(document).on("scroll", _scrollPageFixMenu);
    });

    $(window).on("resize", function () {
      _setPositionArticle($news);
    });

    $(".blog-nav__btn").click(function () {
      $(".blog-nav__fixed").toggleClass("blog-nav__fixed_active");
    });

    $(document).mouseup(function (e) {
      if (!$Menu.is(e.target) && $Menu.has(e.target).length === 0) {
        $Menu.removeClass("blog-nav__fixed_active");
      }
    });
  };

  return {
    init: addListener
  };
})();
