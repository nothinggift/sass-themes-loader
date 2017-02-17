<template>
  <md-theme md-name="white">
    <md-layout :md-gutter="24">
      <md-layout md-flex="33" md-column class="sass-file">
        <h2 class="md-title">sass</h2>
        <md-card>
          <div class="file-list-item">
            <md-icon>keyboard_arrow_down</md-icon>
            <md-icon>folder_open</md-icon>
            <span class="file-name">stylesheets</span>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">variables.scss</span>
            <code-block language="sass" class="code-block">$color: #333;</code-block>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">style1.scss</span>
            <code-block language="sass" class="code-block">@import './variables';p {color: $color;}</code-block>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">style2.scss</span>
            <code-block language="sass" class="code-block">@import './variables';b {color: $color;}</code-block>
          </div>
          <div class="file-list-item">
            <md-icon>keyboard_arrow_down</md-icon>
            <md-icon>folder_open</md-icon>
            <span class="file-name">themes</span>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">red.scss</span>
            <code-block language="sass" class="code-block">$color: red;</code-block>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">blue.scss</span>
            <code-block language="sass" class="code-block">$color: blue;</code-block>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">green.scss</span>
            <code-block language="sass" class="code-block">$color: green;</code-block>
          </div>
        </md-card>
        <h2 class="md-title">webpack config</h2>
        <code-block language="javascript" class="code-block">{{webpackConfig}}</code-block>
      </md-layout>
      <md-layout md-flex="33" md-column >
        <h2 class="md-title">option</h2>
        <md-card>
          <div class="option-item">
            <span class="md-subheading">themePath(required):</span>
            <span class="md-caption">String,the absolute path of theme folder.</span>
            <md-input-container>
              <label>The path of theme folder</label>
              <md-input disabled></md-input>
            </md-input-container>
          </div>
          <div class="option-item">
            <span class="md-subheading">defaultTheme:</span>
            <span class="md-caption">String,the theme name as default.</span>
            <div>
              <md-radio v-model="sassDefaultTheme"  name="my-test-group1" md-value="">null</md-radio>
              <md-radio v-model="sassDefaultTheme"  name="my-test-group1" md-value="red">red</md-radio>
              <md-radio v-model="sassDefaultTheme"  name="my-test-group1" md-value="blue">blue</md-radio>
              <md-radio v-model="sassDefaultTheme"  name="my-test-group1" md-value="green">green</md-radio>
            </div>
          </div>
          <div class="option-item">
            <span class="md-subheading">excludeTheme:</span>
            <span class="md-caption">Array,theme name in the array will be ignored.</span>
            <div>
              <md-checkbox name="sass-exclude-theme" v-model="sassExcludeTheme.red">red</md-checkbox>
              <md-checkbox name="sass-exclude-theme" v-model="sassExcludeTheme.blue">blue</md-checkbox>
              <md-checkbox name="sass-exclude-theme" v-model="sassExcludeTheme.green">green</md-checkbox>
            </div>
          </div>
          <div class="option-item">
            <span class="md-subheading">only:</span>
            <span class="md-caption">Array,only the sass file that path in array will be themed.</span>
            <div>
              <md-checkbox name="sass-only" v-model="sassOnly.style1">style1</md-checkbox>
              <md-checkbox name="sass-only" v-model="sassOnly.style2">style2</md-checkbox>
            </div>
          </div>
        </md-card>
        <h2 class="md-title">result</h2>
        <code-block language="sass" class="code-block">{{resultSass}}</code-block>
      </md-layout>
      <md-layout md-flex="33" md-column>
        <h2 class="md-title">preview</h2>
        <md-card>
          <div class="preview-block">
            <div class="md-caption">without class</div>
            <p>this is a p tag</p>
            <b>this is a b tag</b>
          </div>
          <div class="preview-block red">
            <div class="md-caption">class red</div>
            <p>this is a p tag</p>
            <b>this is a b tag</b>
          </div>
          <div class="preview-block blue">
            <div class="md-caption">class blue</div>
            <p>this is a p tag</p>
            <b>this is a b tag</b>
          </div>
          <div class="preview-block green">
            <div class="md-caption">class green</div>
            <p>this is a p tag</p>
            <b>this is a b tag</b>
          </div>
        </md-card>
      </md-layout>
    </md-layout>
  </md-theme>
