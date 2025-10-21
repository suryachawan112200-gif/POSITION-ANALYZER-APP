
import { useEffect } from "react";
import { auth } from "/lib/firebase";
import { AuthProvider } from "/contexts/AuthContext"; // Adjust the path
import "/src/styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // This ensures the auth state is updated, but the context handles it
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
