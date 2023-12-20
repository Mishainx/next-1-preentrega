"use client"
import { auth } from "@/firebase/config"
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";



const toastNotifySuccess = () => toast('Usuario creado', { hideProgressBar: true, autoClose: 2000, type: 'success' })
const toastNotifyError = () => toast('Error al crear el usuario', { hideProgressBar: true, autoClose: 2000, type: 'success' })

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        logged: null,
        email: null,
        uid: null,
        role:null
    })


    

    const createUser = async (values) => {
        const addUser = await fetch("http://localhost:3000/api/users",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                values
            })       
})
            if (addUser.status === 201) {
                toastNotifySuccess();
            } else {
                toastNotifyError();
}
}

    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password)
    }

    const logout = () => {
        signOut(auth)
    }

    const userFind = async (uid) => {
        const findUser = await fetch( `http://localhost:3000/api/users/${uid} `)   
        const userData = await findUser.json()
        return userData
    };

    const userRole = async (uid) => {
        const findUser = await fetch( `http://localhost:3000/api/users/${uid} `)   
        const userData = await findUser.json()
        const userRole = userData.role
        return userRole
    };

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                setUser({
                    logged: true,
                    email: user.email,
                    uid: user.uid,
                    role: await userRole(user.uid)
                })


            } else {
                setUser({
                    logged: false,
                    email: null,
                    uid: null,
                    role:null
                })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            createUser,
            loginUser,
            logout,
            userFind,
            userRole
        }}>
            {children}
        </AuthContext.Provider>
    )
}