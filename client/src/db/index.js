import firebase from '@/db/firebase';

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
  merge: true,
});

export default db;
