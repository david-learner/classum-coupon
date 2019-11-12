var gulp = require('gulp');

var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var runSequence = require('gulp4-run-sequence');
var tsProject = ts.createProject('./tsconfig.json');

gulp.task('compile', function() {
    // src내 모든 ts 컴파일 결과를 dist로 전달
    var stream = gulp.src(['./src/**/*.ts'], {base: './src'})
    .pipe(tsProject())
    .pipe(gulp.dest('./dist'));
    return stream;
});


gulp.task('test', function(){
    // 컴파일된 dist내 js파일 중 test에 해당하는 것들 실행
    var stream = gulp.src(['./dist/test/**/*.test.js'], {base: '.'})
    .pipe(mocha({
        reporter: 'spec'
    }));
    return stream;
});

gulp.task('sequence', function(done){
    // 순차실행 compile -> test
    // 기본값은 비동기
    runSequence('compile', 'test', function() {
        done();
    });
});

gulp.task('default', gulp.series('sequence'));