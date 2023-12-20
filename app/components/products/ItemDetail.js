"use client"

// ItemDetail.js
import Image from "next/image";

import backIcon from "@/public/assets/icons/back-icon.svg";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import Item from "./Item";

export default async function ItemDetail({ product }) {
  const { title, description, price, img, category, slug, stock } = product;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, updateCartQuantity } = useCartContext();
  const totalInCart = (await isInCart(slug)) ?? { quantity: 0 };

  const toastNotify = () =>
    toast("Producto agregado", { hideProgressBar: true, autoClose: 2000, type: "success" });

  const handleAdd = async () => {
    let newQuantity;
    const productFind = await isInCart(slug);
    if (!productFind) {
      addToCart({ product, quantity });
    } else {
      newQuantity = productFind.quantity + quantity;
      updateCartQuantity(slug, newQuantity);
    }
    setQuantity(1);
    toastNotify();
  };

  return (
    <div className="flex flex-row justify-center space-x-5 py-5">
      <Link href={"/products"}>
        <Image alt="back icon" src={backIcon} width={25} className="h-5 bg-amber-400 rounded-full" />
      </Link>

      <Item product={product} quantity={quantity} setQuantity={setQuantity} handleAdd={handleAdd} />

      <div className="py-5">
        <h3 className="font-bold text-amber-500">Descripción:</h3>
        <p>{description}</p>
        <h3 className="font-bold text-amber-500">Categoría:</h3>
        <p>{category}</p>
        <h3 className="font-bold text-amber-500">Código:</h3>
        <p>{slug}</p>
        <h3 className="font-bold text-amber-500">Stock:</h3>
        <p className={`${stock > 0 && totalInCart.quantity < stock ? 'text-green-600 font-bold' : 'text-red-600 font-bold'} `}>
          {stock > 0 && totalInCart.quantity < stock ? "Disponible" : "No disponible"}
        </p>
      </div>
    </div>
  );
}

