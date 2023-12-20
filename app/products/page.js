import ItemList from "../components/products/ItemList"
export const generateMetadata = async () => {
  return {
      title: 'Catálogo',
      description: "Catálogo de mates"
    }
  }



export default async function Products() {

  async function getItems(){
    try{
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,{cache:"no-cache"})
      if (response.ok) {
        return response.json();
      } else {
        console.log(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`)
        console.log("Error en la respuesta:", response.status);
      }
    }
    catch(error){
      throw new Error("failed to fetch")
    }
  }
  
  const items = await getItems()

    return (
      <main className="">
        <section className="flex flex-col h-full">
            <ItemList items={items} />
        </section>
      </main>
    )
  }
  