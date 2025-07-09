import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebaseConfig';

export const handle = async ({ event, resolve }) => {
  const user = auth.currentUser;

  if (!user) {
    return {
      status: 302,
      redirect: '/login'
    };
  }

  return resolve(event);
};