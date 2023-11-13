import CartPanel from "../components/cart/cartPanel"

export const metadata ={
  title:"Mis compras",
  description: "Carrito de compras"
  }

export default function Cart() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <CartPanel/>
    </main>
  )
}
