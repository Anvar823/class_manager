// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebaseConfig';

export const handle = async ({ event, resolve }) => {
	const user = auth.currentUser;

	if (!user && event.url.pathname.startsWith('/assignments')) {
		return {
			status: 302,
			redirect: '/login'
		};
	}

	return resolve(event);
};
