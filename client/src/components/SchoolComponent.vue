<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128 is-1by1">
        <img
          id="school_image"
          :src="
            school.school_image == -1
              ? require('../assets/default-school.jpg')
              : school.school_image
          "
        />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <div class="level">
          <div class="level-left pb-3">
            <span id="school_title">{{ school.school_name }}</span
            >|<span id="school_city">{{ school.school_city }}</span>
          </div>
          <div class="level-right">
            <span class="mb-3" v-if="!showBtns"><b-icon icon="star"></b-icon>4.1</span>
            <div class="level" v-if="showBtns">
              <span class="level-item mb-3"><b-icon icon="star"></b-icon>4.1</span>
              <b-button class="level-item" type="is-success">Join</b-button>
            </div>
          </div>
        </div>
        <div v-if="!showBtns">{{ school.school_description }}</div>
        <div class="level school_bottom" v-if="showBtns">
          <div class="level-left">
            <span
              >{{ school.school_description }}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span
            >
          </div>
          <div class="level-right">
            <StarRating
              @rated="rate"
              v-if="isLoggedIn && additionalUserProperties.position != 'warden'"
            />
          </div>
        </div>
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
  </article>
</template>

<script>
import StarRating from '@/components/StarRating.vue';
import { mapState } from 'vuex';

export default {
  components: { StarRating },
  computed: mapState('auth', ['additionalUserProperties', 'isLoggedIn', 'user']),
  props: ['school', 'showBtns'],
  data() {
    return {
      isCardModalActive: false,
    };
  },
  methods: {
    rate(rating) {
      if (!this.additionalUserProperties || !this.user) return;

      if (this.school.createdBy === this.user.uid) {
        this.$buefy.snackbar.open({
          message: "You can't vote for your own school.",
          type: 'is-link',
        });
        return;
      }

      if (this.additionalUserProperties.position === 'warden') {
        this.$buefy.snackbar.open({
          message: "Wardens can't vote for schools.",
          type: 'is-link',
        });
        return;
      }

      this.$store.dispatch('school/registerVote', {
        school: this.school,
        user: this.user,
        rating,
      });
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .level .level-right {
    margin: 0;
    margin-bottom: 1em;
  }

  .level-right .level .button {
    display: none;
  }
}

.media {
  overflow: hidden;
}

.school_bottom .level-left {
  width: 75%;
  padding: 0;
  margin: 0;
}

.media {
  padding: 0.4em;
}

.media .media-left {
  margin: 0;
  margin-right: 1em;
}

.content .level {
  margin-bottom: 0;
}

#school_title {
  font-size: 155%;
  padding-right: 0.3em;
  font-weight: bold;
}

#school_city {
  font-size: 95%;
  padding-left: 0.3em;
  font-weight: 0;
}

#school_image {
  border-radius: 5%;
}
</style>
