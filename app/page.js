import ItemList from "./components/products/ItemList";
import CategoriesShow from "./components/categories-show/CategoriesShow";

export const metadata ={
  title:"Mate y venga",
  description: "Tienda de mates",
  keywords: ["mate","yerba","bombilla","tradición argentina"],
}

async function getItems(){
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,{cache:"no-cache"})
  if (response.ok) {
    return response.json();
  } else {
    console.log("Error en la respuesta:", response.status);
  }
}

export default async function Home() {
  const items = getItems()

  return (
    <main className="min-h-screen	flex flex-col justify-center items-center">
              <CategoriesShow/>
              <ItemList items={items}/>
    </main>
  )
}
