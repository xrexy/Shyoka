<template>
  <div>
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="register">
      Register
      <div class="email">
        <input type="email" placeholder="Email" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  methods: {
    register() {
      this.$store.dispatch('auth/register', { email: this.email.trim(), password: this.password });
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
