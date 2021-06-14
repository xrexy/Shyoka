<template>
  <div>
    <span v-if="loggedIn">Logged in</span>
    <span v-else>Not logged in Sadge</span>
    <div>
      <button @click="signOut">Sign out</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

require('firebase/auth');

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.isLoggedIn = true;
    });
  },
  methods: {
    async signOut() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: 'Login' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>
