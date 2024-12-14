import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";



const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
const googleProvider = new GoogleAuthProvider()


//AuthProvider 

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const registerUser = async (email, password) => {
       return await createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    const googlelogin = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])





    const value = {
        isLoading,
        currentUser,
        registerUser, 
        loginUser,
        googlelogin,
        logout, 
    }
    return  (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider