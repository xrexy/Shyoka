<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64 is-1by1">
        <img
          :src="
            !comment.postedBy.photoURL
              ? require('../assets/default-user.jpg')
              : comment.postedBy.photoURL
          "
        />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.postedBy.username }}</strong
          ><small
            class="pl-2"
            v-if="school.createdBy == user.uid || comment.postedBy.uid == user.uid"
            @click.prevent="$emit('delete', comment)"
            ><a href="#" style="color: red">Delete</a></small
          >
          <br />
          {{ comment.comment }}
          <br />
        </p>
      </div>
      <div class="media"></div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['comment', 'school', 'user'],
};
</script>
