var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths,
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(['src/sass/pluma.sass'])
        .pipe(sass({
            includePaths: bourbon,
            includePaths: neat,
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-css', function() {
    return gulp.src(['dist/css/pluma.css'])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
    return gulp.src(['src/js/utilidades.js', 'src/js/tests.js', 'src/js/tabs.js', 'src/js/sidebars.js', 'src/js/modales.js', 'src/js/desplegables.js', 'src/js/etiquetas.js', 'src/js/acordiones'])
        .pipe(concat('pluma.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('pluma.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('watch', ['sass', 'minify-css', 'minify-js', 'browserSync'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
