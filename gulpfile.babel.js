import gulp from 'gulp'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import jsmin from 'gulp-jsmin'
import buffer  from 'vinyl-buffer';
import imagemin from 'gulp-imagemin'

const reload = browserSync.reload,
    reloadFiles = [
        './script.js',
        './style.css',
        './*.html'
    ],
    proxyOptions = {
        proxy: 'localhost/grid',
        notify: false
    }

gulp.task('server',(done) => {
    browserSync.init(reloadFiles,proxyOptions)
    done()
})

gulp.task('css', (done) =>{
    gulp.src('./scss/style.scss')
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./scss/'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
    done()
})

gulp.task('js', (done) =>{
    browserify('./js/index.js')
    .transform(babelify)
    .bundle()
    .on('error', err=> console.log(err.message))
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(sourcemaps.write('./'))
    .pipe(jsmin())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
    done()
})

gulp.task('default', gulp.parallel(['css','server','js', (done) => {
    gulp.watch('./scss/**/*.+(scss|css)',gulp.series('css'))
    gulp.watch('./js/**/*.js',gulp.series('js'))
    done()
}])) 