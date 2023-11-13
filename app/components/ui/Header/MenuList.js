"use client"

import Link from "next/link"
import Image from "next/image"
import closeIcon from "@/public/assets/icons/close-icon.svg"

const MenuList = ({open,setOpen}) => {
    const pages = [
        { name: 'Inicio', href: '/' },
        {name: 'Productos', href:'/catalog'},
        {name: 'Mis compras', href:'/cart'} //{ name: 'About', href: '#about' },
    ]

    const handleClose = () => setOpen(false)

    return (
        <div className={`${open ? 'visible opacity-100' : 'invisible opacity-0'} transition-all fixed inset-0 bg-black/50 flex justify-end z-20`}>       
            <aside className={`${!open ? 'translate-x-48' : ''} transition-all duration-500 w-48 bg-amber-400 flex-col items-end p-5`}>
                <Image
                alt="close icon"
                src={closeIcon}
                width={40}
                height={40}
                onClick={handleClose}
                className="invert ml-auto"
                />
                <nav className="flex flex-col items-end invert">
                    {
                    pages.map((page,i)=>
                    <Link  key={i} href={`${page.href}`}>{page.name}</Link>
                    )
                    }
                </nav>
            </aside>
        </div>
    )
}

export default MenuList