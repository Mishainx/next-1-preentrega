'use client'

import { useEffect } from "react"
import Logo from "../components/ui/Logo"


export default function Error({ error, reset }) {

    useEffect(()=>{
        console.error(error)
        ,[error]
    })

return (
        <div className="flex flex-col justify-center items-center h-96 text-xs">
            <Logo/>
            <h2>Hubo un error al cargar la página</h2>
            <p>{error.message}</p>
            <Button className="bg-amber-400  p-1 mt-1 hover:text-white" onClick={() => reset()}>Refresh</Button>
        </div>

)
}