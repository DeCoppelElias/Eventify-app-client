// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWck9xihWmbkcUuDavlGQ7tXduMHGkQfE",
  authDomain: "eventify-auth.firebaseapp.com",
  projectId: "eventify-auth",
  storageBucket: "eventify-auth.appspot.com",
  messagingSenderId: "51617619553",
  appId: "1:51617619553:web:925d589f3817e3281c9420",
  measurementId: "G-Q9WGEJ62ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const getUserToken = async () => {
    return new Promise((resolve, reject) => {
        const unsub = auth.onAuthStateChanged( async (user) => {
            if (user) {
                const token = await user.getIdToken();
                resolve(token)
            } else {
                console.log("User not logged in")
                resolve(null)
            }
        unsub();
      });
    })
}
export const getUserId = () => {
    return new Promise((resolve, reject) => {
        const unsub = auth.onAuthStateChanged( async (user) => {
            if (user) {
                resolve(user.uid)
            } else {
                console.log("User not logged in")
                resolve(null)
            }
        unsub();
      });
    })
}
export const getUser = () => {
    return new Promise((resolve, reject) => {
        const unsub = auth.onAuthStateChanged( async (user) => {
            if (user) {
                resolve(user)
            } else {
                console.log("User not logged in")
                resolve(null)
            }
        unsub();
      });
    })
}