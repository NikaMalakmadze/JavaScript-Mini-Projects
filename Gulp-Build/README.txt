
V 1.0.0

This is Gulp Build to optimize frontend development and automatize different tasks, like:

    * clean and compressed html structure
    * clean and compressed css
    * clean, compressed and compatible js compressed
    * and more...

This Gulp Build uses:
    * Gulp and Different gulp plugins(listed down in package.json)
    * Webpack
    * Babel

At this moment it has two modes:
    * Docs (to build final version of your product)
        * Task to compress and clean HTML
        * Task to compress and clean CSS
        * Task to minify images
        * Task to clean compress and make compatible js code

    * Dev  (to work live on your product)
        * Live server to see changes immediantly
        * Task to Notify Errors
        * Task to watch different files and apply tasks to them when they change 
        * Same tasks as in Docs but not so 'minified'

Some cool features:
    * This Gulp Build has include package so you can split HTML into multiple components and work with them with loops statements and more...
    * It can compile SASS to CSS

Commands to run This Gulp Build(You have to be in its root Directory):

    gulp      ----- Runs Dev(Developer) mode
    gulp Docs ----- Runs Docs(Final Product) mode

    ctrl+c    ----- End tasks

In the future i will add more features!