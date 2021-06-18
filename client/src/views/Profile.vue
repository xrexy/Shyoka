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
          <h2>Posts:</h2>
          <h2>Smth:</h2>
          <h2>Something else:</h2>
        </div>
      </div>
      <hr>
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
          <small
            >&emsp;<span style="color: red" v-if="error">{{ error }}</span></small
          >
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      pic: '',
      isCardModalActive: false,
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
  computed: mapState('auth', ['error', 'isLoggedIn', 'user', 'additionalUserProperties']),
};
</script>

<style scoped>
body {
  background: rgb(247, 247, 247);
  height: 100vh;
  font-family: Ubuntu;
}

.level > * {
  padding-bottom: 3em;
}

.userModule h2 {
  font-size: 300%;
  font-weight: bold;
}

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
</style>
