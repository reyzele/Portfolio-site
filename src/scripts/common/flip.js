export default (function() {
  function addEventListeners() {
    $(document).on("click", function(e) {
      const container = $(".welcome__container");

      if ($(e.target).hasClass("welcome__auth-link")) {
        e.preventDefault();
        $(".welcome__flipper").css({ transform: "rotateY(180deg)" });
        $(".welcome__auth").fadeOut("slow");
      } else if (container.has(e.target).length === 0) {
        $(".welcome__flipper").css({ transform: "rotateY(0deg)" });
        $(".welcome__auth").fadeIn("slow");
      } else {
        return null;
      }
    });

    $("#return").click(function() {
      $(".welcome__flipper").css({ transform: "rotateY(0deg)" });
      $(".welcome__auth").fadeIn("slow");
    });
  }
  return {
    init: addEventListeners
  };
})();
