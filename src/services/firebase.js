import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

export const connectToRoomText = (roomId, callback) => {
  const roomTextRef = ref(db, `rooms/${roomId}/text`);

  const off = onValue(roomTextRef, (snapshot) => {
    if (snapshot.val() !== null) {
      callback(snapshot.val());
    }
  });

  return off;
};

export const connectToRoomHistory = (roomId, callback) => {
  const roomHistoryRef = ref(db, `rooms/${roomId}/history`);

  const off = onValue(roomHistoryRef, (snapshot) => {
    if (snapshot.val() !== null) {
      callback(snapshot.val());
    }
  });

  return off;
};

export const editRoomText = (roomId, text) => {
  const roomRef = ref(db, `rooms/${roomId}`);
  update(roomRef, { text });
};

export const clearHistory = (roomId) => {
  const roomRef = ref(db, `rooms/${roomId}`);
  update(roomRef, { history: null });
};

export const pushToHistory = (roomId, textForHistory) => {
  if (!textForHistory) return;

  const roomRef = ref(db, `rooms/${roomId}`);
  const historyRef = ref(db, `rooms/${roomId}/history`);

  const newHistoryKey = push(historyRef).key;

  update(roomRef, {
    [`history/${newHistoryKey}`]: textForHistory,
  });
};
