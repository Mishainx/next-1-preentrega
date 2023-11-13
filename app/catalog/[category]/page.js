import Item from "@/app/components/products/Item"
import { mockData } from "@/data/products"
import Link from "next/link"
import Image from "next/image"

export const generateMetadata = async ({params}) => {
    return {
        title: 'Mate y venga - ' + params.category,
        description: "Búsqueda de mates por categoría"
    }
}

export default function ItemList({params}) {
    const {category} = params
    const products = category === 'all'? mockData : mockData.filter(product => product.category === category)


    return (
        <div className="h-96 flex flex-row text-xs flex-wrap justify-center items-center">
            {
            products?.length > 0?
            products.map((product,i)=>
                <Item key={i} product={product} />)
                :
                <p>no hay productos seleccionados</p>  
            }
        </div>
    )
}
