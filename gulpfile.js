var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('crlab-gulp-combine-media-queries');
    cheerio = require('gulp-cheerio');
    svgmin = require('gulp-svgmin');
    replace = require('gulp-replace');
    svgSprite = require('gulp-svg-sprite');


gulp.task('svg', ()=> {
	return gulp.src('app/img/svg/*.svg')
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	.pipe(cheerio({
		run: function($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
			$('text').remove();
		},
		parserOptions: {xmlMode: true}
	}))
	.pipe(replace('&gt;', '>'))
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: "sprite.svg"
			}
		}
	}))
	.pipe(gulp.dest('app/img/svg/'));
	
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(cmq())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([
            'app/libs/slick-carousel/slick/slick.min.js',
            'app/libs/jquery.scrollTo/jquery.scrollTo.min.js',
            'app/libs/rotator/jquery.simple-text-rotator.js',
            'app/libs/stellar/jquery.stellar.js',
            'app/libs/timer-keithwood/timer-keithwood.js',
            'app/libs/wow/dist/wow.min.js',
            'app/libs/readmore-js/readmore.min.js'
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('mainjs', function() {
    return gulp.src('app/js/main.js')
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('css-libs', function() {
    return gulp.src('app/sass/libs.scss') // Выбираем файл для минификации
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
            // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })) /**/ )
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
            'app/css/style.css',
            'app/css/libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function(callback) {
    return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/js/main.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('css-libs', 'code', 'mainjs', 'sass', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));