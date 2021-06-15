<template>
  <div>
    Login
    <form @submit.prevent="login">
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
import { mapState } from 'vuex';

export default {
  methods: {
    login() {
      this.$store.dispatch('auth/login', { email: this.email.trim(), password: this.password });
    },
  },
  computed: mapState('auth', ['error']),
  data() {
    return {
      email: '',
      password: '',
    };
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
