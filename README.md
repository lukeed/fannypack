
![Fannypack](fannypack.jpg)

# Fannypack
> The tool belt for front-end developers

Fannypack is a lean, lightning-fast build system that suits any application. Fannypack comes packaged with several common CSS and JavaScript pre-processors. It's also extremely simple to add, customize, or override any task or setting.

This makes Fannypack a preferred choice for both beginner and advanced front-end developers.

- [Features](#features)
- [Planned Features](#planned-features)
- [Installation](#installation)
  - [Node](#nodejs)
  - [Getting Tools](#getting-tools)
  - [Script Commands](#script-commands)
- [Usage](#usage)
  - [Basic](#basics)
  - [Importing Tasks](#importing-tasks)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Production](#production)
  - [Cache-Busting](#cache-busting)
  - [Deployment](#deployment)
  - [Testing](#testing)
- [Extensions](#extensions)
  - [Creating Custom Tasks](#creating-custom-tasks)
  - [Overwriting Tasks](#overwriting-tasks)
  - [Extending Tasks](#extending-tasks)
  - [Publishing Tasks](#publishing-tasks)
- [Changelog](https://github.com/lukeed/fannypack/blob/master/CHANGELOG.md)

**Fannypack Goodies:**
- [Starter Kit](https://github.com/lukeed/fannypack-starter-html)
- [Browse Plugins](https://www.npmjs.com/search?q=fannypack)


## Features
- **SASS:**
  - Indented, SCSS, or both
  - Libsass (node-sass) for super fast compiles
  - CSS Autoprefixer
- **BrowserSync:**
  - Immediately & Automatically re-compiles files and refreshes your browser window(s).
  - Allows you to connect & test multiple devices at once
  - ([Learn More](http://www.browsersync.io/))
- **ES6/ES2015 Support:**
  - Supports ES6 Modules (via [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/))
  - Multiple bundles
  - Shared code extraction
  - Source Mapping
- **HTML Pre-Processor**:
  - Static templating with [Nunjucks](https://mozilla.github.io/nunjucks/) and [gulp-data](https://github.com/colynb/gulp-data)
- **Concatenation:**
  - Combine multiple files into a new output file
- **Development Mode:**
  - File Watching and Live Reloading with [BrowserSync](http://www.browsersync.io/)
  - Source Mapping
- **Production Builds:**
  - JavaScript is uglified and minified
  - CSS and Images are minified
  - **Cache Busting:** Generate a `rev-manifest.json` file, append unique hashes to filenames, and automatically update all original filename references.
  - File size reporting
  - Local production sever for testing
- **Testing:**
  - JS test examples with Karma, Mocha, Chai, Sinon
  - Travis CI integration
- **Deployment Support:**
  - Wrap custom deploy logic into an easy-to-use task

## Planned Features

These are [Fannypack plugins](https://www.npmjs.com/search?q=fannypack) that are planned and on their way soon!

- [ ] Coffeescript
- [ ] PHP TDD Test Runner + Watcher
- [ ] Angular TemplateCache
- [ ] React JSX Compile
- [x] [Stylus](https://www.npmjs.com/package/fannypack-stylus)
- [x] [LESS](https://www.npmjs.com/package/fannypack-less)
- [x] [Riot JS Tags](https://www.npmjs.com/package/fannypack-riot-tags)
- [x] [Image Minification](https://www.npmjs.com/package/fannypack-images)
- [x] [Generate an IconFont](https://www.npmjs.com/package/fannypack-iconfont) from multiple SVG files
- [x] [Generate a single SVG sprite (compressed)](https://www.npmjs.com/package/fannypack-svgsprite) from multiple SVG files


## Installation
### Node.js
Before installing Fannypack, you first must ensure that Node.js is installed on your machine.

```
node -v
```

Make sure Node 0.12.x is installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

You can easily install Node by visiting [their download page](http://nodejs.org/download/). Don't worry, it's quick and easy!

### Getting Tools
With Node installed, you can add Fannypack and Gulp to your `package.json` file, located in your project's root directory.
```bash
npm install fannypack gulp --save-dev
```

OR --- If you do not have a `package.json` file, you can [run a NPM command](https://docs.npmjs.com/cli/init) or create an empty file with the following content:
```json
{
  "private": true,
  "devDependencies": {
    "gulp": "^3.9.0",
    "fannypack": "^1.0.0"
  }
}
```
Then you must install the tools.
```bash
cd path/to/project/root
npm install
```

### Script Commands
This step is optional, but **strongly recommended**.

NPM can run custom commands for you, making it much simpler to chain a series of other commands commands together. In effect, this makes you have to worry about less.

If you'd like to do less (c'mon!), paste the following block into your `package.json` file:
```javascript
"scripts": {
  "gulp": "gulp",
  "deploy": "gulp deploy",
  "production": "gulp build:production",
  "version": "gulp rev uglify",
  "development": "gulp",
  "watch": "gulp webpack:watch watch",
  "karma": "./node_modules/fannypack/node_modules/.bin/karma",
  "tests": "npm run production && npm run karma start --single-run"
}
```

You may now run commands such as:
`npm run gulp`, `npm run production`, `npm run watch`, etc.

Lost? View the [example package.json file](https://github.com/lukeed/fannypack/blob/master/example/package.json)

## Usage
Now that Fannypack has been installed, you'll be compiling, concatenating, and minifying in no time! The `gulpfile.js` file in your project's root directory will contain all your tasks and configuration.

### Basics
In order to start using Fannypack, your `gulpfile.js` needs to include this code at minimum. This does not include any configuring, therefore will assume all defaults.

```javascript
var Fannypack = require('fannypack')
Fannypack.init()
```

### Importing Tasks
Sometimes, you'll want to include extra Gulp tasks to Fannypack. Whether you've [created your own](#extensions) or [downloaded](https://www.npmjs.com/search?q=fannypack) a plugin, you can import it without a fuss!

```javascript
// gulpfile.js

var Fannypack = require('fannypack')

// Import plugins here:
require('fannypack-less')
require('./my-custom-task')

Fannypack.init()
```

### Configuration
Of course, the defaults often don't fit your project structure. You may modify any task as desired, turn it off entirely, or add custom tasks' values!

***Note:*** *It's not always necessary to turn off unused tasks. Nothing will happen by default if source files can't found. However, there may be times that you don't want a certain task to run; e.g. `browserSync` or `imagemin`.*

```javascript
// gulpfile.js

var Fannypack = require('fannypack')

// Import plugins here:
require('fannypack-less')

// Begin Customizing
Fannypack.Config.root = {
  src: './custom/src',
  dest: './custom/dest'
}

// All tasks' 'src' are relative to Config.root.src
Fannypack.Config.sass.src = 'styles' // => './custom/src/styles'

// All tasks' 'dest' are relative to Config.root.dest
Fannypack.Config.sass.dest = 'assets/css' // => './custom/dest/assets/css'

// All tasks are watched by default
Fannypack.Config.images.watchTask = false

// Some tasks may require additional fields
Fannypack.Config.js.entries = {
  // rename 'index.js' bundle to 'app.js'
  app: ['./index.js'],
  // compile then concatenate files to form 'comments.js'
  comments: [ './comments1.js', './comments2.js', ]
}

// Completely turn off a task
Fannypack.Config.fonts = false

// Add LESS (new Task) config
Fannypack.Config.less = {
  src: 'less', // => './custom/src/less'
  dest: 'assets/css', // => './custom/dest/assets/css'
  watchTask: true,
  codeTask: true,
  options: {}.
  extensions: ['less']
}

// We're ready, start!
Fannypack.init()
```

### Development
When using Fannypack for development, run: `npm run gulp`
OR --- If you do not have [Fannypack's Scripts installed](#script-commands), run: `gulp`

### Production
When your project is ready for production, run: `npm run production`
OR --- If you do not have [Fannypack's Scripts installed](#script-commands), run: `gulp build:production`

### Cache-Busting
After your production assets have been generated, you may choose to generate unique filenames for your assets. This will ensure that your users will always receive your project's most recent assets after each deployment!

If you choose to use this feature, run: `npm run version`
OR --- If you do not have [Fannypack's Scripts installed](#script-commands), run: `gulp rev uglify`

### Deployment
If you have any deployment logic or tasks (eg, publishing to gh-pages), you will need to [overwrite Fannypack's deploy task](#overwriting-tasks).

Then you can run: `npm run deploy`
OR --- If you do not have [Fannypack's Scripts installed](#script-commands), run: `gulp deploy`

### Testing
All javascript tests should be located within a directory or directories named `__tests__`.
For example, assuming:
```javascript
Fannypack.Config.root.src = './src'
Fannypack.Config.js.src = './js'
```
You may place all your tests within: `./src/js/__tests__`.

If you prefer keeping everything modular, you may also do:
`./src/js/modules/chat/__test__`. This may be done instead of or in addition to the setup above.

Once you've made and placed your Karma tests, run: `npm run test`
OR --- If you do not have [Fannypack's Scripts installed](#script-commands), run:
```bash
gulp build:production && ./node_modules/fannypack/node_modules/.bin/karma start --single-run
```

This will use the Karma NPM package that was installed with Fannypack.


## Extensions

Fannypack can work with **ANY** of your existing favorite Gulp tasks. All you need to do is give them your customized `Fannypack.Config`.

In order to do this, Fannypack has a `Fannypack.Tasks` object, which allows you to simply add or overwrite any task. Additionally, Fannypack exposes several of its core NPM packages so that you don't need to re-install any duplicate packages.

### Creating Custom Tasks
```javascript
// custom-task.js

var Fannypack = require('fannypack')
var gulp      = require('gulp')
var $         = Fannypack.$ // Fannypack's Plugins

// Any Additional Packages
var insert      = require('gulp-insert')
// ...

Fannypack.Tasks['taskName'] = function(config){
  // 'config' = final Fannypack.Config
  if(!config.taskName) return

  var paths = {
    src: $.Pather.join(config.root.src, config.taskName.src, '/**/*.{' + config.taskName.extensions + '}'),
    dest: $.Pather.join(config.root.dest, config.taskName.dest)
  }

  gulp.task('taskName', function() {
    return gulp.src(paths.src)
      // do stuff
      .on('error', $.ErrorHandler)
      .pipe( gulp.dest(paths.dest) )
      // reload browser after task runs
      .pipe( $.BrowserSync.reload({stream:true}) )
  })
}
```

Then, your Config object inside `gulpfile.js` must contain the necessary values in order for your task to run.

***Note:*** *It is recommended that you do not include configuration options inside your task. Future users of your task may not appreciate that!*

You must also include your task within your `gulpfile.js`. If you choose not to [publish your task](#), you may use a relative path.

```javascript
// gulpfile.js

var Fannypack = require('fannypack')

require('fannypack-less') // Published package, via NPM
require('./path/to/custom-task.js') // relative path

// ...
```

### Overwriting Tasks
You may completely overwrite a default Fannypack task. For example, you may need to include your own deployment logic.

```javascript
// custom-deploy-task.js

var Fannypack = require('fannypack')
var gulp      = require('gulp')
var $         = Fannypack.$ // Fannypack's Plugins

Fannypack.Tasks['deploy'] = function(config){
  gulp.task('deploy', function(){
    // return gulp.src ....
  })
}
```

Then be sure to update your `Fannypack.Config` object with your desired values.

Also, you must include the new task within your `gulpfile.js`:

```javascript
// gulpfile.js

var Fannypack = require('fannypack')

require('./path/to/custom-deploy-task.js')

// ...

Fannypack.init()
```

### Extending Tasks
You may extend any Fannypack task. For example, you may want to run additional logic *after* the `images` task runs.

```javascript
// custom-image-task.js

var Fannypack = require('fannypack')
var gulp      = require('gulp')
// Fannypack's Plugins
var $         = Fannypack.$

// cache the original Fannypack task
var oldTask = Fannypack.Tasks.images

Fannypack.Tasks['images'] = function(config){
  // cache the original gulp task function
  var oldGulp = oldTask(config).tasks.images.fn

  // redeclare & overwrite 'images' gulp task
  gulp.task('images', function(){
    // do the old stuff
    oldGulp()
    // do any new stuff
    console.log('doing new stuff right meow')
  })
}

```

### Publishing Tasks
In order to [publish an NPM package](https://docs.npmjs.com/getting-started/publishing-npm-packages):

1. Create a new directory with the name of your task. (Recommended: begin with 'fannypack')
2. Move task logic into a new `index.js` file
3. Create a new `package.json` file, with the following required fields:
  - "name" (should match your directory's name)
  - "version"
  - "main" (should be `index.js`)
  - "author"
  - "repository"
  - "dependencies"
4. Navigate to your module's directory: `cd path/to/module`
5. Publish your package to NPM: `npm publish`

**Thanks for your contribution!**
