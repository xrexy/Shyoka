import firebase from '@/db/firebase';

require('firebase/auth');

const mutations = {
  setUser(state, setUser) {
    if (setUser.user) {
      state.user = setUser;
      state.isLoggedIn = true;
    } else {
      state.user = {};
      state.isLoggedIn = false;
    }
  },
  setError(state, error) {
    if (error) {
      state.error = error;
    }
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
      .then((user) => {
        commit('setUser', user);
      })
      .catch((error) => {
        commit('setError', error);
      });
    this.$router.replace('/');
  },
  register: async ({ commit }, payload) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        commit('setUser', user);
      })
      .catch((error) => {
        commit('setError', error);
      });
    this.$router.replace('/');
  },
  logout: async ({ commit }) => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setUser', null);
      })
      .catch((error) => {
        commit('setError', error);
      });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
