<template>
  <section class="profile-section">
    <div class="container pt-6">
      <div class="level">
        <div class="level-item userModule">
          <h2>{{ user.displayName }}</h2>
          <span>{{ additionalUserProperties.position }}</span>
        </div>
        <div class="level-item picModule">
          <img
            :src="user.photoURL || require('../assets/default-user.jpg')"
            alt="Profile picture"
          />
        </div>
        <div class="level-item propsModule">
          <h3>
            <span style="font-weight: bold">Registered: <br /></span
            >{{ this.user ? this.user.metadata.creationTime : 'unknown' }}
          </h3>
          <br />
          <span style="font-weight: bold">Last login: <br /></span
          >{{ this.user ? this.user.metadata.lastSignInTime : 'unknown' }}
          <br />
          <br />
          <h3>
            <span style="font-weight: bold">Comments:</span>
            {{ additionalUserProperties.comments ? additionalUserProperties.comments.length : 0 }}
          </h3>
        </div>
      </div>
      <hr />
      <div class="comments">
        <h2 class="title is-3">
          Comments
        </h2>

        <div class="pt-4">
          <div
            class="comments-container pt-2"
            v-for="comment in additionalUserProperties.comments"
            :key="comment.comment"
          >
            <ProfileComment :comment="comment" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import ProfileComment from '@/components/ProfileComment.vue';

export default {
  components: { ProfileComment },
  created() {
    console.log(this.user);
  },
  computed: mapState('auth', ['error', 'isLoggedIn', 'user', 'additionalUserProperties']),
};
</script>

<style scoped>
.level > * {
  padding-bottom: 3em;
}

.userModule h2 {
  font-size: 300%;
  font-weight: bold;
}

/* .propsModule h3 {
  text-align: center;
  font-weight: bold;
} */

.userModule span {
  background-color: #8940d4;
  border-radius: 45%;
  padding: 6px 6px;
  text-transform: uppercase;
  color: white;

  margin-left: 10px;

  font-size: 78%;
  font-weight: bold;
}

.picModule img {
  width: 256px;
  height: 256px;

  border-radius: 100%;
}

.propsModule {
  display: block;
  text-align: left;
}

@media (max-width: 768px) {
  .propsModule {
    text-align: center;
  }
}

.propsModule h2 {
  font-family: 120%;
  font-weight: bold;
}

hr {
  background: black;
  height: 3px;
}
</style>
