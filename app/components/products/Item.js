'use client'
import Image from "next/image";
import Counter from "../ui/Counter";
import Button from "../ui/Button";
import Link from "next/link";
import { useState} from "react";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Item({product}) {
    const {title,description,price,img,slug} = product     
    const [quantity, setQuantity] = useState(1);
    const {cart, isInCart,addToCart,updateCartQuantity} = useCartContext()

    const toastNotify = () => toast('Producto agregado', { hideProgressBar: true, autoClose: 2000, type: 'success' })


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
        setQuantity(1)

        toastNotify()
      }

    return (
      <div className="relative bg-white overflow-hidden rounded-lg shadow-md flex flex-col items-center w-40 m-4	">
      <div className="before:absolute before:inset-0 before:h-8 before:bg-amber-400 before:content-['']"></div>
        <Link href={`/product/${slug}`} className="z-10">
          <Image
          alt={description}
          src={img}
          width={200}
          height={200}
          className="m-auto z-10 hover hover:scale-110 duration-300"
          />
        </Link>
      <div className="p-6 -mt-7">
        <div className="text-center">
          <h3 className="font-bold">{title}</h3>
          <p>{`$ ${price}`}</p>
          <Link href={`/product/${slug}`}><p className="text-amber-400">Ver detalle</p></Link>
        </div>
      </div>
      <Counter quantity={quantity} setQuantity={setQuantity}
      
      />
      <Button
      className="bg-amber-400 overflow-hidden w-full py-1 mt-4 hover:text-white"
      onClick={()=>handleAdd()}
      >
        Agregar
      </Button>      
    </div>
    );

};