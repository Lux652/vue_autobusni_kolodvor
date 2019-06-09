import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBVKZZd9V5-EzKfupVe2BEjNCEHFAdgUVk",
    authDomain: "autobusni-kolodvor.firebaseapp.com",
    databaseURL: "https://autobusni-kolodvor.firebaseio.com",
    projectId: "autobusni-kolodvor",
    storageBucket: "autobusni-kolodvor.appspot.com",
    messagingSenderId: "613066733924",
    appId: "1:613066733924:web:e9013eda826847ce"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);
//   firebaseApp.firestore().settings({ timestampsInSnapshots: true});

// export firestore db

export default firebaseApp.firestore();