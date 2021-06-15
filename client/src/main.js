import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/store/authListener';

Vue.prototype.$axios = axios;

Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
