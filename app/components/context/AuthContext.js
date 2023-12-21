"use client"
import { auth } from "@/firebase/config"
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const toastNotifySuccess = () => toast('Usuario creado', { hideProgressBar: true, autoClose: 2000, type: 'success' })
const toastNotifyError = () => toast('Error al crear el usuario', { hideProgressBar: true, autoClose: 2000, type: 'success' })

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState({
        logged: null,
        email: null,
        uid: null,
        role:null
    })


    

    const createUser = async (values) => {
        const addUser = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/users`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                values
            })       
})
            if (addUser.status === 201) {
                Swal.fire({
                    title: "Usuario creado!",
                    confirmButtonText: 'ok',
                  }).then((result)=>{
                    if (result.isConfirmed) {
                      router.push("/login");
                    }
                  })
            } else {
                toastNotifyError();
}
}
const loginUser = async (values) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log(userCredential)
        return userCredential.user; 
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        return null;
    }
};


    const logout = () => {
        signOut(auth)
    }

    const userFind = async (uid) => {
        const findUser = await fetch( `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/users/${uid} `)   
        const userData = await findUser.json()
        return userData
    };

    const userRole = async (uid) => {
        const findUser = await fetch( `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/users/${uid} `)   
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
                    role: user.uid?await userRole(user.uid):null
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