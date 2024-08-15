import React from 'react';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import app from '../firebase/firebase.config.js'
import {getAuth} from "firebase/auth";

const Login = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const handleLogin = async () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            const user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <button onClick={handleLogin} className="bg-blue px-8 py-2 text-white">Login</button>
        </div>
    );
};

export default Login;