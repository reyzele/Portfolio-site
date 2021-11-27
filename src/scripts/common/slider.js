// Animation letters
const aviatitle = {
  generate: function(string, block) {
    var wordsArray = string.split(" "), // побить по словам
      stringArray = string.split(""), // побить по символам
      sentence = [],
      word = "";
    block.text("");

    wordsArray.forEach(function(currentWord) {
      var wordsArray = currentWord.split(""); // каждое слово бьем по буквам

      wordsArray.forEach(function(letter) {
        var letterHtml = '<span class="letter-span">' + letter + "</span>";

        word += letterHtml;
      });

      var wordHTML = '<span class="letter-word">' + word + "</span>";

      sentence.push(wordHTML);
      word = "";
    });

    block.append(sentence.join(" "));

    // анимация появления
    var letters = block.find(".letter-span"); // найдем все наши буквы
    var duration = 500 / stringArray.length; // находим длительность для каждой буквы

    $.each(letters, function(item, elem) {
      setTimeout(function() {
        $(elem).addClass("active");
      }, duration * item);
    });
  }
};
// Slider
export default function(container) {
  var nextBtn = container.find(".slider__controls-btn_left"), // левая  кнопка
    prevBtn = container.find(".slider__controls-btn_right"), // правая кнопка
    items = nextBtn.find(".slider__controls-item"), // слайды
    display = container.find(".slider__display"), // Витрина слайдера
    title = container.find(".subtitle"), // заголовок слайда
    skills = container.find(".slider__content-text"), // технологии
    link = container.find(".works__btn"), // ссылка
    itemsLength = items.length, // количество слайдов
    duration = 500,
    inProcess = false;

  this.counter = 0;

  // private Генерация разметки кнопки следующий слайд
  var generateMarkups = function() {
    var list = nextBtn.find(".slider__controls-list"),
      markups = list.clone();

    prevBtn.append(markups);
  };
  // Вытащить данные из дата атрибутов для левой части слайдера
  var getDataArrays = function() {
    var dataObject = {
      pics: [],
      title: [],
      skills: [],
      link: []
    };

    $.each(items, function() {
      var $this = $(this);

      dataObject.pics.push($this.data("full"));
      dataObject.title.push($this.data("title"));
      dataObject.skills.push($this.data("skills"));
      dataObject.link.push($this.data("link"));
    });

    return dataObject;
  };

  var slideInLeftBtn = function(slide) {
    var reqItem = items.eq(slide - 1),
      activeItem = items.filter(".active");
    activeItem.stop(true, true).animate(
      {
        top: "100%"
      },
      duration
    );

    reqItem.stop(true, true).animate(
      {
        top: "0%"
      },
      duration,
      function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .css("top", "-100%");
      }
    );
  };

  var slideInRightBtn = function(slide) {
    var items = prevBtn.find(".slider__controls-item"),
      activeItem = items.filter(".active"),
      reqSlide = slide + 1;

    if (reqSlide > itemsLength - 1) {
      reqSlide = 0;
    }

    var reqItem = items.eq(reqSlide);

    activeItem.stop(true, true).animate(
      {
        top: "-100%"
      },
      duration
    );

    reqItem.stop(true, true).animate(
      {
        top: "0%"
      },
      duration,
      function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .css("top", "100%");
      }
    );
  };

  var changeMainPicture = function(slide) {
    var image = display.find(".slider__display-img");
    var data = getDataArrays();

    image.stop(true, true).fadeOut(duration / 2, function() {
      image.attr("src", data.pics[slide]);
      $(this).fadeIn(duration / 2);
    });
  };

  var changeTextData = function(slide) {
    var data = getDataArrays();

    // название работы
    aviatitle.generate(data.title[slide], title);

    // описание технологий
    aviatitle.generate(data.skills[slide], skills);

    // ссылка
    link.attr("href", data.link[slide]);
  };

  // public
  this.setDefaults = function() {
    var _that = this,
      data = getDataArrays();
    // создаем разметку
    generateMarkups();

    // левая кнопка
    nextBtn
      .find(".slider__controls-item")
      .eq(_that.counter - 1)
      .addClass("active");

    // правая кнопка
    prevBtn
      .find(".slider__controls-item")
      .eq(_that.counter + 1)
      .addClass("active");

    // основное изображение
    display.find(".slider__display-img").attr("src", data.pics[_that.counter]);

    // текстовые описания
    changeTextData(_that.counter);
  };
  this.moveSlide = function(direction) {
    var _that = this;

    var directions = {
      next: function() {
        // закольцовывание слайдера
        if (_that.counter < itemsLength - 1) {
          _that.counter++;
        } else {
          _that.counter = 0;
        }
      },

      prev: function() {
        if (_that.counter > 0) {
          _that.counter--;
        } else {
          _that.counter = itemsLength - 1;
        }
      }
    };

    directions[direction]();

    if (inProcess) {
      slideInLeftBtn(_that.counter);
      slideInRightBtn(_that.counter);
      changeMainPicture(_that.counter);
      changeTextData(_that.counter);

      setTimeout(() => {
        inProcess = false;
      }, duration);
    }
  };

  this.init = function(slider) {
    slider.setDefaults();
    $(".slider__controls-btn_left").on("click", function(e) {
      e.preventDefault();
      if (!inProcess) {
        inProcess = true;
        slider.moveSlide("prev");
      }
    });

    $(".slider__controls-btn_right").on("click", function(e) {
      e.preventDefault();
      if (!inProcess) {
        inProcess = true;
        slider.moveSlide("next");
      }
    });
  };
}
