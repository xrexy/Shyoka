<template>
  <div>
    <header class="level">
      <a href="/" class="level-item"><img src="../assets/logo.png" alt="SHYOKA" class="logo"/></a>
      <nav class="level-item">
        <ul class="nav__links">
          <li><a href="/">Home</a></li>
          <li><a href="/schools">Schools</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="https://github.com/xrexy/Shyoka" target="_blank">Social</a></li>
        </ul>
      </nav>
      <div class="level-item" v-if="!isLoggedIn">
        <a class="level-item" href="/login"><button>Login</button></a>
        <a class="level-item" href="/register"><button>Register</button></a>
      </div>
      <div class="level-item trigger" v-if="isLoggedIn">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
          <template #trigger>
            <a class="level-item" role="button">
              <span><span v-if="!user.displayName">...</span>{{ user.displayName }}</span>
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
  color: #673f8f;
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
