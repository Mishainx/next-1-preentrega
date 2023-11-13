import { mockData } from "@/data/products"
import ItemList from "../components/products/ItemList"

export const generateMetadata = async () => {
  return {
      title: 'Catálogo',
      description: "Catálogo de mates"
  }
}

export default function Catalog({params}) {

  const {category} = params
  const items = category === 'all'? mockData: mockData.filter(product => product.category === category)

    return (
      <main className="">
        <section className="flex flex-col">
          <ItemList category={items} />
        </section>
      </main>
    )
  }
  