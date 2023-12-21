import Item from "@/app/components/products/Item"

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

    
async function getItems(category){

  try{
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${category}`,{cache:"no-cache"})
    if (response.ok) {
      return response.json();
    } else {
      console.log("Error en la respuesta:", response.status);
    }
  }
  catch(error){
    throw new Error("failed to fetch")
  }
}

    const items = await getItems(category)

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
