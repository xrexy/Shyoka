<template>
  <div>
    <fieldset class="rate">
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
  </div>
</template>

<style scoped>
/* source: https://codepen.io/mrk1989/pen/mLeHJ */
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

.rate {
  display: inline-block;
  border: 0;
}

.rate > input {
  display: none;
}

.rate > label {
  float: right;
}

.rate > label:before {
  display: inline-block;
  font-size: 1.5rem; /* STARS SIZE */
  padding: 0.3rem 0.2rem;
  margin: 0;
  cursor: pointer;
  font-family: FontAwesome;
  content: '\f005 ';
}

.rate > label:last-child:before {
  content: '\f006 ';
}

.rate .half:before {
  content: '\f089 ';
  position: absolute;
  padding-right: 0;
}

input:checked ~ label,
label:hover,
label:hover ~ label {
  color: #73b100; /* STARS COLOR SELECTED */
}

input:checked + label:hover,
input:checked ~ label:hover,
input:checked ~ label:hover ~ label,
label:hover ~ input:checked ~ label {
  color: #a6e72d; /* STARS COLOR SELECTED (BRIGTHER) */
}
</style>
