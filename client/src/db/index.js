import firebase from './firebase';

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
  merge: true,
});

export default db;
