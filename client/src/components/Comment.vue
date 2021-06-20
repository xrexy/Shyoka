<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64 is-1by1">
        <img
          :src="
            comment.postedBy.photoURL == -1
              ? require('../assets/default-user.jpg')
              : comment.postedBy.photoURL
          "
        />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.postedBy.username }}</strong>
          <br />
          {{ comment.comment }}
          <br />
          <small @click.prevent="$emit('showReplyModal', { id: comment.comment })"
            ><a href="#">» Reply</a></small
          >
        </p>
      </div>

      <CommentReply />
    </div>
  </article>
</template>

<script>
import CommentReply from './CommentReply.vue';

export default {
  props: ['comment'],
  components: { CommentReply },
};
</script>
