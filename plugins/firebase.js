import firebaseConfig from '~/firebase.config.json'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
});

export default firebase
export const firestore = db
