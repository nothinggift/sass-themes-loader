const variablesLoader = require('mk-sass-variables-loader/dist/loadSassVariables.js')
const path = require('path')
const fs = require('fs')

module.exports = function (themePath, exclude) {
  var themeFiles = fs.readdirSync(themePath)
  if (!exclude) {
    exclude = []
  }
  themeFiles = themeFiles.filter(function (fileName) {
    return /\.scss$/.test(fileName) && exclude.indexOf(path.basename(fileName, '.scss')) === -1
  })
  var themes = {}
  themeFiles.forEach(function (fileName) {
    var themeName = path.basename(fileName, '.scss')
    var themeVariables = variablesLoader(path.resolve(themePath, fileName))
    themes[themeName] = themeVariables
  })
  return themes
}
