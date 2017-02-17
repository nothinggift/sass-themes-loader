<template>
  <pre><code v-html="html"></code></pre>
</template>
<style scoped>
</style>
<script>
  import 'prismjs/themes/prism.css'
  import Prism from 'prismjs'
  export default{
    data () {
      return {
        html: ''
      }
    },
    methods: {
      highlight: function () {
        let code = this.$slots.default[0].text
        if (this.format) {
          code = this.formatCode(code)
        }
        require('prismjs/components/prism-' + this.language + '.js')
        this.html = Prism.highlight(code, Prism.languages[this.language])
      },
      formatCode: function (code) {
        let lineBreaker = [
          {
            reg: '\\[',
            step: 1
          },
          {
            reg: '\\]',
            step: -1
          },
          {
            reg: '{',
            step: 1
          },
          {
            reg: '}',
            step: -1
          },
          {
            reg: ',',
            step: 0
          },
          {
            reg: ';',
            step: 0
          }
        ]
        code = code.replace(/^\s/, '')
          .replace(/\n\s*/g, '--lineBreaker0--')
        for (let i = 0; i < lineBreaker.length; i++) {
          let reg = new RegExp(lineBreaker[i].reg, 'g')
          let tag = lineBreaker[i].reg.replace('\\', '')
          if (lineBreaker[i].step === 0) {
            code = code.replace(reg, '--notAlone--' + tag + '--lineBreaker' + lineBreaker[i].step + '--')
          } else if (lineBreaker[i].step < 0) {
            code = code.replace(reg, '--lineBreaker' + lineBreaker[i].step + '--' + tag + '--lineBreaker0--')
          } else {
            code = code.replace(reg, tag + '--lineBreaker' + lineBreaker[i].step + '--')
          }
        }
        code = code.replace(/(--lineBreaker-?\d--)--notAlone--/g, '').replace(/--notAlone--/g, '')
        let match
        let currentStep = 0
        let reg = /--lineBreaker(-?\d)--/
        while ((match = reg.exec(code)) != null) {
          let step = match[1]
          let space = ''
          currentStep += parseInt(step)
          for (let i = 0; i < currentStep; i++) {
            space += '  '
          }
          code = code.replace(reg, '\n' + space)
        }
        return code.replace(/\n\s*\n/g, '\n').replace(/\n+/g, '\n')
      }
    },
    mounted: function () {
      this.highlight()
    },
    beforeUpdate: function () {
      this.highlight()
    },
    props: {
      language: {
        type: String,
        default: 'html'
      },
      format: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
