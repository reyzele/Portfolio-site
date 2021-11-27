import Blur from "./blur";

export default function() {
  const images = $("img[src]").toArray();
  const images_total_count = images.length;
  const preloader = document.getElementById("preloader");
  const perc_display = document.getElementById("load_perc");
  const percent = 100 / images_total_count;
  let images_loaded_count = 0;
  $("body").css("overflow", "hidden");

  images.forEach(item => {
    item.onload = image_loaded;
    item.onerror = image_loaded;
    item.src = item.src;
  });

  function image_loaded() {
    images_loaded_count++;

    perc_display.innerHTML =
      percent * images_loaded_count > 100
        ? 100 + "%"
        : ((percent * images_loaded_count) << 0) + "%";
    if (images_loaded_count >= images_total_count) {
      setTimeout(() => {
        if (!preloader.classList.contains("done")) {
          $("body").css("overflow", "");
          preloader.classList.add("done");
          $(".welcome__flipper").addClass("flipInX");
          if ($(".about__form-background").length > 0) {
            Blur(); // из за overflow:hidden
          }
        }
      }, 1000);
    }
  }
}
