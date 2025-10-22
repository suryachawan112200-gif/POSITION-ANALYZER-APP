import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  updateProfile as firebaseUpdateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

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

  const updateProfile = async ({ name, phone, email }) => {
    if (!user) throw new Error("No user is logged in");

    try {
      // Prepare updates
      const profileUpdates = {};
      if (name && name !== user.displayName) {
        profileUpdates.displayName = name;
      }
      if (Object.keys(profileUpdates).length > 0) {
        await firebaseUpdateProfile(user, profileUpdates);
      }

      // Handle phone (custom approach, e.g., store in Firestore or custom claims)
      if (phone && phone !== (user.phoneNumber || "")) {
        // Note: Firebase Auth doesn't directly update phone number after initial setup
        // This requires a custom solution (e.g., Firestore or a backend)
        console.log("Phone update requires custom implementation, e.g., Firestore.");
        // Example: Update in Firestore
        // await updateUserPhoneInFirestore(user.uid, phone);
      }

      // Handle email update (requires re-authentication)
      if (email && email !== user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          prompt("Please enter your current password to re-authenticate:")
        );
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, email);
      }

      // Update local state to reflect changes
      setUser({ ...user, displayName: name || user.displayName, email: email || user.email });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
    changePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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