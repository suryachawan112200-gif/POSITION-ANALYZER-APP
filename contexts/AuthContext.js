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

  return (
    <AuthContext.Provider value={{ user, loading, logout, changePassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
