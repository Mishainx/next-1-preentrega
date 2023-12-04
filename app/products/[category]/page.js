import Item from "@/app/components/products/Item"
import { Suspense } from "react"

export const generateMetadata = async ({params}) => {
    return {
        title: 'Mate y venga - ' + params.category,
        description: "Búsqueda de mates por categoría",
        }
    }


export async function generateStaticParams (){ 
    return [
        {category:'all'},
        {category:'pokemon'},
        {category:'disney'},
        {category:'dbz'}
    ]
}

export default async function ItemList({params}) {
    const {category} = params
    const response = await fetch(`http://localhost:3000/api/products/${category}`,{cache:"no-store"})
    const products = await response.json();
    const items = products;

    return (
        <div className="h-full min-h-screen flex flex-row text-xs flex-wrap justify-center items-center">
                {
                items?.length > 0?
                items.map((product,i)=>
                    <Item key={i} product={product} />)
                    :
                    <p>No hay productos en la categoría seleccionada</p>  
                }
        </div>
    )
}
