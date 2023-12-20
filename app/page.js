import ItemList from "./components/products/ItemList";
import CategoriesShow from "./components/categories-show/CategoriesShow";

export const metadata ={
  title:"Mate y venga",
  description: "Tienda de mates",
  keywords: ["mate","yerba","bombilla","tradición argentina"],
}

export default async function Home() {
  const response = await fetch(`https:/${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`,{cache:"no-cache"})
  const items = await response.json()
    
  return (
    <main className="min-h-screen	flex flex-col justify-center items-center">
              <CategoriesShow/>
              <ItemList items={items}/>
    </main>
  )
}
