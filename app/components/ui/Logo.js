import Image from "next/image"
import Link from "next/link"
import mate from "@/public/assets/products/mate-venga.png"


const Logo = () => {

    return (

        <Link href="/" className="">
        <div className="flex flex-row justify-center items-center text-xs">
        <Image
            src={mate}
            width={40}
            height={40}
            className=""
        />
        <h1 className="pt-1 font-sans">Mate y venga</h1>

        </div>
    
        </Link>

    )
}

export default Logo
