'use client'

import { useRouter } from "next/navigation"
import Button from "./components/ui/Button"

export default function notFound() {
    const router = useRouter()

    return (
        <div>
            <p>404 Página no encontrada</p>
            <Button onClick={()=>router.back()}>Volver</Button>
        </div>
    )
}