"use client"
import Header from "./components/ui/Header/Header"
import { usePathname} from "next/navigation"

export default function Template({ children }) {
    const path = usePathname()
    return <div>
        {path != "/admin" && <Header />}
        {children}
        </div>
}