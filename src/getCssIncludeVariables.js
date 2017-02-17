const sass = require('node-sass')

const importReg = /\@import\s+['"]([^'"]+)['"];/g
const variableAssignmentReg = /\$[\w-]+\s?:[^;]+;/g
const variableStyleReg = /([\w-]+\s?:[^;]*)\$([\w-]+[^;]*;)/g
const styleNotIncludeVarible = /[\w-]+\s?:[^$]+;/g

module.exports = function (sassString, keepNormalCss) {
  sassString = sassString.replace(importReg, '')  // remove import
    .replace(variableAssignmentReg, '')  // remove all variable assignment
    .replace(variableStyleReg, '-style-name-$1-variables-$2') // replace style to avoid parse error

  var result = sass.renderSync({
    data: sassString,
    outputStyle: 'compact'
  })
  var cssString = result.css.toString()

  cssString = cssString.replace(/-style-name-/g, '') // revert style
    .replace(/-variables-/g, '$')

  if (!keepNormalCss) {
    cssString = cssString.replace(styleNotIncludeVarible, '')
      .replace(/^\s*\n/gm, '')  // remove blank lines
  }
  cssString = cssString.replace(/\n/g, '') // remove Newline character

  return cssString
}
