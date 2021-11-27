export default function() {
  const sectionWidth = $("#about").width();
  var imgMinWidth = $(".about__background");
  var blurSection = $(".about");
  var blurSectionHeight = $(".about").height();
  var blur = $(".about__form-background");
  var posY = blurSection.offset().top - blur.offset().top;
  var posX = blurSection.offset().left - blur.offset().left;
  const minWidthConstant = 1800;
  var imgWidth =
    sectionWidth < minWidthConstant ? minWidthConstant : sectionWidth;

  if (blurSectionHeight > 1376) {
    var minWidth =
      minWidthConstant + (minWidthConstant / 1376) * (blurSectionHeight - 1376);

    if (sectionWidth > minWidth) {
      imgMinWidth.css({ "min-width": sectionWidth + "px" });
      imgWidth = sectionWidth;
    } else {
      imgMinWidth.css({
        "min-width": minWidth + "px"
      });
      imgWidth = minWidth;
    }
  } else {
    imgMinWidth.css({ "min-width": minWidthConstant + "px" });
  }

  blur.css({
    "background-size": imgWidth + "px" + " " + "auto",
    "background-position": posX + "px" + " " + posY + "px"
  });
}
