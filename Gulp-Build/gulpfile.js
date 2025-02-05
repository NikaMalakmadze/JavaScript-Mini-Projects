
const { task, series, parallel } = require('gulp');

// MODES
require('./gulp/dev.js')
require('./gulp/docs.js')

task('default',
    series(
    'cleanDistDev',
    parallel('htmlDev', 'scssDev', 'scriptsDev', 'imagesDev', 'fontsDev', 'filesDev'),
    parallel('watchingDev', 'serverDev')
))

task('Docs',
    series(
    'cleanDistDocs',
    parallel('htmlDocs', 'scssDocs', 'scriptsDocs', 'imagesDocs', 'fontsDocs', 'filesDocs'),
    parallel('serverDocs')
))