import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import * as Rx from 'rxjs'
import VueRx from 'vue-rx'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueRx, Rx);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
