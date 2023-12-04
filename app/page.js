import ItemList from "./components/products/ItemList";
import CategoriesShow from "./components/categories-show/CategoriesShow";

export const metadata ={
  title:"Mate y venga",
  description: "Tienda de mates",
  keywords: ["mate","yerba","bombilla","tradición argentina"],
  openGraph:{
    title:"Mate y venga",
    description: "Tienda de mates"
  }
}

export default async function Home() {
  const response = await fetch(`http:/localhost:3000/api/products`)
  const items = await response.json()
    
  return (
    <main className="min-h-screen	flex flex-col justify-center items-center">
              <CategoriesShow/>
              <ItemList items={items}/>
    </main>
  )
}
