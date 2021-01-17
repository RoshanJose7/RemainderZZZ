import React, { createContext, useContext, useState, useEffect } from "react";
import firebase, { auth } from "./db";

const AuthContext = createContext<AuthContextInterface | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  async function login(email: string, password: string) {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  async function logout() {
    await auth
      .signOut()
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  async function resetPassword(email: string) {
    await auth
      .sendPasswordResetEmail(email)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  async function updateEmail(email: string) {
    await currentUser
      ?.updateEmail(email)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  async function updatePassword(password: string) {
    await currentUser
      ?.updatePassword(password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
