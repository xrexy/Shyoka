import axios from 'axios';
import firebase from 'firebase/app';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$axios = axios;

const firebaseConfig = {
  apiKey: 'AIzaSyBGeQy6jYgKvxDPMkfWAJ9siTR-PITPPHA',
  authDomain: 'shyoka-f9911.firebaseapp.com',
  projectId: 'shyoka-f9911',
  storageBucket: 'shyoka-f9911.appspot.com',
  messagingSenderId: '641184575777',
  appId: '1:641184575777:web:581bb3d4996a8479ad0e60',
  measurementId: 'G-F46M90FCLR',
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
