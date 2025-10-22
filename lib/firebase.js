import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration (loaded from environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate config (log instead of throwing in development for now)
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error(
    "Firebase configuration error: NEXT_PUBLIC_FIREBASE_API_KEY is missing. Check your .env.local file."
  );
  // For development, allow fallback; in production, this should throw
  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing Firebase API Key");
  }
}

let app;
let auth;

if (typeof window !== "undefined") {
  try {
    // Initialize Firebase app only on client side
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    // Initialize Auth
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error.message);
    // Handle error gracefully (e.g., set auth to null or mock)
    auth = null;
  }
}

export { app, auth };