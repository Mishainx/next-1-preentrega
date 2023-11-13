import ItemDetail from "@/app/components/products/ItemDetail"
import { mockData } from "@/data/products"

export const generateMetadata = async ({params}) => {
  return {
      title: 'Mate y venga - ' + params.slug
  }
}

export default function ProductDetail({params}) {
  const {slug} = params
  const product = slug?mockData.find(product => product.slug === slug):undefined


    return (
        <main className="h-96">
            <div className="flex flex-row text-xs flex-wrap justify-center">
                
                {
                product?
                <ItemDetail key={slug} product={product}/>
                :
                <p>no hay productos seleccionados</p>
                }
                
            </div>
        </main>
    )
}
