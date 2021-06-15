<template>
  <div>
    <span v-if="isLoggedIn">Logged in</span>
    <span v-else>Not logged in Sadge</span>
    <div>
      <button @click="logout">Sign out</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['logout']),
};
</script>
