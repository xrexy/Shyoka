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
          <div class="field">
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

      <div class="comments-container" v-for="comment in school.comments" :key="comment.comment">
        <Comment :comment="comment" @showReplyModal="showReplyModal($event)" />
      </div>
    </div>

    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <form class="card">
        <div class="card-content">
          <div>
            <b-field>
              <b-input
                placeholder="Name"
                v-model="commentReply"
                maxlength="100"
                minlength="1"
              ></b-input>
            </b-field>
            <small>
              &emsp;<span style="color: red" v-if="error">{{ error }}</span>
            </small>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '@/db';
import router from '@/router';
import { mapState } from 'vuex';

import SchoolComponent from '@/components/SchoolComponent.vue';
import Comment from '@/components/Comment.vue';

export default {
  components: { SchoolComponent, Comment },
  computed: Object.assign(
    mapState('auth', ['additionalUserProperties', 'isLoggedIn', 'user']),
    mapState('schools', ['error', 'isSuccessfull']),
  ),
  data() {
    return {
      school: {},
      comments: [],
      comment: '',
      isCardModalActive: false,
      commentReply: '',
      commentReplyID: '',
    };
  },
  methods: {
    printRating(event) {
      console.log(event);
    },
    showReplyModal(event) {
      this.isCardModalActive = true;
      this.commentReplyID = event.id;
    },
    postReply() {
      console.log(this.commentReplyID);
      console.log(this.commentReply);
      // this.$store
      //   .dispatch('schools/addCommentReply', {
      //     comment: this.comment,
      //     postedBy: this.user,
      //     school: this.school,
      //   })
      //   .then(() => {
      //     if (this.isSuccessfull) this.comment = '';
      //     window.location.reload();
      //   });
    },
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

hr {
  background: #1a1b1f;
}
</style>
