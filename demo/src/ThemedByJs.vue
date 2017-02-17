<template>
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
            <code-block language="sass" class="code-block">$color: #333;$link-color: #2196f3;</code-block>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">style1.scss</span>
            <code-block language="sass" class="code-block">@import './variables';p {color: $color;}a {color: $link-color !important;}</code-block>
          </div>
          <div class="file-list-item two-level">
            <md-icon></md-icon>
            <md-icon>insert_drive_file</md-icon>
            <span class="file-name">style2.scss</span>
            <code-block language="sass" class="code-block">@import './variables';b {color: $color;background-color: white;}</code-block>
          </div>
        </md-card>
        <h2 class="md-title">useage</h2>
        <code-block language="javascript" class="code-block" :format="false">// set dynamic flag to import sass to json
import baseSass1 from 'sass-themes-loader?dynamic!./style1.scss';
import baseSass2 from 'sass-themes-loader?dynamic!./style2.scss';

// import theme manager
import dynamicThemeManager from 'sass-themes/dist/dynamicThemeManager';

// save base css
dynamicThemeManager.setBaseCss(baseSass1) // eq setBaseCss(baseSass1, 'default')
dynamicThemeManager.setBaseCss(baseSass2, 'style2')

// now, you can set varibles that used in sass and insert the result to html
dynamicThemeManager.registerTheme('theme name', {
  color: 'red'
})

dynamicThemeManager.registerTheme('theme name', {
  color: 'blue'
}, {
  baseCss: 'style2'
})
        </code-block>
      </md-layout>
      <md-layout md-flex="33" md-column>
        <md-theme md-name="white">
          <h2 class="md-title">give it a try</h2>
          <md-card>
            <div class="option-item">
              <span class="md-subheading">baseCss:</span>
              <div>
                <md-radio v-model="baseCss" md-value="default">default</md-radio>
                <md-radio v-model="baseCss" md-value="style2">style2</md-radio>
              </div>
            </div>
            <div class="option-item">
              <span class="md-subheading">pick a color for $color:</span>
              <div>
                <chrome @change-color="onChange" v-model="color" ></chrome>
              </div>
            </div>
            <div class="option-item">
              <md-switch v-model="removeThemeClass">removeThemeClass</md-switch>
              <md-switch v-model="removeNoVaribleStyle">removeNoVaribleStyle</md-switch>
              <md-switch v-model="useDefaultVaribles">useDefaultVaribles</md-switch>
            </div>
            <div>
              <md-button class="md-raised" @click.native="register">register</md-button>
              <md-button class="md-raised md-accent" @click.native="remove">remove</md-button>
            </div>
            <code-block language="javascript" class="code-block console" :format="false" >{{console}}</code-block>
          </md-card>
        </md-theme>
        <h2 class="md-title">register css</h2>
        <code-block language="css" class="code-block">{{css}}</code-block>
      </md-layout>
      <md-layout md-flex="33" md-column>
        <h2 class="md-title">preview</h2>
        <md-theme md-name="grey">
          <md-card>
            <div class="preview-block">
              <div class="md-caption">without class</div>
              <a href="#" class="md-link">this is a a tag</a>
              <p>this is a p tag</p>
              <b>this is a b tag</b>
            </div>
            <div class="preview-block default">
              <div class="md-caption">class default</div>
              <a href="#">this is a a tag</a>
              <p>this is a p tag</p>
              <b>this is a b tag</b>
            </div>
            <div class="preview-block style2">
              <div class="md-caption">class style2</div>
              <a href="#">this is a a tag</a>
              <p>this is a p tag</p>
              <b>this is a b tag</b>
            </div>
          </md-card>
        </md-theme>
      </md-layout>
    </md-layout>
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
  .vue-color__compact__color-item{
    margin-top:0 !important;
  }
  .vue-color__compact{
    box-sizing: content-box !important;
    margin-top:16px;
  }
  .md-switch{
    display:flex;
  }
  .console{
    margin:16px 0;
  }
</style>
<script>
  import CodeBlock from './CodeBlock.vue'
  import { Chrome } from 'vue-color'
  import manager from '../../src/dynamicThemeManager'

  manager.setBaseCss({
    css: 'p {color: $color;}a {color: $link-color !important;}',
    variables: {
      color: '#333',
      'link-color': '#2196f3'
    }
  })

  manager.setBaseCss({
    css: 'b {color: $color; background-color: white;}',
    variables: {
      color: '#333'
    }
  }, 'style2')

  export default{
    data () {
      return {
        baseCss: 'default',
        removeThemeClass: false,
        removeNoVaribleStyle: true,
        useDefaultVaribles: false,
        console: '',
        css: '',
        color: {
          hex: '#4EED80',
          a: 1
        }
      }
    },
    methods: {
      register: function () {
        manager.registerTheme(this.baseCss, {
          color: this.color.hex
        }, {
          baseCss: this.baseCss,
          removeThemeClass: this.removeThemeClass,
          removeNoVaribleStyle: this.removeNoVaribleStyle,
          useDefaultVaribles: this.useDefaultVaribles
        })
        this.createConsole()
        this.createCss()
      },
      createConsole: function () {
        this.console = 'dynamicThemeManager.registerTheme("' + this.baseCss + '", {' + '\n' +
          '  color: "' + this.color.hex + '"' + '\n' +
          '}, {' + '\n' +
          '  baseCss: "' + this.baseCss + '",' + '// default \'default\'\n' +
          '  removeThemeClass: ' + (this.removeThemeClass ? 'true' : 'false') + ',' + '// default false\n' +
          '  removeNoVaribleStyle: ' + (this.removeNoVaribleStyle ? 'true' : 'false') + ',' + '// default true\n' +
          '  useDefaultVaribles: ' + (this.useDefaultVaribles ? 'true' : 'false') + '// default false\n' +
          '})' + '\n'
      },
      createCss: function () {
        this.css = manager.cssRender(this.baseCss, {
          color: this.color.hex
        }, {
          baseCss: this.baseCss,
          removeThemeClass: this.removeThemeClass,
          removeNoVaribleStyle: this.removeNoVaribleStyle,
          useDefaultVaribles: this.useDefaultVaribles
        })
      },
      remove: function () {
        manager.removeTheme(this.baseCss)
        this.console = 'dynamicThemeManager.removeTheme("' + this.baseCss + '")'
        this.css = ''
      },
      onChange: function (val) {
        this.color = val
      }
    },
    components: {
      CodeBlock,
      Chrome
    }
  }
</script>
