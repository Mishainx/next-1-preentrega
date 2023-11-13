"use client"
import Image from 'next/image'
import { useState } from 'react'
import MenuList from './MenuList'
import menuIcon from "@/public/assets/icons/menu-icon.svg"

const Menu = () => {
    const [open, setOpen] = useState(false)

    const handleMenu = () => {
        setOpen(!open)
    }

    return (
        <>
            <div onClick={handleMenu} className='invert'>
            <Image
                    alt='Menu icon'
                    src={menuIcon}
                    width={25}
                    height={25}
                    className=''
            />
            </div>
            <MenuList open={open} setOpen={setOpen}/>
        </>
    )
}

export default Menu