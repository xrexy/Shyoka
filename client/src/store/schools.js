import db from '@/db';
import firebase from '@/db/firebase';

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
        console.log(payload);
        db.collection('schools')
          .doc(payload.school.school_name)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              comment: payload.comment,
              postedBy: {
                uid: payload.postedBy.uid,
                username: payload.postedBy.displayName,
                photoURL: payload.postedBy.photoURL === undefined ? -1 : payload.postedBy.photoURL,
              },
              replies: [],
            }),
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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
