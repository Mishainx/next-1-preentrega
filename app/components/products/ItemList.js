"use client"

import { mockData } from "@/data/products"
import Item from "./Item"
import SearchInput from "../ui/SearchInput"
import { useState } from "react"

export default function ItemList({items}) {
    const [products, setProducts] = useState(mockData)


    return (
        <>
        <SearchInput/>
        <div className="flex flex-row text-xs flex-wrap justify-center">
            {
            products?.length > 0?
            products.map((product,i)=>
                <Item key={i} product={product} />)
                :
                <p>no hay productos seleccionados</p>
            }
        </div>
        </>
    )
}
