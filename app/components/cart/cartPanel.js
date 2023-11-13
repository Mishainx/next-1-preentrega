import Image from "next/image"
import user from "@/public/assets/icons/user-icon.svg"
import CartList from "./CartList"

const CartPanel = () =>{
    return( 
        <section className="w-full flex flex-row border-2 border-amber-400">
            <div className="w-44 flex flex-col justify-center items-center  border-r-2 border-amber-400">
                <Image
                src={user}
                width={90}
                height={90}
                />
                <p>Nombre</p>
                <p>email</p>
                <p>dni</p>
                <p>telefono</p>
                <p>Dirección</p>
            </div>
            <div className="w-full flex flex-col justify-center items-center border-amber-400">
                <CartList/>
            </div>
        </section>
    )
}

export default CartPanel