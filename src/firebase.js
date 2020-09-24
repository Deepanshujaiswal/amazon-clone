// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAUjNrRXvA9pIlodT0OiLI3IA5WYx2MtG0",
    authDomain: "fir-5871d.firebaseapp.com",
    databaseURL: "https://fir-5871d.firebaseio.com",
    projectId: "fir-5871d",
    storageBucket: "fir-5871d.appspot.com",
    messagingSenderId: "25688310064",
    appId: "1:25688310064:web:4389317d012458c10348f5",
    measurementId: "G-ZB2JTCP7DQ"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  export {db,auth};
