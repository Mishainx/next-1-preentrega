'use client'
import Image from "next/image";
import Counter from "../ui/Counter";
import Button from "../ui/Button";
import Link from "next/link";

export default function Item({product}) {
    const {title,description,price,img,slug} = product     
    console.log(img)
    return (
      <div className="relative bg-white overflow-hidden rounded-lg shadow-md flex flex-col items-center w-40 m-4	">
      <div className="before:absolute before:inset-0 before:h-8 before:bg-amber-400 before:content-['']"></div>
        <Link href={`/product/${slug}`} className="z-10">
          <Image
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
      <Counter/>
      <Button
      className="bg-amber-400 overflow-hidden w-full py-1 mt-4 hover:text-white"
      >
        Agregar
      </Button>
    </div>
    );

};