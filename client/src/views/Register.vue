<template>
  <div>
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
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
import firebase from 'firebase/app';

require('firebase/auth');

export default {
  methods: {
    async pressed() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email.trim(), this.password)
        .then(() => {
          this.$router.replace({ name: 'Home' });
        })
        .catch((e) => {
          this.error = e;
          console.log(e);
        });
    },
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
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
