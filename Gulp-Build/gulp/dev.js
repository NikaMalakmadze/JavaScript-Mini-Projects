
const { task, src, dest, watch } = require('gulp');

// HTML
const fileinclude  = require('gulp-file-include');

// CSS
const sass         = require('gulp-sass')(require('sass'));
const sourceMaps   = require('gulp-sourcemaps');
const sassGlob     = require('gulp-sass-glob');

// DEV
const liveServer   = require('gulp-server-livereload')
const clean        = require('gulp-clean');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const changed      = require('gulp-changed');
const { compareContents } = require('gulp-changed');

// JS
const webpack      = require('webpack-stream');
const babel        = require('gulp-babel');

// const uglify       = require('gulp-uglify-es').default;

// IMAGES
const imagemin     = require('gulp-imagemin');

const plumberNotify = (name) => {
    return {
        errorHandler: notify.onError({
            title: name,
            message: 'Error <%= error.message %>',
            sound: false,
        })
    }
}

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}

function htmlDev () {
    return src(['./src/html/**/*.html', '!./src/html/components/*.html'])
            .pipe(changed('./build/', { hasChanged: compareContents }))
            .pipe(plumber(plumberNotify('html')))
            .pipe(fileinclude(fileIncludeSettings))
            .pipe(dest('./build/'))
}

function scssDev() {
    return src('./src/scss/**/*.scss')
            .pipe(changed('./build/css/'))
            .pipe(plumber(plumberNotify('scss')))
            .pipe(sourceMaps.init())
            .pipe(sassGlob())
            .pipe(sass())
            .pipe(sourceMaps.write())
            .pipe(dest('./build/css/'))
}

function imagesDev() {
    return src('./src/images/**/*')
            .pipe(changed('./build/img/'))
            .pipe(imagemin({ verbose: true }))
            .pipe(dest('./build/img/'))
}

function fontsDev() {
    return src('./src/fonts/**/*')
            .pipe(changed('./build/fonts/'))
            .pipe(dest('./build/fonts/'))
}

function filesDev() {
    return src('./src/files/**/*')
            .pipe(changed('./build/files/'))
            .pipe(dest('./build/files/'))
}

function scriptsDev() {
    return src('./src/js/*.js')
            .pipe(changed('./build/js/'))
            .pipe(plumber(plumberNotify('js')))
            .pipe(babel(require('./../babel.config')))
            .pipe(webpack(require('./../webpack.config')))
            .pipe(dest('./build/js/'))
}

const serverSettings = {
    livereload: true,
    open: true
}

function serverDev() {
    return src('./build/').pipe(liveServer(serverSettings))
}

function watchingDev() {
    watch('./src/scss/**/*.scss', scssDev)
    watch('./src/**/*.html', htmlDev)
    watch('./src/js/**/*.js', scriptsDev)
    watch('./src/fonts/**/*', fontsDev)
    watch('./src/files/**/*', filesDev)
    watch('./src/images/**/*', imagesDev)
}

function cleanDistDev() {
    return src('build', { read: false, allowEmpty: true }).pipe(clean())
}

task('htmlDev', htmlDev);
task('scssDev', scssDev);
task('scriptsDev', scriptsDev);
task('imagesDev', imagesDev);
task('fontsDev', fontsDev);
task('filesDev', filesDev);
task('serverDev', serverDev);
task('watchingDev', watchingDev);
task('cleanDistDev', cleanDistDev);