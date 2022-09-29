import {initializeApp} from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE0z-xHaOuLu--hI6DRZgv1Nw4n5o9_vg",
  authDomain: "crwn-clothing-db-69aed.firebaseapp.com",
  projectId: "crwn-clothing-db-69aed",
  storageBucket: "crwn-clothing-db-69aed.appspot.com",
  messagingSenderId: "531990738512",
  appId: "1:531990738512:web:3890c2469d9fcdf4c80355"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot.exists());


    //if the user does not exist
    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });

        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}

