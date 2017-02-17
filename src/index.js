var fs = require('fs')
var path = require('path')
var loaderUtils = require('loader-utils')

const variablesLoader = require('mk-sass-variables-loader/dist/loadSassVariables.js')
const getCssIncludeVariables = require('./getCssIncludeVariables')
const getThemeVariables = require('./getThemeVariables')
const themeRender = require('./themeRender')

function mergeOptions (obj1, obj2) {
  let obj3 = {}
  let attrname
  for (attrname in obj1) { obj3[attrname] = obj1[attrname] }
  for (attrname in obj2) { obj3[attrname] = obj2[attrname] }
  return obj3
}

module.exports = function (source) {
  let query = loaderUtils.parseQuery(this.query)
  let options = Object.assign({}, this.options.sassThemes, this.sassThemes, query)
  let self = this

  if (Array.isArray(options.only) && options.only.length > 0 && !options.dynamic) {
    let notInOnly = true
    options.only.forEach(function (filePath) {
      if (path.normalize(filePath) === self.resourcePath) {
        notInOnly = false
        return
      }
    })

    if (notInOnly) {
      return source
    }
  }

  let vars = variablesLoader(this.resourcePath)
  let sassString = fs.readFileSync(this.resourcePath).toString()
  let cssString = getCssIncludeVariables(sassString)

  if (options.dynamic) {
    let allCssString = getCssIncludeVariables(sassString, true)
    let json = {
      css: allCssString,
      variables: vars
    }
    return 'module.exports =' + JSON.stringify(json) + ';'
  }

  this.cacheable()

  let themePath = options.themePath

  if (!themePath) {
    return source
  }

  this.addContextDependency(themePath)

  let themes = getThemeVariables(themePath, options.excludeTheme)
  let rt

  if (options.defaultTheme) {
    rt = ''
  } else {
    rt = source
  }

  for (let themeName in themes) {
    if (options.defaultTheme === themeName) {
      let allCss = getCssIncludeVariables(sassString, true)
      let defaultThemeVariables = mergeOptions(vars, themes[themeName])
      rt += themeRender(allCss, null, defaultThemeVariables)
    } else {
      themeName = themeName.replace(/([A-Z])/g, '-$1').toLowerCase()
      rt += themeRender(cssString, themeName, themes[themeName])
    }
  }
  return rt
}
