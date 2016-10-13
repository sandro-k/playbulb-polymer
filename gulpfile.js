'use strict'
const gulp = require('gulp')

gulp.task('generate-service-worker', (callback) => {
  let path = require('path')
  let swPrecache = require('sw-precache')
  let rootDir = 'app'

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [ rootDir + '/*.{html, png}', rootDir + '/elements/*.{js,html,png}', rootDir + '/bower_components/*/*.{js,html,png}', '/bower_components/*/!(Gruntfile.js)' ],
    stripPrefix: rootDir,
    replacePrefix: '/playbulb-polymer/app/'
  }, callback)
})
