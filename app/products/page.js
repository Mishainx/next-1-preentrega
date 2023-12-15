import ItemList from "../components/products/ItemList"
export const generateMetadata = async () => {
  return {
      title: 'Catálogo',
      description: "Catálogo de mates"
    }
  }


export default async function Products() {

  const response = await fetch(`http:/localhost:3000/api/products`,
  {
    cache: "no-cache"
})
  const items = await response.json()

    return (
      <main className="">
        <section className="flex flex-col h-full">
            <ItemList items={items} />
        </section>
      </main>
    )
  }
  