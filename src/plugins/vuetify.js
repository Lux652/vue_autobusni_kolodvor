import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    "primary": "#009688",
    "secondary": "#424242",
    "accent": "#e91e63",
    "error": "#ff5722",
    "info": "#cddc39",
    "success": "#2196f3",
    "warning": "#ffc107"
  }
})

