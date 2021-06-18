/* eslint-disable no-param-reassign */
import firebase from '@/db/firebase';
import store from '@/store/index';

firebase.auth().onAuthStateChanged((user) => store.commit('auth/setUser', user || undefined));
