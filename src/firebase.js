
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyDzbpKC4WoSoSvOXBamXRx3e0s7GCCzx2A",
  authDomain: "mp-3-fa0d3.firebaseapp.com",
  projectId: "mp-3-fa0d3",
  storageBucket: "mp-3-fa0d3.appspot.com",
  messagingSenderId: "581800805989",
  appId: "1:581800805989:web:0a1d7a92666779c72d288c" 
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth){
        return;
    }
    const userRef =  firestore.doc(`user/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                role:'user',
                lastSearch:'',
                ...additionalData
            })
        } catch( error){
            console.log('error creating user',error.message)
        }
    }
    
    return userRef;
    
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

