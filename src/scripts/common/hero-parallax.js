export default (function() {
  const img = document.querySelector(".hero__bg-img");
  const user = document.querySelector(".user");
  const sectionText = document.querySelector(".hero__title-img");

  function move(block, windowScroll, strafeAmount) {
    const strafe = windowScroll / -strafeAmount + "%";
    const transformString = `translate3d(0, ${strafe}, 0)`;
    block.style.transform = transformString;
  }

  return {
    bottomPosition: function(strafeAmount) {
      const bottomPos = img.offsetHeight / -strafeAmount + "%";

      img.style.bottom = bottomPos;
    },
    inScroll: function(wScroll) {
      move(img, wScroll, 45);
      move(sectionText, wScroll, 20);
      move(user, wScroll, 5);
    }
  };
})();
