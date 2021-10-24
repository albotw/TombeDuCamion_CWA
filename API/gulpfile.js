"use strict";

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

function compile()
{
    var ts = require("gulp-typescript");
    var sourcemaps = require("gulp-sourcemaps");
    var reporter = ts.reporter.fullReporter();

    if (!tsProject)
    {
        var tsProject = ts.createProject("tsconfig.json");
    }

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/"));
}

function copy_data()
{
    return gulp.src("./JSON/*.json")
        .pipe(gulp.dest("dist/JSON/"));
}

function watch()
{
    return gulp.watch(["./src/**/*.ts", "./src/**/*.json"], compile);
}

function serve()
{
    return nodemon({
        script: "dist/index.js",
        ext: "js",
    })
}

exports.launch = gulp.series(
    gulp.parallel(
        compile,
    ),
    gulp.parallel(
        watch,
        serve
    )
);
