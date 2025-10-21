import { useEffect } from "react";
import { app, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthProvider, useAuth } from "/contexts/AuthContext"; // Adjust path

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp = null;
let auth = null;

function initializeFirebase() {
  if (typeof window !== "undefined" && !firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
  }
  return { firebaseApp, auth };
}

function MyApp({ Component, pageProps }) {
  const { setUser } = useAuth(); // This will work if wrapped in AuthProvider

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

// Wrap MyApp with AuthProvider
function AppWithProvider({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MyApp Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default AppWithProvider;