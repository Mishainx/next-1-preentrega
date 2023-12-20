"use client"
import { useAuthContext } from "../components/context/AuthContext"

const AdminLayout = ({children,login}) =>{
    const {user} = useAuthContext()


    return(

        <div>
            { user.logged && user.role ==="admin" ? children : login }
        </div>
    )
}

export default AdminLayout