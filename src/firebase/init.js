import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDvu_KwtgtO7ZDvm7rL9j0NQAy765XsM4Q",
  authDomain: "geo-app-f3bf7.firebaseapp.com",
  databaseURL: "https://geo-app-f3bf7.firebaseio.com",
  projectId: "geo-app-f3bf7",
  storageBucket: "",
  messagingSenderId: "67812455530",
  appId: "1:67812455530:web:7050d99a04af533c"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()

