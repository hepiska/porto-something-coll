// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueFire)
Vue.use(Firebase)
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoW7lloXgJBYjoWGUFVqO5KqXI9SVJXYk'
    // libraries: 'places', //// If you need to use place input
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
