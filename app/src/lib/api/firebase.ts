import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAo0lrkSb3_Ecl568ahbedG2AAdMlwJQxY",
  authDomain: "web-4m4-annotation.firebaseapp.com",
  projectId: "web-4m4-annotation",
  storageBucket: "web-4m4-annotation.appspot.com",
  messagingSenderId: "61275689721",
  appId: "1:61275689721:web:70dac52c5dd809e8460828"
};
initializeApp(firebaseConfig);


export const auth = getAuth();
export const database = getFirestore();

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(database, 'localhost', 8080);
}

