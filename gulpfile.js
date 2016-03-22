'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var del = require('del');
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('build styles', function () {
  return gulp.src('./styles/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
                                './build/**/*.js',   
                                './build/**/*.js.map',   
                                './wwwroot/app/*.js',
                                './wwwroot/app/*.js.map',
                                './test/**/*.js',
                                './test/**/*.js.map'
                            ];
    del(typeScriptGenFiles, cb).then(paths => {console.log('Deleted files and folders:\n', paths.join('\n'))});
});

var tsProject_FE = ts.createProject('src/frontend/tsconfig.json',
    { typescript: require('typescript') });


// just build all the typescript files
gulp.task("build frontend code", function () {
    var tsResult  = tsProject_FE.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject_FE));
    return tsResult.pipe(sourcemaps.write('.')).pipe(gulp.dest('./build/frontend'));
});


var tsProject_BE = ts.createProject('src/server/tsconfig.json',
    { typescript: require('typescript') });


// just build all the typescript files
gulp.task("build server code", function () {
    var tsResult  = tsProject_BE.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject_BE));
    return tsResult.pipe(sourcemaps.write('.')).pipe(gulp.dest('./build/server'));
});