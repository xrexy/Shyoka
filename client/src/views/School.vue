<template>
  <div class="container">
    <StarRating @rated="printRating($event)" />
  </div>
</template>

<script>
import db from '@/db';
import router from '@/router';

import StarRating from '@/components/StarRating.vue';

export default {
  components: { StarRating },
  data() {
    return {
      school: {},
    };
  },
  methods: {
    printRating(event) {
      console.log(event);
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

<style></style>
