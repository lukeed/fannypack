# Fannypack
The tool belt for front-end developers

Fannypack is a lean, lightning-fast build system that suits any application. Fannypack comes packaged with several common CSS and JavaScript pre-processors. It's also extremely simple to add, customize, or override any task or setting.

This makes Fannypack a preferred choice for both beginner and advanced front-end developers.

- [Features](#features)
- [Installation](#installation)
  - [Node](#node.js)
  - [Getting Tools](#getting-tools)
  - [Script Commands](#script-commands)
- [Usage](#usage)
  - [Basic](#basics)
  - [Importing Tasks](#importing-tasks)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Production](#production)
  - [Cache-Busting](#cache-busting)
- [Extensions](#extensions)


<!-- - [Starter Kit](#starter) -->
- [Plugins](https://www.npmjs.com/search?q=fannypack)


## Features
- **SASS:**
  - Indented, SCSS, or both
  - Libsass (node-sass) for super fast compiles
  - CSS Autoprefixer
- **JS:**
  - Supports ES6 Modules (via [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/))
  - Multiple bundles
  - Shared code extraction
  - Source Mapping
- **HTML**:
  - Static templating with [Nunjucks](https://mozilla.github.io/nunjucks/) and [gulp-data](https://github.com/colynb/gulp-data)
- **Images:**
  - **SVG Sprites**: Compiles a spritesheet from a folder of SVGs
  - Compression with image-min
- **Fonts:**
  - Generate an **Icon Font:** from a folder of SVGs
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
    "fannypack": "^0.9.0"
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
  "test": "npm run production && npm run karma start --single-run"
}
```

You may now run commands such as:
`npm run gulp`, `npm run production`, `npm run watch`, etc.


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


## Extensions
Incomplete
