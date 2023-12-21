"use client";

import Image from "next/image";
import Counter from "../ui/Counter";
import Button from "../ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

export default function Item({ product }) {
  const router = useRouter()
  const { title, description, stock, price, img, slug } = product;
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart } = useCartContext();
  const { user } = useAuthContext();

  const toastNotify = () =>
    toast("Producto agregado", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
    });

  const productInCart = cart?.items?.find((item) => item.slug === slug);
  const totalInCart = productInCart ? productInCart.quantity : 0;

  const handleAdd = async () => {
    if (quantity + totalInCart > stock) {
      toast.warning(`Stock insuficiente. Stock restante: ${stock - totalInCart}`, {
        hideProgressBar: true,
        autoClose: 5000,
      });
      return;
    }

    if(!user.logged){
      Swal.fire({
        title: "Registrate para comprar tu mate!",
        showCancelButton: true,
        confirmButtonText: 'Registrarme',
      }).then((result)=>{
        if (result.isConfirmed) {
          router.push("/users/register");
        }
      })
      return
    }

    addToCart(user.uid, { slug, quantity });

    console.log(user.uid,slug,quantity)

    toastNotify();
  };

  return (
    <div className="relative bg-white overflow-hidden rounded-lg shadow-md flex flex-col items-center w-40 m-4 ">
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
        </div>
      </div>
      {stock - totalInCart > 0 ? (
        <Counter quantity={quantity} setQuantity={setQuantity} stock={stock} />
      ) : (
        <p className="text-red-500 -mt-5">Sin stock</p>
      )}
      {stock - totalInCart > 0 && (
        <Button
          className="bg-amber-400 overflow-hidden w-full py-1 mt-4 hover:text-white"
          onClick={() => handleAdd()}
        >
          Agregar
        </Button>
      )}
    </div>
  );
}
