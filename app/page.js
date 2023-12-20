import { useEffect, useState } from 'react';
import ItemList from "./components/products/ItemList";
import CategoriesShow from "./components/categories-show/CategoriesShow";

export const metadata = {
  title: "Mate y venga",
  description: "Tienda de mates",
  keywords: ["mate", "yerba", "bombilla", "tradición argentina"],
};

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`, { cache: "no-cache" });
      
      if (response.ok) {
        const fetchedItems = await response.json();
        setItems(fetchedItems);
      } else {
        console.error("Error en la respuesta:", response.status);
        // Manejar el error aquí
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen	flex flex-col justify-center items-center">
      <CategoriesShow />
      <ItemList items={items} />
    </main>
  );
}
