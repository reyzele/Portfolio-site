import Parallax from "parallax-js";
import Preloader from "./common/preloader";
import Skills from "./common/skills";
import HeroParallax from "./common/hero-parallax";
import Blur from "./common/blur";
import Slider from "./common/slider";
import Blog from "./common/blog";
import SendMail from "./common/SendMail";
import Flip from "./common/flip";
import googleMapInit from "./common/googleMap";
import Auth from "./common/auth";

if ($("#auth").length > 0) {
  Auth();

  $(".status-overlay__close").on("click", function() {
    $(".status-overlay").fadeOut("slow");
  });
}

if ($("#map").length > 0) {
  googleMapInit();
}

if (document.images.length > 0) {
  Preloader();
}

if ($("#mail").length > 0) {
  SendMail();

  $(".status-overlay__close").on("click", function() {
    $(".status-overlay").fadeOut("slow");
  });
}

// Blog
if ($("#blog").length > 0) {
  Blog.init();
}

// Parallax in main page make with plugin
if ($("#scene").length > 0) {
  var scene = document.getElementById("scene");
  var parallaxInstance = new Parallax(scene, {
    scalarX: 8,
    scalarY: 8,
    frictionX: 0.075,
    frictionY: 0.075
  });
}

// Parallax durring scroll in hero section
if (
  $(".hero__bg").length > 0 &&
  $(".user").length > 0 &&
  $(".hero__title-img").length > 0
) {
  window.onload = () => HeroParallax.bottomPosition(45);

  window.onscroll = () => {
    const wScroll = window.pageYOffset;

    HeroParallax.inScroll(wScroll);
  };

  window.onresize = () => {
    HeroParallax.bottomPosition(45);
  };
}

// Blur
if ($(".about__form-background").length > 0) {
  Blur();
  $(window).resize(function() {
    Blur();
  });
}

// Slider
if ($(".works").length > 0) {
  var slider = new Slider($(".works"));
  slider.init(slider);
}

// Skills
if ($("#skills").length > 0) {
  Skills();
}

// Hamburger menu
if ($(".hamburger-menu").length > 0) {
  var hamburger = $(".hamburger-menu");
  var overlay = $(".overlay-menu");
  hamburger.on("click", toggleActiveClasses);

  function toggleActiveClasses() {
    $(this).toggleClass("hamburger-menu--active");
    overlay.toggleClass("overlay-menu--active");
    $(".overlay-menu__link").toggleClass("overlay-menu__link_scale");
    $("body").toggleClass("body-active-menu");
  }
}

// Scroll to  next section
if ($(".arrow").length > 0) {
  $(".arrow").click(function(e) {
    e.preventDefault();

    var scroll_el = $(this).attr("href");
    if ($(scroll_el).length > 0) {
      $("html, body").animate({ scrollTop: $(scroll_el).offset().top }, 1000);
    }
    return false;
  });
}

// Flip effect
if ($("#welcom-flip").length > 0) {
  Flip.init();
}

// Footer solution
function setBottomPadding(element) {
  const footerHeight = $(".footer").height();
  $(element).css("padding-bottom", `${footerHeight}px`);
}

if ($("#about").length > 0) {
  setBottomPadding("#about");
  $(window).resize(function() {
    setBottomPadding("#about");
  });
}

if ($("#blog").length > 0) {
  setBottomPadding("#blog");
  $(window).resize(function() {
    setBottomPadding("#blog");
  });
}

if ($("#contacts").length > 0) {
  setBottomPadding("#contacts");
  $(window).resize(function() {
    setBottomPadding("#contacts");
  });
}
