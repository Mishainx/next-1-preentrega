import ItemDetail from "@/app/components/products/ItemDetail"
import { Suspense } from "react"

export const generateMetadata = async ({params}) => {
  return {
      title: 'Mate y venga - ' + params.slug,
      description: 'Detalle de producto'
  }
}

async function fetchProduct(slug) {
    try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${slug}`, {
            cache: "no-store"
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Error en la solicitud: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error('Error en la obtención del producto:', error);
        return null;
    }
}

export default async function ProductDetail({params}) {
    const {slug} = params
    const item = await fetchProduct(slug)

    return (
        <main className="h-96 flex flex-col justify-center items-center">
            <Suspense fallback={<p>cargando...</p>}>
                <div className="flex flex-col text-xs flex-wrap justify-center items-center">
                    {
                    item?
                    <ItemDetail key={slug} product={item}/>
                    :
                    <p>No existe un producto con ese código</p>
                    }
                </div>
            </Suspense>   
        </main>
    )
}
