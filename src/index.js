var fs = require('fs')
var path = require('path')
var loaderUtils = require('loader-utils')

const variablesLoader = require('mk-sass-variables-loader/dist/loadSassVariables.js')
const getCssIncludeVariables = require('./getCssIncludeVariables')
const getThemeVariables = require('./getThemeVariables')
const themeRender = require('./themeRender')

function mergeOptions (obj1, obj2) {
  var obj3 = {}
  var attrname
  for (attrname in obj1) { obj3[attrname] = obj1[attrname] }
  for (attrname in obj2) { obj3[attrname] = obj2[attrname] }
  return obj3
}

module.exports = function (source) {
  var query = loaderUtils.parseQuery(this.query)
  var self = this

  if (Array.isArray(query.only) && query.only.length > 0 && !query.dynamic) {
    var notInOnly = true
    query.only.forEach(function (filePath) {
      if (path.normalize(filePath) === self.resourcePath) {
        notInOnly = false
        return
      }
    })

    if (notInOnly) {
      return source
    }
  }

  var vars = variablesLoader(this.resourcePath)
  var sassString = fs.readFileSync(this.resourcePath).toString()
  var cssString = getCssIncludeVariables(sassString)

  if (query.dynamic) {
    var allCssString = getCssIncludeVariables(sassString, true)
    var json = {
      css: allCssString,
      variables: vars
    }
    return 'module.exports =' + JSON.stringify(json) + ';'
  }

  this.cacheable()

  var themePath = query.themePath

  if (!themePath) {
    return source
  }

  this.addContextDependency(themePath)

  var themes = getThemeVariables(themePath, query.excludeTheme)
  var rt

  if (query.defaultTheme) {
    rt = ''
  } else {
    rt = source
  }

  for (var themeName in themes) {
    if (query.defaultTheme === themeName) {
      var allCss = getCssIncludeVariables(sassString, true)
      var defaultThemeVariables = mergeOptions(vars, themes[themeName])
      rt += themeRender(allCss, null, defaultThemeVariables)
    } else {
      themeName = themeName.replace(/([A-Z])/g, '-$1').toLowerCase()
      rt += themeRender(cssString, themeName, themes[themeName])
    }
  }
  return rt
}
