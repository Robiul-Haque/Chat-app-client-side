/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [loadingSpinner, setLoadingSpinner] = useState(true);
    const [loginUser, setLoginUser] = useState(null);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoadingSpinner(false);
            setLoginUser(currentUser);
            return () => {
                return unSubscribe();
            }
        });
    });

    const emailPassSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider);
    }

    const emailPassSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        emailPassSignUp,
        googleSignIn,
        emailPassSignIn,
        loadingSpinner,
        loginUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;