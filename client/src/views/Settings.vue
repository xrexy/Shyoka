<template>
  <div class="container pt-6">
    <div v-if="!isLoggedIn || !user">
      <h1>Not logged in.</h1>
    </div>
    <div v-else>
      <h2 class="title is-3">Settings <small class="title is-6">nothing much at all..</small></h2>
      <hr />
      <div class="settings-container pl-6">
        <ul>
          <li>
            <h2 class="title is-4" @click="isCardModalActive = true">Change profile picture</h2>
          </li>
        </ul>
      </div>
    </div>

    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="level">
            <p class="level-left title is-4 mt-2 pt-2">
              Change your avatar
            </p>
            <b-button class="level-right" type="is-link" @click="changePic">Submit</b-button>
          </div>
          <b-field>
            <b-input v-model="pic" placeholder="Enter picture URL" rounded></b-input>
          </b-field>
          <small>
            &emsp;<span style="color: red" v-if="error">{{ error }}</span>
          </small>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isCardModalActive: false,
      pic: '',
    };
  },
  methods: {
    async changePic() {
      if (!this.pic) {
        this.$store.commit('auth/setError', 'Please enter an image URL');
        await new Promise((r) => setTimeout(r, 1500));
        this.$store.commit('auth/setError', undefined);
        return;
      }

      if (
        this.pic.startsWith('http://i.imgur.com/')
        || this.pic.startsWith('https://i.imgur.com/')
      ) {
        this.$store.dispatch('auth/changePicture', { pictureURL: this.pic });
      } else {
        this.$store.commit('auth/setError', 'Only i.imgur pictures are allowed.');
        await new Promise((r) => setTimeout(r, 1500));
        this.$store.commit('auth/setError', undefined);
      }
    },
  },
  computed: mapState('auth', ['error', 'isLoggedIn', 'user']),
};
</script>
<style scoped>
ul {
    list-style-type: circle;
}
hr {
  background-color: black;
}
</style>
