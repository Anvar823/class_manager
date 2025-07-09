import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBbLDQPLSf1ogOMuTvWb4Q7IyTSLpZc_Zk',
	authDomain: 'my-app-2-73334.firebaseapp.com',
	projectId: 'my-app-2-73334',
	storageBucket: 'my-app-2-73334.firebasestorage.app',
	messagingSenderId: '631810775195',
	appId: '1:631810775195:web:560a0e8353344f00c6ce3e',
	measurementId: 'G-927EW3TPKK'
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };