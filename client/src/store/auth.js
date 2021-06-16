/* eslint-disable no-param-reassign */

import firebase from '@/db/firebase';

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

const actions = {
  login: async ({ commit }, payload) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit('setError', error);
      });

    await new Promise((r) => setTimeout(r, 2000));
    commit('setError', undefined);
    console.log(state.error);
  },
  register: async ({ commit }, payload) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res) => res.user.updateProfile({
        displayName: payload.username,
      }))
      .catch((error) => {
        commit('setError', error);
      });

    await new Promise((r) => setTimeout(r, 2000));
    commit('setError', undefined);
    console.log(state.error);
  },
  logout: async ({ commit }) => {
    await firebase
      .auth()
      .signOut()
      .catch((error) => {
        commit('setError', error);
      });

    await new Promise((r) => setTimeout(r, 2000));
    commit('setError', undefined);
    console.log(state.error);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
