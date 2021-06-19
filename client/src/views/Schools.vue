<template>
  <div class="container">
    <div class="level pt-6">
      <div class="level-left">
        <h1 class="title is-2">Schools</h1>
      </div>
      <div class="level-right">
        <b-button
          label="Add school"
          type="is-link"
          size="is-medium"
          v-if="additionalUserProperties && additionalUserProperties.position == 'warden'"
          @click.prevent="addSchoolBtn"
        />
      </div>
    </div>
    <hr />
    <div class="content">
      <SchoolComponent v-for="school in schools" :key="school.school_id" :school="school" />
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <form class="card">
        <div class="card-content">
          <div class="level">
            <div class="level-left title mt-5 is-4">
              Add a school
            </div>
            <div class="level-right">
              <b-button type="is-link" @click.prevent="addSchool" native_type="submit"
                >Submit</b-button
              >
            </div>
          </div>
          <div>
            <b-field>
              <b-input
                placeholder="Name"
                v-model="school_name"
                maxlength="50"
                minlength="2"
              ></b-input>
            </b-field>
            <b-field>
              <b-input
                placeholder="City"
                v-model="school_city"
                maxlength="50"
                minlength="2"
              ></b-input>
            </b-field>
            <b-field>
              <b-input
                placeholder="Logo URL (i.imgur only) [optional]"
                v-model="school_image"
                maxlength="100"
              ></b-input>
            </b-field>
            <b-field>
              <b-input
                type="textarea"
                minlength="10"
                maxlength="300"
                placeholder="School description"
                v-model="school_description"
              >
              </b-input>
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
import { mapState } from 'vuex';
import router from '@/router';
import SchoolComponent from '@/components/SchoolComponent.vue';
import db from '@/db';

export default {
  computed: Object.assign(
    mapState('auth', ['additionalUserProperties', 'isLoggedIn']),
    mapState('schools', ['error', 'isSuccessfull']),
  ),
  components: {
    SchoolComponent,
  },
  created() {
    db.collection('schools')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.schools.push(doc.data());
        });
      });
  },
  data() {
    return {
      isCardModalActive: false,
      school_name: '',
      school_city: '',
      school_description: '',
      school_image: undefined,
      schools: [],
    };
  },
  methods: {
    addSchoolBtn() {
      if (this.additionalUserProperties.position !== 'warden') {
        this.$buefy.snackbar.open({
          message: 'Only wardens are able to submit new schools.',
          type: 'is-link',
        });
        return;
      }

      if (!this.isLoggedIn) {
        this.displaySnackbar();
      } else {
        this.isCardModalActive = true;
      }
    },

    async addSchool() {
      this.$store
        .dispatch('schools/addSchool', {
          school_name: this.school_name,
          school_city: this.school_city,
          school_description: this.school_description,
          school_image: this.school_image,
        })
        .then(() => {
          if (this.isSuccessfull) {
            window.location.reload();
          }
        });
    },

    displaySnackbar() {
      this.$buefy.snackbar.open({
        message: 'You need to be logged in to access this action',
        actionText: 'Login',
        type: 'is-link',
        onAction: () => {
          router.push('/login');
        },
      });
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .container {
    text-align: center;
  }

  .content .image {
    display: none;
  }

  .level-left {
    padding-bottom: 1em;
  }
}

.content .media:last-child {
  padding-bottom: 18em;
}

hr {
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.4), transparent);
}
</style>
