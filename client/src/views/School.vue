<template>
  <div class="container pt-6">
    <SchoolComponent :school="this.school" showBtns="true" />
    <hr />
    <div class="comments">
      <h1 class="title is-3">Comments</h1>
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64 is-1by1">
            <img :src="user.photoURL || require('../assets/default-user.jpg')" />
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea
                class="textarea"
                placeholder="Add a comment..."
                v-model="comment"
              ></textarea>
            </p>
          </div>
          <div class="field pb-6">
            <p class="control">
              <button class="button" @click.prevent="postComment">
                Post comment
              </button>
              <small>
                &emsp;<span style="color: red" v-if="error">{{ error }}</span>
              </small>
            </p>
          </div>
        </div>
      </article>

      <div
        class="comments-container pt-2"
        v-for="comment in school.comments"
        :key="comment.comment"
      >
        <Comment :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/db';
import router from '@/router';
import { mapState } from 'vuex';

import SchoolComponent from '@/components/SchoolComponent.vue';
import Comment from '@/components/Comment.vue';

export default {
  components: {
    SchoolComponent,
    Comment,
  },
  computed: Object.assign(
    mapState('auth', ['additionalUserProperties', 'isLoggedIn', 'user']),
    mapState('schools', ['error', 'isSuccessfull']),
  ),
  data() {
    return {
      school: {},
      comments: [],
      comment: '',
    };
  },
  methods: {
    postComment() {
      this.$store
        .dispatch('schools/addComment', {
          comment: this.comment,
          postedBy: this.user,
          school: this.school,
        })
        .then(() => {
          if (this.isSuccessfull) this.comment = '';
          window.location.reload();
          this.$store.commit('schools/setSuccess', false);
        });
    },
  },
  created() {
    let { schoolID } = this.$route.params;

    if (!schoolID) {
      console.log('No school ID from parameters, trying from query...');
      try {
        schoolID = parseInt(this.$route.query.schoolID, 10);
      } catch (err) {
        console.log("Couldn't parse school ID, redirecting..."); // VERY unlikely to throw an exception
        router.push('/schools');
        return;
      }
      if (!schoolID) {
        console.log('No id from query, redirecting...');
        router.push('/schools');
        return;
      }
      console.log('Successfully recoved ID from query');
    }

    db.collection('schools')
      .where('school_id', '==', schoolID)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log(`Couldn't locate school with id ${schoolID}, redirecting...`);
          this.$buefy.snackbar.open({
            message: `There is no school with ID: ${schoolID || 0}`,
            type: 'is-link',
          });
          router.push('/schools');
          return;
        }
        [this.school] = snapshot.docs;
        this.school = this.school.data();
      });
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .cwarning {
    display: none;
  }

  .comments {
    text-align: left;
  }
}

.ratings .level {
  text-align: center;
}
</style>
