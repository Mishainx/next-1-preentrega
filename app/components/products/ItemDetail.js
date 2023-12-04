'use client'
import Image from "next/image";
import Counter from "../ui/Counter";
import Button from "../ui/Button";
import backIcon from "@/public/assets/icons/back-icon.svg"
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

const toastNotify = () => toast('Producto agregado', { hideProgressBar: true, autoClose: 2000, type: 'success' })



export default function ItemDetail({product}) {
    const {title,description,price,img,category,slug,stock} = product     
    const [quantity, setQuantity] = useState(1);
    const {cart,addToCart,isInCart,updateCartQuantity} = useCartContext()

    const handleAdd = async()=>{
        let newQuantity
        const productFind = await isInCart(slug)
        if(!productFind){
          addToCart({product,quantity})
        }
        else{
          newQuantity = productFind.quantity+quantity
          updateCartQuantity(slug,newQuantity)
        }
        setQuantity(0)  
        toastNotify()
      }

    return (
    <div className="flex flex-row justify-center space-x-5 py-5">
        <Link href={"/products"}>
            <Image
            alt="back icon"
            src={backIcon}
            width={25}
            className="h-5 bg-amber-400 rounded-full"
            >    
            </Image>    
        </Link>

        <div className="relative bg-white overflow-hidden rounded-lg shadow-md flex flex-col items-center w-40 m-4">
        <div className="before:absolute before:inset-0 before:h-8 before:bg-amber-400 before:content-['']"></div>
        <Image
        alt={description}
        src={img}
        width={200}
        height={200}
        className="m-auto z-10 hover hover:scale-110 duration-300"
        />
        <div className="p-6 -mt-7">
            <div className="text-center">
            <h3 className="font-bold">{title}</h3>
            <p>{`$ ${price}`}</p>
            </div>
        </div>
        <Counter quantity={quantity} setQuantity={setQuantity}/>
        <Button
      className="bg-amber-400 overflow-hidden w-full py-1 mt-4 hover:text-white"
      onClick={()=>handleAdd()}
      >
        Agregar
      </Button>
        </div>
        <div className="py-5">
            <h3 className="font-bold text-amber-500">
                Descripción:
            </h3>
            <p>{description}</p>
            <h3 className="font-bold text-amber-500">
                Categoría:
            </h3>
            <p>{category}</p>
            <h3 className="font-bold text-amber-500">
                Código:
            </h3>
            <p>{slug}</p>
            <h3 className="font-bold text-amber-500">
                Stock:
            </h3>
            <p className= {`${stock>0?'text-green-600 font-bold':'text-red-600 font-bold'} `}>
            {stock>0?"Disponible":"No disponible"}
            </p>
            
        </div>

    </div>

    );

};