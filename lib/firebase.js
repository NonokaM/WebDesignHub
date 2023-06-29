import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcZUkTgrPGPoVMvmWjI-2DaGeI5_PiiEo",
  authDomain: "webdesign-hub.firebaseapp.com",
  projectId: "webdesign-hub",
  storageBucket: "webdesign-hub.appspot.com",
  messagingSenderId: "846603899476",
  appId: "1:846603899476:web:27ddd859d614ef1432d3c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
