<template>
  <div>
    Login
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" placeholder="Login" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
    <span>
      Don't have an account? Click here to <router-link to="/register">Register</router-link>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase/app';

require('firebase/auth');

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async pressed() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: 'Secret' });
        })
        .catch((e) => {
          this.error = e;
        });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 18px;
}

input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}

button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>
