import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZkF4LEbeaN7-iMBrSP3oVXz70TPzZz-8",
  authDomain: "live-chat-a4026.firebaseapp.com",
  projectId: "live-chat-a4026",
  storageBucket: "live-chat-a4026.appspot.com",
  messagingSenderId: "442427161167",
  appId: "1:442427161167:web:7d84bbadf361d9b256883a",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
