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
            <span class="mb-3"><b-icon icon="star"></b-icon>4.1</span>
          </div>
        </div>
        {{ school.school_description }}
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['school'],
};
</script>

<style>
@media (max-width: 768px) {
  .level .level-right {
    margin: 0;
    margin-bottom: 1em;
  }
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
