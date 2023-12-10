/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();

    const emailPassSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider);
    }

    const emailPassSignIn = (email, password) => {
        console.log(email, password);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        emailPassSignUp,
        googleSignIn,
        emailPassSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;