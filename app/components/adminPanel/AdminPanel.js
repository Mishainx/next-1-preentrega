'use client'
import Form from "../ui/Form"
import { useState } from "react"
import AdminTools from "./AdminTools"
import AdminProducts from "./AdminProducts"
import AdminUsers from "./AdminUser"


const AdminPanel = () => {

    const[auth, setAuth] = useState(false)
    const [tool, setTool] = useState("products")

    const handleAuth = () =>{
        setAuth(true)
    }

    const handleTool = (value) =>{
        setTool(value)
    }

    return (
        !auth?
        <Form handleAuth={handleAuth}/>
        :
        <section className="w-full flex flex-row  border-2 border-amber-400">
            <div className="w-28 h-96 flex items-center border-amber-400">
                <AdminTools handleTool={handleTool}/>   
            </div>
            <div className=" w-full flex flex-col h-96 text-xs text-center overflow-y-scroll">
            {tool === "products"?
                <AdminProducts/>
                :
                <AdminUsers/>}
            </div>
        </section>
    )
}

export default AdminPanel