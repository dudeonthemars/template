var gulp = require('gulp'),
    //sass = require('gulp-sass'), leave for support old projects
    sass = require('gulp-dart-sass'); // use for newer projects wia dart-sass
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
    cmq = require('crlab-gulp-combine-media-queries'),
    cheerio = require('gulp-cheerio'),
    svgmin = require('gulp-svgmin'),
    replace = require('gulp-replace'),
    svgSprite = require('gulp-svg-sprite'),
    fileinclude = require('gulp-file-include'),
    webp = require('gulp-webp'),
    webpHTML = require('gulp-webp-html'),
    webpcss = require('gulp-webp-css');


gulp.task('svg', function() {
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
        .pipe(webpcss())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        online: true
    });
});

gulp.task('scripts', function() {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            //'app/libs/slick-carousel/slick/slick.min.js',
            //'app/libs/jquery.scrollTo/jquery.scrollTo.min.js',
            //'app/libs/rotator/jquery.simple-text-rotator.js',
            //'app/libs/stellar/jquery.stellar.js',
            //'app/libs/timer-keithwood/timer-keithwood.js',
            //'app/libs/wow/dist/wow.min.js',
            //'app/libs/moment/moment.js',
            //'app/libs/readmore-js/readmore.min.js',
            'app/libs/common/cookies.js',
            'app/libs/common/modernizr.js',
            'app/libs/common/ea-form.js',
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('code', function() {
    return gulp.src('app/index.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('mainjs', function() {
    return gulp.src('app/js/main.js')
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('css-libs', function() {
    return gulp.src('app/sass/libs.scss')
        .pipe(sass())
        .pipe(cssnano()) 
        .pipe(rename({ suffix: '.min' })) 
        .pipe(gulp.dest('app/css')); 
});

gulp.task('clean', async function() {
    return del.sync('dist'); 
});

gulp.task('webp', function() {
    return gulp.src(['app/img/**/*.png', 'app/img/**/*.jpg'])
    .pipe(
        webp({
            quality: 78
        })
    )
    .pipe(gulp.dest('app/img'))
})

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 78, progressive: true}),
                imagemin.optipng({optimizationLevel: 4}),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        {cleanupIDs: false}
                    ]
                })
            ]))
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
        .pipe(webpHTML())
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function(callback) {
    return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/img/**/*.png', 'app/img/**/*.jpg'], gulp.parallel('webp'));
    gulp.watch(['app/js/main.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('css-libs', 'code', 'mainjs', 'sass', 'scripts', 'browser-sync', 'watch', 'webp'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));