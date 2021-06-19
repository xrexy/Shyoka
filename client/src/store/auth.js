/* eslint-disable no-param-reassign */

import firebase from '@/db/firebase';
import db from '@/db';
import router from '@/router';

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
  setAdditionalProperties(state, properties) {
    state.additionalUserProperties = properties;
  },
};

const state = {
  user: {},
  additionalUserProperties: {},
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
    if (state.user.email) {
      commit('setError', "You're already signed in");
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => router.push('/'))
        .catch((error) => {
          commit('setError', error);
        });
    }

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  register: async ({ commit }, payload) => {
    if (state.user.email) {
      commit('setError', "You're already signed in");
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: payload.username,
            })
            .then(() => {
              window.location.reload(); // i hate this "solution", whatever...
            });

          const user = {
            position: payload.position,
            username: payload.username,
            uid: res.user.uid,
            email: res.user.email,
          };
          writeUserData(user);
        })
        .catch((error) => commit('setError', error));
    }

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  logout: async ({ commit }) => {
    await firebase
      .auth()
      .signOut()
      .then(() => router.push('/'))
      .catch((error) => commit('setError', error));

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  changePicture: async ({ commit }, payload) => {
    if (!state.user.email) {
      commit('setError', 'Invalid user');
    } else {
      await state.user
        .updateProfile({ photoURL: payload.pictureURL })
        .then(() => window.location.reload())
        .catch((error) => commit('setError', error));
    }

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
