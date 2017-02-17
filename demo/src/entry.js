import Vue from 'vue'
import App from './App.vue'

var VueMaterial = require('vue-material')

Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'orange',
    accent: 'white'
  },
  white: {
    primary: 'white',
    accent: 'orange'
  },
  grey: {
    primary: 'orange',
    accent: 'black'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: {App}
})
