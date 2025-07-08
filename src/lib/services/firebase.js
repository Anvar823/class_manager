import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	deleteDoc,
	doc,
	addDoc,
	getDoc
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBbLDQPLSf1ogOMuTvWb4Q7IyTSLpZc_Zk',
	authDomain: 'my-app-2-73334.firebaseapp.com',
	projectId: 'my-app-2-73334',
	storageBucket: 'my-app-2-73334.firebasestorage.app',
	messagingSenderId: '631810775195',
	appId: '1:631810775195:web:560a0e8353344f00c6ce3e',
	measurementId: 'G-927EW3TPKK'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createAssignment(assignment) {
	try {
		const docRef = await addDoc(collection(db, 'my app 2'), assignment);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

export async function getAssignments() {
	const querySnapshot = await getDocs(collection(db, 'my app 2'));
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteAssignment(id) {
	await deleteDoc(doc(db, 'my app 2', id));
}

export async function getAssignmentById(id) {
	try {
		const docRef = doc(db, 'my app 2', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() };
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching document: ', error);
		return null;
	}
}
