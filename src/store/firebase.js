
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJwpHEp7x7tH5FPwll9Q14Se4868QnuBA",
  authDomain: "softwareproject-d7ebf.firebaseapp.com",
  databaseURL: "https://softwareproject-d7ebf-default-rtdb.firebaseio.com",
  projectId: "softwareproject-d7ebf",
  storageBucket: "softwareproject-d7ebf.appspot.com",
  messagingSenderId: "147196328895",
  appId: "1:147196328895:web:9f31fd1f3517ae1f0bbf0a",
  measurementId: "G-W61G5YMQ5Z"
};

let app ;
// if(firebase.app.length === 0){
    app=firebase.initializeApp(firebaseConfig);
// }else{
//     app = firebase.app();
// }
 
const db = app.firestore();
 const auth = firebase.auth();

export { db,auth};