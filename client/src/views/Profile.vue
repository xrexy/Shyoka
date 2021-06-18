<template>
  <section class="profile section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-fifths">
          <h1 class="title is-size-1">{{user.displayName}}</h1>
          <p class="subtitle">Last seen: {{user.metadata.lastSignInTime}}</p>
        </div>
        <div class="column is-2">
          <figure class="image image is-128x128">
            <img alt="Profile photo" class="is-rounded" src="../assets/default-user.jpg" />
          </figure>
        </div>
        <div class="column has-text-grey-light has-text-right-in-desktop">
          <p class="has-text-weight-light">
            city
          </p>
          <p class="has-text-weight-light">
            phone
          </p>
          <p class="has-text-weight-light">
            main
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('auth', ['error', 'isLoggedIn', 'user']),
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
