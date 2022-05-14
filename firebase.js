import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzbpKC4WoSoSvOXBamXRx3e0s7GCCzx2A",
  authDomain: "mp-3-fa0d3.firebaseapp.com",
  projectId: "mp-3-fa0d3",
  storageBucket: "mp-3-fa0d3.appspot.com",
  messagingSenderId: "581800805989",
  appId: "1:581800805989:web:0a1d7a92666779c72d288c" 
};
 
  
const app = initializeApp(firebaseConfig);

export {firebaseConfig}