'use client'

import users from "@/public/assets/icons/users-icon.svg"
import products from "@/public/assets/icons/products-icon.svg"
import Image from "next/image"

const AdminTools = ({handleTool}) => {

    return (
        <div className="h-full flex-auto flex flex-col justify-center items-center gap-2 border-r-2 border-amber-400">
            <div className="bg-amber-400 rounded-full p-2 border">
            <Image
                    alt='Products icon'
                    src={products}
                    width={48}
                    height={48}
                    className='invert'
                    onClick={()=>handleTool("products")}
            />
            </div>
            <div className="bg-amber-400 rounded-full p-2 ">
            <Image
                    alt='Users icon'
                    src={users}
                    width={48}
                    height={48}
                    className='invert'
                    onClick={()=>handleTool("users")}
            />
            </div>
        </div>
    )
}

export default AdminTools