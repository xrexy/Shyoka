import firebase from '@/db/firebase';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  }
});
