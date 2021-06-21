import db from '@/db';
import firebase from '@/db/firebase';
import router from '@/router';

const mutations = {
  setError(state, error) {
    state.error = error;
  },
  setSuccess(state, success) {
    state.isSuccessfull = success;
  },
};

const state = {
  error: '',
  isSuccessfull: false,
};

function isValidImageURL(imageURL) {
  return imageURL.startsWith('http://i.imgur.com/') || imageURL.startsWith('https://i.imgur.com/');
}

async function writeSchoolData(school) {
  db.collection('schools')
    .doc(school.school_name)
    .set(school)
    .catch((err) => {
      console.log(err);
      return false;
    });
  return true;
}

const actions = {
  deleteSchool: async ({ commit }, school) => {
    db.collection('schools')
      .doc(school.school_name)
      .delete()
      .then(() => router.push('/schools'))
      .catch((err) => commit('setError', err));

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  addSchool: async ({ commit }, payload) => {
    // shitties validation known to humankind..
    let doc;
    let canExecute = true;
    if (payload.school_name) {
      doc = db.collection('schools').doc(payload.school_name);
    }
    if (payload.school_image && !isValidImageURL(payload.school_image)) {
      commit('setError', 'Only i.imgur images are allowed!');
      canExecute = false;
    }

    if (!payload.school_name || !payload.school_city || !payload.school_description) {
      commit('setError', 'None other than the image field can be empty!');
      canExecute = false;
    }

    if (
      payload.school_name.length < 2
      || payload.school_city.length < 2
      || payload.school_description.length < 10
    ) {
      commit('setError', 'One of you fields is too short.');
      canExecute = false;
    }

    if (canExecute) {
      doc.get().then((response) => {
        if (response.exists) {
          commit('setError', 'A school with this name already exists!');
          canExecute = false;
        }
      });
    }

    db.collection('schools')
      .get()
      .then((response) => {
        if (canExecute) {
          // eslint-disable-next-line
          if (!payload.school_image) payload.school_image = -1;
          writeSchoolData({
            comments: [],
            school_id: response.size + 1001,
            rating: 0,
            rated: [],
            ...payload,
          }).then((result) => commit('setSuccess', result));

          db.collection('users');
        }
      });

    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  addComment: async ({ commit }, payload) => {
    const promise = new Promise((resolve) => {
      if (!payload.comment) {
        commit('setError', 'Comment must be between 10 and 100 characters');
      } else if (payload.comment.lenth < 10) {
        commit('setError', "Your comment can't be shorter than 10 characters");
      } else if (payload.comment > 100) {
        commit('setError', "Your comment can't be larger than 100 characters");
      } else {
        db.collection('schools')
          .doc(payload.school.school_name)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              comment: payload.comment,
              postedBy: {
                username: payload.postedBy.displayName,
                photoURL: payload.postedBy.photoURL === undefined ? -1 : payload.postedBy.photoURL,
              },
            }),
          })
          .then(() => {
            db.collection('users')
              .doc(payload.postedBy.uid)
              .update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                  comment: payload.comment,
                  postedOn: payload.school.school_name,
                }),
              });
          });
        resolve();
      }
    });
    promise.then(() => {
      commit('setSuccess', true);
    });
    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
  registerVote: async ({ commit }, payload) => {
    const collection = db.collection('schools');
    const doc = collection.doc(payload.school.name);
    if (!doc) {
      commit('setError', "Couldn't load document");
    } else {
      const hasVotedPromise = collection
        .where('school_name', '==', payload.school.name)
        .where('rated', 'array-contains', payload.user.uid)
        .get();
      hasVotedPromise.then((voted) => {
        if (voted.empty) {
          const processVote = new Promise((resolve) => {
            doc
              .update({
                rating: firebase.firestore.FieldValue.increment(payload.rating),
              })
              .catch((error) => commit('setError', error));

            doc
              .update({
                rated: firebase.firestore.FieldValue.arrayUnion(payload.user.uid),
              })
              .catch((error) => commit('setError', error));

            resolve();
          });
          processVote.then(() => {
            payload.buefy.snackbar.open({
              message: `Successfully rated ${payload.school.name} with ${payload.rating} stars!`,
              type: 'is-success',
            });
          });
        } else {
          payload.buefy.snackbar.open({
            message: `You have already voted for ${payload.school.name}!`,
            type: 'is-link',
          });
        }
      });
    }
    await new Promise((r) => setTimeout(r, 1500));
    commit('setError', undefined);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
