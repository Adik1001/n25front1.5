// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, off, onDisconnect, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC8BdIRr-FcmVxoPPi1GT7DhYzc7eQLI6o",
  authDomain: "multiplayer-game-2e92c.firebaseapp.com",
  databaseURL: "https://multiplayer-game-2e92c-default-rtdb.firebaseio.com",
  projectId: "multiplayer-game-2e92c",
  storageBucket: "multiplayer-game-2e92c.firebasestorage.app",
  messagingSenderId: "852559791171",
  appId: "1:852559791171:web:bf2d0d2774da57482180f6",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, onValue, off, onDisconnect, remove };
