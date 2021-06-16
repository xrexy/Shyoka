<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2 register">
        <div class="columns">
          <div class="column right has-text-centered">
            <h1 class="title is-4">Sign in</h1>
            <p class="description">
              Don't have an account? <a href="/register">Create one now!</a>
            </p>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="email" placeholder="Email" v-model="email" />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
              </div>
              <button
                @click.prevent="login"
                class="button is-block is-primary is-fullwidth is-medium"
              >
                Login
              </button>
              <br />
            </form>
            <small v-if="error" style="color: red;">{{ error }}</small>
          </div>
        </div>
      </div>
      <div class="column is-8 is-offset-2">
        <br />
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a href="#"><b-icon icon="twitter"></b-icon></a>
              &emsp;
              <a href="#"><b-icon icon="facebook"></b-icon></a>
              &emsp;
              <a href="#"><b-icon icon="instagram"></b-icon></a>
              &emsp;
              <a href="#"><b-icon icon="github"></b-icon></a>
            </div>
          </div>
          <div class="level-right">
            <small class="level-item" style="color: var(--textLight)">
              &copy; Shyoka. All Rights Reserved.
            </small>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('auth', ['error', 'isLoggedIn', 'user']),
  methods: {
    async login() {
      await this.$store.dispatch('auth/login', {
        email: this.email.trim(),
        password: this.password,
      });

      if (this.user.email) {
        this.email = '';
        this.password = '';

        this.$router.replace('/');
      } else {
        this.password = '';
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>
:root {
  --brandColor: hsl(166, 67%, 51%);
  --background: rgb(247, 247, 247);
  --textDark: hsla(0, 0%, 0%, 0.66);
  --textLight: hsla(0, 0%, 0%, 0.33);
}

body {
  background: var(--background);
  height: 100vh;
  color: var(--textDark);
}

.field:not(:last-child) {
  margin-bottom: 1rem;
}

.register {
  margin-top: 10rem;
  background: white;
  border-radius: 10px;
}

.left,
.right {
  padding: 4.5rem;
}

.left {
  border-right: 5px solid var(--background);
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left .colored {
  color: var(--brandColor);
  font-weight: 500;
  margin-top: 1rem !important;
  letter-spacing: -1px;
}

.left p {
  color: var(--textLight);
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  color: var(--textLight);
  font-size: 1.15rem;
}

.right small {
  color: var(--textLight);
}

input {
  font-size: 1rem;
}

input:focus {
  border-color: var(--brandColor) !important;
  box-shadow: 0 0 0 1px var(--brandColor) !important;
}

.fab,
.fas {
  color: var(--textLight);
  margin-right: 1rem;
}
</style>
