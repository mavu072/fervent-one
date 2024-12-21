import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

/**
 * Initializes a Firebase App and the required services.
 * @returns Firebase App
 */
function FirebaseApp() {
    const app = firebase.initializeApp({
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MSG_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
    });
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    return {
        app, auth, firestore
    }
}

export default FirebaseApp;