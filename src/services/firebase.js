/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  set,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export const connectToRoom = (roomId, callback) => {
  const roomRef = ref(db, `rooms/${roomId}`);

  const off = onValue(roomRef, (snapshot) => {
    if (snapshot.val()) {
      console.log(snapshot.val());
      callback(snapshot.val());
    }
  });

  return off;
};

export const editRoomText = (roomId, text) => {
  const roomRef = ref(db, `rooms/${roomId}`);
  console.log(text);
  set(roomRef, { text });
};
