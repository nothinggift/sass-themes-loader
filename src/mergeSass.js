const sass = require('node-sass')
const path = require("path")
const fs = require('fs')

const importReg = /\@import\s+['"]([^'"]+)['"];/g

module.exports = function (file) {
  let output = sass.renderSync({
    file: file
  })
  let files = output.stats.includedFiles
  files.reverse()
  let sassString = ''
  for (i in files) {
    let str = fs.readFileSync(files[i]).toString()
    sassString += str.replace(importReg, '')
  }
  return sassString
}
