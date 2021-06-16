<template>
  <div>
    <header class="level">
      <a href="/" class="level-item"><img src="../assets/logo.png" alt="SHYOKA" class="logo"/></a>
      <nav class="level-item">
        <ul class="nav__links">
          <li><a href="/">Home</a></li>
          <li><a href="/schools">Schools</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/social">Social</a></li>
        </ul>
      </nav>
      <div class="level-item" v-if="!isLoggedIn">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
          <template #trigger>
            <a class="level-item" role="button">
              <button>Login</button>
            </a>
          </template>

          <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
            <form @submit.prevent="login">
              <div class="modal-card" style="width:300px;">
                <section class="modal-card-body">
                  <b-field v-if="error">
                    <span style="font-size: 14px; color: red;">{{ error }}</span>
                  </b-field>
                  <b-field label="Email">
                    <b-input type="email" placeholder="Your email" v-model="email" required>
                    </b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      v-model="password"
                      required
                    >
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot columns is-centered">
                  <b-button @click.prevent="login" label="Login" type="is-primary" class="column" />
                  <!-- <span style="font-size: 16px;">or</span> -->
                  <!-- <a href="/register">
                  <button type="button" class="is-danger">Register</button></a> -->
                </footer>
              </div>
            </form>
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
          <template #trigger>
            <a class="level-item" role="button">
              <button>Register</button>
            </a>
          </template>

          <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
            <form @submit.prevent="register">
              <div class="modal-card" style="width:350px;">
                <section class="modal-card-body">
                  <b-field v-if="error">
                    <span style="font-size: 14px; color: red;">{{ error }}</span>
                  </b-field>

                  <b-field label="Username">
                    <b-input type="text" placeholder="Your username" v-model="username" required>
                    </b-input>
                  </b-field>

                  <b-field label="Email">
                    <b-input type="email" placeholder="Your email" v-model="email" required>
                    </b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      v-model="password"
                      required
                    >
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot columns is-centered">
                  <b-button
                    @click.prevent="register"
                    label="Register"
                    type="is-primary"
                    class="column"
                  />
                  <!-- <span style="font-size: 16px;">or</span> -->
                  <!-- <a href="/register">
                  <button type="button" class="is-danger">Register</button></a> -->
                </footer>
              </div>
            </form>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="level-item trigger" v-if="isLoggedIn">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
          <template #trigger>
            <a class="level-item" role="button">
              <span>{{ user.displayName }}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>
          </template>

          <b-dropdown-item style="outline: 0;" custom>
            Logged from <b>{{ user.email }}</b>
          </b-dropdown-item>

          <hr class="dropdown-divider" />

          <b-dropdown-item class="user-dropdown-item" has-link custom>
            <a href="/profile">
              <b-icon icon="account"></b-icon>
              Profile
            </a>
          </b-dropdown-item>
          <b-dropdown-item class="user-dropdown-item" has-link custom>
            <a href="/settings">
              <b-icon icon="cog"></b-icon>
              Settings
            </a>
          </b-dropdown-item>

          <hr class="dropdown-divider" />

          <b-dropdown-item class="user-dropdown-item" custom>
            <div @click.prevent="logout">
              <b-icon icon="logout"></b-icon>
              Logout
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    async login() {
      await this.$store.dispatch('auth/login', {
        email: this.email.trim(),
        password: this.password,
      });
      this.email = '';
      this.password = '';
      this.username = '';
    },
    register() {
      this.$store.dispatch('auth/register', {
        email: this.email.trim(),
        password: this.password,
        username: this.username,
      });
    },
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
  computed: mapState('auth', ['error', 'isLoggedIn', 'user']),
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>
.user-dropdown-item {
  outline: 0;
}

.user-dropdown-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

li,
a,
button {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

header {
  align-items: center;
  background-color: #1a1b1f;
  padding: 15px;
}

.logo {
  cursor: pointer;
}

.nav__links {
  list-style: none;
}

.nav__links li {
  display: inline-block;
  padding: 0px 15px;
  border-right: 2px solid white;
}

.nav__links li:last-child {
  padding-right: 0px;
  border: none;
}

.nav__links li a {
  transition: all 0.2s ease 0s;
}

.nav__links li a:hover {
  color: rgb(103, 63, 143);
}

button:first-child {
  margin-left: 10px;
}

button {
  padding: 9px 25px;
  background-color: rgba(103, 63, 143, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  outline: none;
}

button:hover {
  background-color: rgba(103, 63, 143, 0.8);
}
</style>
