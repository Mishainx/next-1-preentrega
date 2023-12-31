"use client"

import Link from "next/link"
import Image from "next/image"
import closeIcon from "@/public/assets/icons/close-icon.svg"
import { useAuthContext } from "../../context/AuthContext"
import Button from "../Button"

const MenuList = ({ open, setOpen, handleClose }) => {
    const { user, logout } = useAuthContext();

    let pages = user.role === "admin" ? 
        [
            { name: 'Admin Panel', href: '/admin' }
        ] : 
        [
            { name: 'Inicio', href: '/' },
            { name: 'Productos', href: '/products' },
            {
                name: user.logged ? 'Mis compras' : 'Registrarse',
                href: user.logged ? '/cart' : '/users/register',
            }
        ];
  
    return (
        <div className={`${open ? 'visible opacity-100' : 'invisible opacity-0'} transition-all fixed inset-0 bg-black/50 flex justify-end z-20`}>
            <aside className={`${!open ? 'translate-x-full md:translate-x-48' : ''} transition-all duration-500 w-full md:w-48 bg-amber-400 flex flex-col items-end p-5`}>
                <Image
                    alt="close icon"
                    src={closeIcon}
                    width={40}
                    height={40}
                    onClick={handleClose}
                    className="ml-auto cursor-pointer hover:invert"
                />
                <nav className="flex flex-col items-end">
                    {pages.map((page, i) => (
                        <Link key={i} href={page.href}>
                            <a className="my-2 text-white hover:text-gray-300" onClick={handleClose}>
                                {page.name}
                            </a>
                        </Link>
                    ))}
                    {user.logged && (
                        <Button
                            className="py-2 px-4 text-white"
                            onClick={() => {
                                logout();
                                handleClose();
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </nav>
            </aside>
        </div>
    );
};

export default MenuList;
