<template>
  <div style="background-color: #000; width: 100%; height: 94.3vh;">
    <div class="container pt-6">
      <div class="columns is-centered">
        <h2>REGISTER</h2>
      </div>
      <div class="columns is-centered">
        <b-field class="column is-three-fifths">
          <b-input
            placeholder="Username"
            icon="account"
            v-model="username"
            maxlength="30"
          ></b-input>
        </b-field>
      </div>

      <div class="columns is-centered">
        <b-field class="column is-three-fifths">
          <b-input
            placeholder="Email"
            icon="email"
            v-model="email"
            type="email"
            maxlength="50"
          ></b-input>
        </b-field>
      </div>

      <div class="columns is-centered">
        <b-field class="column is-three-fifths">
          <b-input
            placeholder="Password"
            icon="lock"
            v-model="password"
            type="password"
            maxlength="50"
            password-reveal
          >
          </b-input>
        </b-field>
      </div>

      <div class="columns is-centered">
        <div class="column"><button class="button is-primary">Register</button></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  text-align: center;
}

h2 {
  font-size: 30px;
  font-family: 'Roboto';
  font-weight: bold;
  padding-bottom: 1vw;
  letter-spacing: 6px;
  color: white;
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    register() {
      this.$store.dispatch('auth/register', {
        email: this.email.trim(),
        password: this.password,
        username: this.username,
      });
    },
  },
  computed: mapState('auth', ['error']),
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
};
</script>
