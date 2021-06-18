/* eslint-disable no-param-reassign */
import firebase from '@/db/firebase';
import store from '@/store/index';
import db from '@/db';

firebase.auth().onAuthStateChanged((user) => {
  store.commit('auth/setUser', user || undefined);

  // loading additional user information from db
  // creating a document with default values if not found
  if (user) {
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          store.commit('auth/setAdditionalProperties', doc.data());
        } else {
          db.collection('users')
            .doc(user.uid)
            .set({
              position: 'student',
              username: user.displayName,
              uid: user.uid,
              email: user.email,
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
});
