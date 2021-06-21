<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <strong><q>{{ comment.comment }}</q></strong>
          <br />
          » Posted on: {{ comment.postedOn }}
          <br />
        </p>
      </div>
      <div class="media"></div>
    </div>
  </article>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('auth', ['user']),
  props: ['comment'],
};
</script>

<style scoped>
q {
  quotes: '\201c''\201d';
}
q:before {
  content: open-quote;
}
q:after {
  content: close-quote;
}
</style>
