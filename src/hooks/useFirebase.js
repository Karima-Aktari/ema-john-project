import {
    getAuth, signInWithPopup, GoogleAuthProvider,
    onAuthStateChanged, signOut
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        /* return the activities of .then  to Login component*/
        return signInWithPopup(auth, googleProvider)

        /* after sign in activities of .then starts*/

        // .then(result => {
        //     console.log(result.user);
        // })
    }

    // Set firebase observer whether user auth state changed or not (state change)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
        return unsubscribe;
    }, [])

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }

    return {
        user,
        signInUsingGoogle,
        logOut
    }
}
export default useFirebase;