import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "/lib/firebase";
import { onAuthStateChanged, signOut, updatePassword } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const changePassword = (newPassword) => {
    if (user) {
      return updatePassword(user, newPassword);
    }
    throw new Error("No user is logged in");
  };

  // Provide setUser in the context value
  const value = {
    user,
    setUser, // Add setUser to the context
    loading,
    logout,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};