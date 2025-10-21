import { useEffect } from "react";
import { app, initializeApp } from "firebase/app"; // Import app and initializeApp
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import auth if needed
import { useAuth } from "../contexts/AuthContext"; // Adjust path as needed

// Your Firebase configuration (should be in environment variables or a secure config file)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app only once (client-side)
let firebaseApp = null;
let auth = null;

function initializeFirebase() {
  if (typeof window !== "undefined" && !firebaseApp) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      auth = getAuth(firebaseApp);
      console.log("Firebase initialized successfully");
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }
  return { firebaseApp, auth };
}

function MyApp({ Component, pageProps }) {
  const { setUser } = useAuth();

  useEffect(() => {
    initializeFirebase();
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }
  }, [setUser]);

  return <Component {...pageProps} />;
}

export default MyApp;