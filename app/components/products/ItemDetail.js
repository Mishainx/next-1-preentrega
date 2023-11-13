'use client'
import Image from "next/image";
import Counter from "../ui/Counter";
import Button from "../ui/Button";
import backIcon from "@/public/assets/icons/back-icon.svg"
import Link from "next/link";

export default function ItemDetail({product}) {
    const {title,description,price,img,category,slug,stock} = product     
    
    return (
    <div className="flex flex-row justify-center space-x-5 py-5">
        <Link href={"/catalog"}>
            <Image
            src={backIcon}
            width={25}
            className="h-5 bg-amber-400 rounded-full"
            >    
            </Image>    
        </Link>

        <div className="relative bg-white overflow-hidden rounded-lg shadow-md flex flex-col items-center w-40 m-4">
        <div className="before:absolute before:inset-0 before:h-8 before:bg-amber-400 before:content-['']"></div>
        <Image
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
        <Counter/>
        <Button
        className="bg-amber-400 overflow-hidden w-full py-1 mt-4 hover:text-white"
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