</template>
<style>
  .md-card {
    width:100%;
    padding:16px;
  }
  .file-list-item{
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .file-list-item .md-icon{
    font-size:20px;
    margin:0;
  }
  .file-list-item.two-level{
    padding-left:28px;
  }
  .file-name{
    margin-left:4px;
    width:90px;
  }
  .code-block ,.code-block-no-color{
    overflow-x: auto;
    position: relative;
    border-radius: 2px;
    background-color: #f4f4f4;
    font-family: "Operator Mono", "Fira Code", Menlo, Hack, "Roboto Mono", "Liberation Mono", Monaco, monospace;
    font-size: 14px;
    line-height: 1.4em;
    margin-bottom:8px;
    padding:16px;
  }
  .sass-file .code-block{
    margin-left:16px;
    flex:1;
  }
  pre {
    margin: 0;
  }
  .option-item {
    margin-bottom:16px;
  }
  code {
    width:100%;
  }
  .preview-block {
    background-color: #f4f4f4;
    padding:16px;

    margin:16px 0;
  }
</style>
<script>
  import CodeBlock from './CodeBlock.vue'

  import manager from '../../src/dynamicThemeManager'
  // import style1Json from 'theme?dynamic!../../test/style.scss'

  let baseSass = {
    style1: '@import "./variables";p {color: $color;}',
    style2: '@import "./variables";b {color: $color;}'
  }
  let style1Json = {
    css: 'p { color: $color;}',
    variables: {
      'color': '#333'
    }
  }

  let style2Json = {
    css: 'b { color: $color;}',
    variables: {
      'color': '#333'
    }
  }

  let themes = {
    red: {
      color: 'red'
    },
    blue: {
      color: 'blue'
    },
    green: {
      color: 'green'
    }
  }

  manager.setBaseCss(style1Json, 'style1')
  manager.setBaseCss(style2Json, 'style2')

  export default{
    data () {
      return {
        sassDefaultTheme: '',
        sassExcludeTheme: {
          red: false,
          blue: false,
          green: false
        },
        sassOnly: {
          style1: false,
          style2: false
        },
        resultSass: ''
      }
    },
    watch: {
      $data: {
        handler: function () {
          this.getResultSass()
        },
        deep: true
      }
    },
    methods: {
      getOptionString: function (obj, pre) {
        if (!pre) {
          pre = ''
        }
        let o = []
        for (let i in obj) {
          if (obj[i]) {
            o.push(pre + i)
          }
        }
        return '["' + o.join('", "') + '"],'
      },
      renderResultSassByName: function (baseName) {
        let resultCss = ''
        let resultSass = ''
        if (this.sassDefaultTheme !== '') {
          let css = manager.cssRender(null, themes[this.sassDefaultTheme], {
            baseCss: baseName,
            removeThemeClass: true
          })
          resultCss += css
          resultSass += css
        } else {
          resultSass += baseSass[baseName]
          resultCss += manager.cssRender(null, {}, {
            baseCss: baseName,
            removeThemeClass: true,
            useDefaultVaribles: true
          })
        }

        for (let i in themes) {
          if (!this.sassExcludeTheme[i] && i !== this.sassDefaultTheme) {
            let css = manager.cssRender(i, themes[i], {
              baseCss: baseName
            })
            resultCss += css
            resultSass += css
          }
        }
        manager.addTheme(resultCss, baseName)
        return resultSass
      },
      getResultSass: function () {
        let css = ''
        let isSetOnly = this.sassOnly.style1 || this.sassOnly.style2
        if (this.sassOnly.style1 || !isSetOnly) {
          css += '// style1.sass\n'
          css += this.renderResultSassByName('style1')
        } else {
          manager.removeTheme('style1')
        }
        if (this.sassOnly.style2 || !isSetOnly) {
          css += '// style2.sass\n'
          css += this.renderResultSassByName('style2')
        } else {
          manager.removeTheme('style2')
        }
        this.resultSass = css
      }
    },
    computed: {
      webpackConfig: function () {
        let js = 'module: {rules: [{test: /\.scss$/,use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}, {loader: "sass-themes-loader", options: {themePath: "the path of theme folder",{{option}}}}]}]}'
        let option = ''
        if (this.sassDefaultTheme !== '') {
          option += 'defaultTheme: "' + this.sassDefaultTheme + '",'
        }
        if (this.sassExcludeTheme.red || this.sassExcludeTheme.blue || this.sassExcludeTheme.green) {
          option += 'excludeTheme: ' + this.getOptionString(this.sassExcludeTheme)
        }
        if (this.sassOnly.style1 || this.sassOnly.style2) {
          option += 'only: ' + this.getOptionString(this.sassOnly, 'path of ')
        }
        return js.replace('{{option}}', option)
      }
    },
    mounted () {
      this.getResultSass()
    },
    components: {
      CodeBlock
    }
  }
</script>
