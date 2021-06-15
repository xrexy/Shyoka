import firebase from '@/db/firebase';
import store from '@/store/index';
// import db from '@/db';
// import router from '@/router/';

firebase.auth().onAuthStateChanged((user) => {
  store.commit('auth/setUser', user || undefined);
});
