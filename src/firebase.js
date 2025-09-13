import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1gNUgN5jAAJ97YBCxqpAYniMWe6la95Y",
  authDomain: "yp4connect.firebaseapp.com",
  databaseURL: "https://yp4connect-default-rtdb.firebaseio.com",
  projectId: "yp4connect",
  storageBucket: "yp4connect.appspot.com",
  messagingSenderId: "315456197367",
  appId: "1:315456197367:web:91f903dba5cfe4df72f9f2",
  measurementId: "G-825DKBM63S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
export { auth, database };