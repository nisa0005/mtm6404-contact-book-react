import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFr-49HqbPoUoNuUMFK68SXPqYykXvWSs",
  authDomain: "contact-book-e3528.firebaseapp.com",
  projectId: "contact-book-e3528",
  storageBucket: "contact-book-e3528.firebasestorage.app",
  messagingSenderId: "797659642170",
  appId: "1:797659642170:web:d808d746347fa5e6be3803"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;