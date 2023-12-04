import Image from "next/image";
import deleteIcon from "@/public/assets/icons/delete-icon.svg";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";


const CartView = ({cart,removeFromCart}) => {

  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, cartItem) =>
        total + calculateSubtotal(cartItem.quantity, cartItem.product.price),
      0
    );
  };

  const handleDelete = (slug) =>{
    removeFromCart(slug)
  }

  const toastNotify = () => toast('Compra finalizada', { hideProgressBar: true, autoClose: 2000, type: 'success' })


  return (
    <div className="w-full">
      <h2 className="w-full bg-amber-400 font-bold text-white text-center text-xs">
        Carrito de Compras
      </h2>
      <table className="w-full bg-white border border-gray-300 overflow-y-scroll text-center text-xs">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Miniatura</th>
            <th className="border border-gray-300 p-2">Nombre del Producto</th>
            <th className="border border-gray-300 p-2">Slug</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Cantidad</th>
            <th className="border border-gray-300 p-2">Subtotal</th>
            <th className="border border-gray-300 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <Image
                  width={50}
                  height={60}
                  src={cartItem.product.img}
                  alt={`Miniatura de ${cartItem.product.title}`}
                  className="w-12 h-12 object-cover rounded m-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">
                {cartItem.product.title}
              </td>
              <td className="border border-gray-300 p-2">
                {cartItem.product.slug}
              </td>
              <td className="border border-gray-300 p-2">
                $ {cartItem.product.price}
              </td>
              <td className="border border-gray-300 p-2">{cartItem.quantity}</td>
              <td className="border border-gray-300 p-2">
                $ {calculateSubtotal(cartItem.quantity, cartItem.product.price)}
              </td>
              <td className="border border-gray-300 p-2">
                <Image
                alt="delete icon"
                  src={deleteIcon}
                  width={40}
                  className="bg-amber-400 rounded-full p-1 m-auto"
                  onClick={()=>handleDelete(cartItem.product.slug)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4 p-4">
        <div className="text-xl font-bold">
          Total: $ {calculateTotal()}
        </div>
        <button
        className="bg-amber-400 text-white py-1 px-3 rounded ml-4"
        onClick={()=>toastNotify()}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartView;
