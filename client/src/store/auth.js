/* eslint-disable no-param-reassign */

import firebase from '@/db/firebase';
import db from '@/db';

require('firebase/auth');

const mutations = {
  setUser(state, setUser) {
    if (setUser) {
      state.user = setUser;
      state.isLoggedIn = true;
    } else {
      state.user = {};
      state.isLoggedIn = false;
    }
  },
  setError(state, error) {
    state.error = error;
  },
};

const state = {
  user: {},
  isLoggedIn: false,
  error: '',
};

function writeUserData(user) {
  db.collection('users')
    .doc(user.uid)
    .set(user)
    .catch((err) => console.log(err));
}

const actions = {
  login: async ({ commit }, payload) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit('setError', error);
      });

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  register: async ({ commit }, payload) => {
    if (state.user.email) {
      commit('setError', "You're already signed in");
      return;
    }

    const auth = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res) => res.user.updateProfile({
        displayName: payload.username,
      }))
      .catch((error) => {
        commit('setError', error);
      });

    console.log(state.error);
    if (!state.error) {
      const user = {
        position: payload.position,
        username: payload.username,
        uid: auth.user.uid,
        email: auth.user.email,
      };
      writeUserData(user);

      window.location.reload(true);
      this.$router.replace('/');
    }

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  logout: async ({ commit }) => {
    await firebase
      .auth()
      .signOut()
      .catch((error) => {
        commit('setError', error);
      });

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
