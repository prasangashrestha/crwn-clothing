import firebase from 'firebase/app' 
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBonzZAfvX4exZ8B6bvBhTMzAp70hcRm8g",
    authDomain: "crwn-db-39b4a.firebaseapp.com",
    databaseURL: "https://crwn-db-39b4a.firebaseio.com",
    projectId: "crwn-db-39b4a",
    storageBucket: "crwn-db-39b4a.appspot.com",
    messagingSenderId: "524181873379",
    appId: "1:524181873379:web:25bfd5e55c04f2fc2e9bd6",
    measurementId: "G-CE290C6RX8"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();

      if(!snapShot.exists){
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
          }catch (error){
            console.log('error creating user', error.message);
          }
      }

      return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  