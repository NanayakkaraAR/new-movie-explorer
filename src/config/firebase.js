import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBdZQYxUDW9n_2UueDu2eHL9rY-RF6x5Xo', // 👈 Get this from your Firebase project settings
  authDomain: 'movie-explorer-51e1b.firebaseapp.com',
  projectId: 'movie-explorer-51e1b',
  storageBucket: 'movie-explorer-51e1b.appspot.com', // Or movie-explorer-51e1b.firebasestorage.app depending on project setup
  messagingSenderId: '402668625978',
  appId: 'movie-explorer-51e1b', // 👈 Get this from your Firebase project settings
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
