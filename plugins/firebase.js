import firebaseConfig from '~/firebase.config.json'
import * as firebase from 'firebase/app'
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig)
