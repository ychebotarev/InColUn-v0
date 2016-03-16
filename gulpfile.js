'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var del = require('del');
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');


gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
                                './build/*.js',   
                                './build/*.js.map',   
                                './wwwroot/app/*.js',
                                './wwwroot/app/*.js.map',
                                './test/*.js',
                                './test/*.js.map'
                            ];
    del(typeScriptGenFiles, cb).then(paths => {console.log('Deleted files and folders:\n', paths.join('\n'))});
});

var tsProject = ts.createProject('code/tsconfig.json',
    { typescript: require('typescript') });


// just build all the typescript files
gulp.task("build code", function () {
    var tsResult  = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.pipe(sourcemaps.write('.')).pipe(gulp.dest('./build/ux'));
});