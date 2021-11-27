export default function() {
  const strokeDasharray = 282.6;
  const animateDuration = 250;
  const $circles = $(".skills__second-circle"); // круги
  const circles = $circles;
  let view = false;

  function drawSkills() {
    let $counter = 0;
    Array.from(circles).forEach(circle => {
      resetStroke(circle);
    });

    function setStroke(circle) {
      if (circle.dataset.percent) {
        const percent = (strokeDasharray * circle.dataset.percent) / 100;
        circle.setAttribute(
          "style",
          `stroke-dasharray : ${percent} ${strokeDasharray}`
        );
      }
    }

    function resetStroke(circle) {
      if (circle.dataset.percent) {
        circle.setAttribute("style", `stroke-dasharray : 0 ${strokeDasharray}`);
      }
    }

    (function animateSkill() {
      const timerId = setTimeout(function() {
        view && setStroke(circles[$counter]);
        $counter++;
        if ($counter < circles.length) {
          view && animateSkill();
        } else {
          clearTimeout(timerId);
        }
      }, animateDuration);
    })();
  }

  $(window).scroll(function() {
    const container = $("#skills");
    const offset = container.offset(); // Текущее положение элемента
    const elementTop = offset.top - $(window).height(); // У этого текущего элемента отнимается высота окна
    const ElemBottom = offset.top + container.innerHeight();
    const bottomOfPage = Math.ceil($(window).scrollTop());

    if ($(this).scrollTop() > elementTop && !view) {
      view = true;
      drawSkills();
    } else if ($(this).scrollTop() < elementTop) {
      view = false;
    }
  });

  $(".hero__arrow").click(function() {
    drawSkills();
  });
}
