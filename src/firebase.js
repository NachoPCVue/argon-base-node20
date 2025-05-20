import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase  } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCi7Ub12fbxnYZakRuUuyVPkmGPs5a0S0k",
    authDomain: "misig-lat.firebaseapp.com",
    databaseURL: "https://misig-lat-default-rtdb.firebaseio.com",
    projectId: "misig-lat",
    storageBucket: "misig-lat.firebasestorage.app",
    messagingSenderId: "357108950536",
    appId: "1:357108950536:web:8cb2f14b9ca8338ad493bd"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  // Create instances
  const auth = getAuth(firebaseApp);
  const database = getDatabase(firebaseApp);
  const storage = getStorage(firebaseApp);
  
  // Export for use in the rest of the code
  export { firebaseApp, auth, database, storage };