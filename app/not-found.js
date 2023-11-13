'use client'

import { useRouter } from "next/navigation"
import Button from "./components/ui/Button"
import Logo from "./components/ui/Logo"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="w-ful h-96 flex flex-col justify-center items-center">
            <Logo/>
            <p>404 Página no encontrada</p>
            <Button
                onClick={()=>router.back()}
                className="p-1  bg-amber-400 rounded-md"
            >Volver</Button>
        </div>
    )
}