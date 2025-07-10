import { auth, db } from '$lib/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

async function createAssignment(assignment) {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error('User not authenticated');
		const docRef = await addDoc(collection(db, 'my app 2'), {
			...assignment,
			status: 'opened',
			userId: user.uid
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

async function getAssignments() {
	const user = auth.currentUser;
	if (!user) throw new Error('User not authenticated');
	const querySnapshot = await getDocs(collection(db, 'my app 2'));
	return querySnapshot.docs
		.map((doc) => ({ id: doc.id, ...doc.data() }))
		.filter((doc) => doc.userId === user.uid);
}

async function deleteAssignment(id) {
	const user = auth.currentUser;
	if (!user) throw new Error('User not authenticated');
	await deleteDoc(doc(db, 'my app 2', id));
}

async function getAssignmentById(id) {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error('User not authenticated');
		const docRef = doc(db, 'my app 2', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists() && docSnap.data().userId === user.uid) {
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

async function updateAssignmentStatus(id, newStatus) {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error('User not authenticated');
		const docRef = doc(db, 'my app 2', id);
		await updateDoc(docRef, { status: newStatus });
		console.log('Document updated with ID: ', id);
	} catch (e) {
		console.error('Error updating document: ', e);
	}
}

async function updateAssignment(id, updatedData) {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error('User not authenticated');
		const docRef = doc(db, 'my app 2', id);
		await updateDoc(docRef, updatedData);
		console.log('Document updated with ID: ', id);
	} catch (e) {
		console.error('Error updating document: ', e);
	}
}

export {
	createAssignment,
	getAssignments,
	deleteAssignment,
	getAssignmentById,
	updateAssignmentStatus,
	updateAssignment
};
