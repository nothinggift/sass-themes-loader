const sass = require('node-sass')

const importReg = /\@import\s+['"]([^'"]+)['"];/g
const commentReg = /\/\*[\s\S]*\*\//g
const variableAssignmentReg = /\$[\w-]+\s?:[^;]+;/g
const variableStyleReg = /([\w-]+\s?:[^;]*)\$([\w-]+[^;]*;)/g
const styleNotIncludeVarible = /[^{;\n\r]+\s?:[^$;]+;/g

module.exports = function (sassString, keepNormalCss) {
  sassString = sassString.replace(importReg, '')  // remove import
    .replace(commentReg, '') // remove comment
    .replace(variableAssignmentReg, '')  // remove all variable assignment
    .replace(variableStyleReg, '-style-name-$1-variables-$2') // replace style to avoid parse error

  if (!sassString) {
    return sassString
  }

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
