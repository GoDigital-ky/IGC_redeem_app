import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZnMtl_BXxZPj0thle_TwlFFYozZFfOMo",
  authDomain: "igc-redeem-merchant-portal.firebaseapp.com",
  projectId: "igc-redeem-merchant-portal",
  storageBucket: "igc-redeem-merchant-portal.appspot.com",
  messagingSenderId: "559704332284",
  appId: "1:559704332284:web:ca1d3ec020d1dbe7800479",
  measurementId: "G-6VQCVS356K"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export { createUserWithEmailAndPassword, signOut };