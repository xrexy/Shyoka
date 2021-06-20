<template>
  <fieldset class="rates">
    <span class="title is-5">{{ title }}</span>
    <br />

    <input type="radio" id="rating10" name="rating" />
    <label for="rating10" @click="$emit('rated', 10)"></label>

    <input type="radio" id="rating9" name="rating" />
    <label class="half" for="rating9" @click="$emit('rated', 9)"></label>

    <input type="radio" id="rating8" name="rating" />
    <label for="rating8" @click="$emit('rated', 8)"></label>

    <input type="radio" id="rating7" name="rating" />
    <label class="half" for="rating7" @click="$emit('rated', 7)"></label>

    <input type="radio" id="rating6" name="rating" />
    <label for="rating6" @click="$emit('rated', 6)"></label>

    <input type="radio" id="rating5" name="rating" />
    <label class="half" for="rating5" @click="$emit('rated', 5)"></label>

    <input type="radio" id="rating4" name="rating" />
    <label for="rating4" @click="$emit('rated', 4)"></label>

    <input type="radio" id="rating3" name="rating" />
    <label class="half" for="rating3" @click="$emit('rated', 3)"></label>

    <input type="radio" id="rating2" name="rating" />
    <label for="rating2" @click="$emit('rated', 2)"></label>

    <input type="radio" id="rating1" name="rating" />
    <label class="half" for="rating1" @click="$emit('rated', 1)"></label>

    <input type="radio" id="rating0" name="rating" />
    <label for="rating0" @click="$emit('rated', 0)"></label>
  </fieldset>
</template>

<script scoped>
export default {
  props: ['title', 'id'],
};
</script>

<style scoped>
/* source: https://codepen.io/mrk1989/pen/mLeHJ */
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
.rates {
  text-align: center;
}

.rates > input {
  display: none;
}

.rates > label {
  float: right;
}

.rates > label:before {
  display: inline-block;
  font-size: 1.4rem; /* STARS SIZE */
  padding: 0.3rem 0.2rem;
  margin: 0;
  cursor: pointer;
  font-family: FontAwesome;
  content: '\f005 ';
}

.rates > label:last-child:before {
  content: '\f006 ';
}

.rates .half:before {
  content: '\f089 ';
  position: absolute;
  padding-right: 0;
}

input:checked ~ label,
label:hover,
label:hover ~ label {
  color: #a166db; /* STARS COLOR SELECTED */
}

input:checked + label:hover,
input:checked ~ label:hover,
input:checked ~ label:hover ~ label,
label:hover ~ input:checked ~ label {
  color: #bf93eb; /* STARS COLOR SELECTED (BRIGTHER) */
}
</style>
