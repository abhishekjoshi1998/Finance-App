/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase.config"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));  
      } else {
        setUser(null);
        localStorage.removeItem("user");  
      }
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("user"); 
    toast.error("Logged out")
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
