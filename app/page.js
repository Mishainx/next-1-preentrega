import ItemListContainer from "./components/products/ItemListContainer";
import Button from "./components/ui/Button";

export const metadata ={
  title:"Mate y venga",
  description: "Tienda de mates",
  keywords: ["mate","yerba","bombilla","tradición argentina"],
  openGraph:{
    title:"Mate y venga",
    description: "Tienda de mates"
  }
}

export default function Home() {
  return (
    <main className="">
            <ItemListContainer/>
            <Button/>
    </main>
  )
}
