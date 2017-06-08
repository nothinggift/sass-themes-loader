const cssReg = /([^{]+\{[^}]*})/g
const cssCommaReg = /(}?[^,{]+),([^,])/g
const styleIncludeVaribleReg = /[^{:;]+\s?:[^\$;]*\$[^;}]+;?/g
const emptyCssReg = /[^}]+\{[\s]*\}/g

module.exports = function (css, themeName, theme) {
  var themedCss
  if (themeName) {
    themedCss = css.replace(cssReg, '.' + themeName + ' $1')
      .replace(cssCommaReg, '$1,.custom $2')
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
