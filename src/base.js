import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDAUZng3B-NuBYyz9YpALpEygA-RyxUQ-A",
  authDomain: "catch-of-the-day-konstantina.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-konstantina.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export - we know what it is called
export { firebaseApp };

// this is a default export - the main thing exported; allows us to bring it into other files
export default base;
