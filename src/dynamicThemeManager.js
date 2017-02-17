var themeRender = require('./themeRender')
const styleNotIncludeVarible = /[\w-]+\s?:[^$]+;/g
const emptyCssReg = /[^}]+\{[\s]*\}/g

function mergeOptions (obj1, obj2) {
  var obj3 = {}
  var attrname
  for (attrname in obj1) { obj3[attrname] = obj1[attrname] }
  for (attrname in obj2) { obj3[attrname] = obj2[attrname] }
  return obj3
}

module.exports = {
  baseCss: {},
  themes: {},
  setBaseCss: function (css, tag) {
    if (tag) {
      this.baseCss[tag] = css
    } else {
      this.baseCss.default = css
    }
  },
  registerTheme: function (name, vars, options) {
    var themedCss = this.cssRender(name, vars, options)
    this.addTheme(themedCss, name)
  },
  cssRender: function (name, vars, options) {
    var themedCss

    if (!vars) {
      vars = {}
    }

    if (!options) {
      options = {}
    }

    var defaultOptions = {
      baseCss: 'default',
      removeThemeClass: false,
      removeNoVaribleStyle: true,
      useDefaultVaribles: false
    }

    options = mergeOptions(defaultOptions, options)

    var css = this.baseCss[options.baseCss].css

    if (options.removeNoVaribleStyle) {
      css = css.replace(styleNotIncludeVarible, '')
        .replace(emptyCssReg, '')
    }

    if (options.useDefaultVaribles) {
      vars = mergeOptions(this.baseCss[options.baseCss]['variables'], vars)
    }
    if (options.removeThemeClass) {
      themedCss = themeRender(css, null, vars)
    } else {
      themedCss = themeRender(css, name, vars)
    }
    return themedCss
  },
  addTheme: function (css, name) {
    this.removeTheme(name)
    this.themes[name] = css
    var style = window.document.createElement('style')
    style.setAttribute('id', this.generateNodeId(name))
    style.innerHTML = css
    window.document.head.appendChild(style)
  },
  removeTheme: function (name) {
    delete this.themes[name]
    var id = this.generateNodeId(name)
    var node = window.document.getElementById(id)
    if (node) {
      node.parentNode.removeChild(node)
    }
  },
  generateNodeId: function (name) {
    return 'dynamic-sass-theme-' + name
  }
}
