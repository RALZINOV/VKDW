
const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const webpack = require('webpack');
const rename = require('gulp-rename');
const jeditor = require('gulp-json-editor');
// const uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');
const cleanCSS = require('gulp-clean-css');
const webpackConfig = require('./webpack.config.js');
const extensionManifest = require('./src/manifest.json');

const buildFolder = 'build-tmp';

const extensionNextVersion = (() => {
  const prevVersion = extensionManifest.version.split('.');
  const [major, minor] = prevVersion;
  const newVersion = `${major}.${parseInt(minor, 10) + 1}`;

  console.log(`__________ Build new version: ${newVersion} ________________________`);

  return newVersion;
})();

gulp.task('clean-tmp', () => {
  return del(buildFolder);
});

gulp.task('build-js', () => {
  return gulp.src('src/components/*.*')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(`${buildFolder}/workers`));
});

gulp.task('cssmin', () => {
  return gulp.src('src/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('copy-assets', () => {
  return gulp.src('src/img/*.*')
    .pipe(gulp.dest(`${buildFolder}/img`));
});

gulp.task('copy-injector', () => {
  return gulp.src('src/injector.js')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('set-manifest', () => {
  return gulp.src('src/manifest.json', { base: './' })
    .pipe(jeditor({
      version: extensionNextVersion,
    }))
    .pipe(gulp.dest('./'))
    .pipe(rename({
      dirname: '',
    }))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('zip-project', () => {
  return gulp.src(`${buildFolder}/**/*.*`)
    .pipe(zip(`VKDW_${extensionNextVersion}.zip`))
    .pipe(gulp.dest('./packages'));
});

gulp.task('prepare-files', gulp.parallel(
    'build-js',
    'cssmin',
    'copy-assets',
    'copy-injector',
    'set-manifest'));

gulp.task('build-package', gulp.series('prepare-files', 'zip-project', 'clean-tmp'));

