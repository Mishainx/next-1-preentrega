"use client"
import { useAuthContext } from "../components/context/AuthContext"

const CartLayout = ({children,login}) =>{
    const {user} = useAuthContext()    

    if(user.role=="admin"){
        throw new Error("No es posible ingresar al cart con una cuenta admin")
    }

    return(

        <div>
            { user.logged ? children : login }
        </div>
    )
}

export default CartLayout