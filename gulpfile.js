const gulp = require("gulp");
const $gp = require("gulp-load-plugins")(); // плагины галпа, объявлять не нужно, используем как $gp.имяПлагина (без приставки gulp-)

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const webpack = require("webpack");
const mergeStream = require("merge-stream");
const webpackConfig = require("./webpack.config.js");
const moduleImporter = require("sass-module-importer");
const del = require("del");
const cssunit = require("gulp-css-unit");
const imagemin = require("gulp-imagemin");

const SRC_DIR = "src";
const DIST_DIR = "public/";
const ROOT_PATH = `./${DIST_DIR}`;

// стили
gulp.task("styles", () => {
  return (
    gulp
      .src(`${SRC_DIR}/styles/main.scss`)
      .pipe($gp.plumber())
      .pipe($gp.sassGlob())
      .pipe($gp.sourcemaps.init())
      .pipe(
        $gp.sass({
          outputStyle: "compressed",
          importer: moduleImporter()
        })
      )
      .pipe(
        $gp.autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      )
      .pipe($gp.sourcemaps.write())
      /* .pipe(cssunit({
      type: 'px-to-rem',
      rootSize: 16
    })) */
      .pipe($gp.rename({ suffix: ".min" }))
      .pipe(gulp.dest(`${DIST_DIR}/styles/`))
      .pipe(reload({ stream: true }))
  );
});

// переносим шрифты
gulp.task("fonts", () => {
  return gulp.src(`${SRC_DIR}/fonts/**`).pipe(gulp.dest(`${DIST_DIR}/fonts/`));
});

// очистка
gulp.task("clean", () => {
  return del(ROOT_PATH);
});

// собираем скрипты webpack
gulp.task("scripts", () => {
  return gulp
    .src(`${SRC_DIR}/scripts/main.js`)
    .pipe($gp.plumber())
    .pipe($gp.webpack(webpackConfig, webpack))
    .pipe(gulp.dest(`${DIST_DIR}/scripts`))
    .pipe(reload({ stream: true }));
});

// спрайт иконок + инлайн svg
gulp.task("svg", done => {
  const prettySvgs = () => {
    return gulp
      .src(`${SRC_DIR}/images/icons/*.svg`)
      .pipe(
        $gp.svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      .pipe(
        $gp.cheerio({
          run($) {
            $("[fill], [stroke], [style], [width], [height]")
              .removeAttr("fill")
              .removeAttr("stroke")
              .removeAttr("style")
              .removeAttr("width")
              .removeAttr("height");
          },
          parserOptions: { xmlMode: true }
        })
      )
      .pipe($gp.replace("&gt;", ">"));
  };

  let svgSprite = prettySvgs()
    .pipe(
      $gp.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            example: {
              dest: "../tmp/spriteSvgDemo.html"
            }
          }
        }
      })
    )
    .pipe(gulp.dest(`${DIST_DIR}/images/icons`));

  let svgInline = prettySvgs().pipe(
    $gp.sassInlineSvg({
      destDir: `${SRC_DIR}/styles/icons/`
    })
  );

  return mergeStream(svgSprite, svgInline);
});

// просто переносим картинки
gulp.task("images", () => {
  return gulp
    .src([`${SRC_DIR}/images/**/*.*`, `!${SRC_DIR}/images/icons/*.*`])
    .pipe(gulp.dest(`${DIST_DIR}/images/`));
});

// сервер node.js
gulp.task("nodemon", done => {
  let started = false;
  $gp
    .nodemon({
      script: "server.js",
      env: { NODE_ENV: "development" },
      watch: "server.js"
    })
    .on("start", () => {
      if (started) return;
      done();
      started = true;
    });
});

// dev сервер + livereload (встроенный)
gulp.task(
  "server",
  gulp.series("nodemon", done => {
    browserSync.init({
      proxy: "http://localhost:3000",
      port: 8080,
      open: false
    });
  })
);

// галповский вотчер
gulp.task("watch", () => {
  gulp.watch(`${SRC_DIR}/styles/**/*.scss`, gulp.series("styles"));
  gulp.watch(`${SRC_DIR}/images/**/*.*`, gulp.series("images"));
  gulp.watch(`${SRC_DIR}/scripts/**/*.js`, gulp.series("scripts"));
  gulp.watch(`${SRC_DIR}/fonts/*`, gulp.series("fonts"));
  gulp.watch(`views/pages/*`).on("change", reload);
});

gulp.task(
  "build",
  gulp.series(
    "svg",
    gulp.parallel("styles", "images", "fonts", "scripts")
  )
);

// GULP:RUN
gulp.task(
  "default",
  gulp.series(
    "clean",
    "svg",
    gulp.parallel("styles", "images", "fonts", "scripts"),
    gulp.parallel("watch", "server")
  )
);
