"use client"
import Image from 'next/image'
import { useState } from 'react'
import MenuList from './MenuList'
import menuIcon from "@/public/assets/icons/menu-icon.svg"
import UserUi from './UserUi'

const Menu = () => {
    const [open, setOpen] = useState(false)


    const handleMenu = () => setOpen(!open) 
    const handleClose = () => setOpen(false)

    return (
        <div className='flex gap-2'>
            <UserUi/>
            <div onClick={handleMenu} className='invert'>
            <Image
                    alt='Menu icon'
                    src={menuIcon}
                    width={25}
                    height={25}
                    className='cursor-pointer hover:invert'
            />
            </div>
            <MenuList open={open} setOpen={setOpen} handleClose={handleClose}/>
        </div>
    )
}

export default Menu