const cssReg = /([^{]+\{[^}]*})/g
const styleIncludeVaribleReg = /[\w-]+\s?:[^\$;]*\$[^;}]+;?/g
const emptyCssReg = /[^}]+\{[\s]*\}/g

module.exports = function (css, themeName, theme) {
  var themedCss
  if (themeName) {
    themedCss = css.replace(cssReg, '.' + themeName + ' $1')
  } else {
    themedCss = css
  }

  for (var variableName in theme) {
    var value = theme[variableName]
    var reg = new RegExp('\\$' + variableName + '([^\\w-])', 'g')
    themedCss = themedCss.replace(reg, value + '$1')
  }
  themedCss = themedCss.replace(styleIncludeVaribleReg, '')
    .replace(emptyCssReg, '')
  return themedCss
}
