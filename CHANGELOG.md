# Fannypack Changelog

## 1.3.0
- Upgraded to Babel 6!
- Added Babel's 'ES2015' preset
- Extracted `images` task to [fannypack-images](https://www.npmjs.com/package/fannypack-images)
- Extracted `iconFont` task to [fannypack-iconfont](https://www.npmjs.com/package/fannypack-iconfont)
- Extracted `svgSprite` task to [fannypack-svgsprite](https://www.npmjs.com/package/fannypack-svgsprite)
- Added new plugin, [fannypack-stylus](https://www.npmjs.com/package/fannypack-stylus)
- Condense core library files, results in fewer file count

## 1.2.0
- Minify CSS if running `production` task
- Remove `rev` tasks inside `development` build
- Hash **all** assets when running `rev`
- Don't hash JS files on `production` build. Must run `version`/`rev` if want a hashed output

## 1.1.0

- Remove `version` tasks from `production`

## 1.0.0

- First Release
