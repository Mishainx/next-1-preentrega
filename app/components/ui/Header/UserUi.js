"use client"

import Image from "next/image"
import { useAuthContext } from "../../context/AuthContext"
import addUser from "@/public/assets/icons/add-user.svg"
import userIcon from "@/public/assets/icons/user.svg"
import Link from "next/link"

const UserUi = () => {
    
    const {user} = useAuthContext()



    return (
        <div>
            {user.logged?
                <Link href={"/cart"}>
                    <Image
                    src={userIcon}
                    width={25}
                    alt="register user icon"
                    className="cursor-pointer hover:invert"
                    >
                    </Image>
                </Link>
            :
            <Link href={"/login"}>
                <Image
                    src={addUser}
                    width={25}
                    alt="register user icon"
                    className="cursor-pointer hover:invert"
                    >   
                </Image>
            </Link>
            }
        </div>
    )
}

export default UserUi
