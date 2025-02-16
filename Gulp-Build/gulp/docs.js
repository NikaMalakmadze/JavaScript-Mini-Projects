
const { task, src, dest, watch } = require('gulp');

// HTML
const fileinclude  = require('gulp-file-include');
const htmlClean    = require('gulp-htmlclean');
const webpHtml     = require('gulp-webp-html');

// CSS
const sass         = require('gulp-sass')(require('sass'));
const sourceMaps   = require('gulp-sourcemaps');
const sassGlob     = require('gulp-sass-glob');
const groupMedia   = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer').default;
const csso         = require('gulp-csso');
const webpCss      = require('gulp-webp-css');

// DEV
const liveServer   = require('gulp-server-livereload')
const clean        = require('gulp-clean');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const changed      = require('gulp-changed');
const fs           = require('fs');

// JS
const webpack      = require('webpack-stream');
const babel        = require('gulp-babel');

// const uglify       = require('gulp-uglify-es').default;

// IMAGES
const imagemin     = require('gulp-imagemin');
const webp         = require('gulp-webp').default;
const avif         = require('gulp-avif');

// FONTS

const fonter       = require('gulp-fonter');
const ttf2woff2    = require('gulp-ttf2woff2');

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

function htmlDocs () {
    return src(['./src/html/**/*.html', '!./src/html/components/*'])
            .pipe(changed('./docs/'))
            .pipe(plumber(plumberNotify('html')))
            .pipe(fileinclude(fileIncludeSettings))
            .pipe(webpHtml())
            .pipe(htmlClean())
            .pipe(dest('./docs/'))
}

function scssDocs() {
    return src('./src/scss/**/*.scss')
            .pipe(changed('./docs/css/'))
            .pipe(plumber(plumberNotify('scss')))
            .pipe(sourceMaps.init())
            .pipe(autoprefixer())
            .pipe(sassGlob())
            .pipe(webpCss())
            .pipe(groupMedia())
            .pipe(sass({ outputStyle: 'compressed' }))
            .pipe(csso())
            .pipe(sourceMaps.write())
            .pipe(dest('./docs/css/'))
}

function imagesDocs() {
    return src('./src/images/**/*', { encoding: false })
            .pipe(changed('./docs/img/'))
            .pipe(webp())
            .pipe(dest('./docs/img/'))

            .pipe(src('./src/images/**/*'), { encoding: false })
            .pipe(changed('./docs/img/'))
            .pipe(imagemin({ verbose: true }))
            .pipe(dest('./docs/img/'))

            .pipe(src('./src/images/**/*', { encoding: false }))
            .pipe(changed('./docs/img/'))
            .pipe(avif({ quality: 50 })) 
            .pipe(dest('./docs/img/'))
}

function fontsDocs() {
    return src('./src/fonts/**/*.{woff,woff2,ttf,otf,eot}', { encoding: false })
            .pipe(changed('./docs/fonts/'))
            .pipe(fonter({ formats: ["ttf", "woff", 'eot'] }))
            .pipe(dest('./docs/fonts/'))

            .pipe(src('./src/fonts/**/*.{woff,woff2,ttf,otf,eot}', { encoding: false }))
            .pipe(changed('./docs/fonts/'))
            .pipe(ttf2woff2())
            .pipe(dest('./docs/fonts/'))
}

function filesDocs() {
    return src('./src/files/**/*')
            .pipe(changed('./docs/files/'))
            .pipe(dest('./docs/files/'))
}

function scriptsDocs() {
    return src('src/js/*.js')
            .pipe(changed('./docs/js/'))
            .pipe(plumber(plumberNotify('js')))
            .pipe(babel(require('./../babel.config')))
            .pipe(webpack(require('./../webpack.config')))
            .pipe(dest('./docs/js/'))
}

const serverSettings = {
    livereload: true,
    open: true
}

function serverDocs() {
    return src('./docs/').pipe(liveServer(serverSettings))
}

function cleanDistDocs(done) {
    return src('docs', { read: false, allowEmpty: true }).pipe(clean())
}

task('htmlDocs', htmlDocs);
task('scssDocs', scssDocs);
task('scriptsDocs', scriptsDocs);
task('imagesDocs', imagesDocs);
task('fontsDocs', fontsDocs);
task('filesDocs', filesDocs);
task('serverDocs', serverDocs);
task('cleanDistDocs', cleanDistDocs);