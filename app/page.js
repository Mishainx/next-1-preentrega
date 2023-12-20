import ItemList from "./components/products/ItemList";
import CategoriesShow from "./components/categories-show/CategoriesShow";

export const metadata ={
  title:"Mate y venga",
  description: "Tienda de mates",
  keywords: ["mate","yerba","bombilla","tradición argentina"],
}

async function getItems(){
  try{
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,{cache:"no-cache"})
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

export default async function Home() {
  const items = await getItems()

  return (
    <main className="min-h-screen	flex flex-col justify-center items-center">
              <CategoriesShow/>
              <ItemList items={items}/>
    </main>
  )
}
