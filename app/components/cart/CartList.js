import Image from "next/image";
import deleteIcon from "@/public/assets/icons/delete-icon.svg";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'


const CartView = ({ cart, getTicket,removeFromCart,buyCart }) => {

  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, cartItem) =>
        total + calculateSubtotal(cartItem.quantity, cartItem.price),
      0
    );
  };

  const handleBuy = async () => {
    try {
      const response = await buyCart();
      const responseData = await response.json();
      const ticketId = responseData.ticketId
      const ticketData = await getTicket(ticketId)

      if (response.status === 200) {
        // La compra fue exitosa
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Compra finalizada con éxito",
          showConfirmButton: true,
          html: `ID del Ticket: ${ticketData.ticket.id}<br>
               Usuario: ${ticketData.ticket.user}<br>
               Fecha: ${new Date(ticketData.ticket.date).toLocaleString()}<br>
               Detalles del artículo: ${ticketData.ticket.items.map(item => `<br>${item.quantity} x ${item.slug} - $${item.subtotal}`).join('')}<br>
               Total: $${ticketData.ticket.total}`,
          confirmButtonText: "Ok",
        });;
      } else if (response.status === 400) {
        // Manejar el caso de productos con stock insuficiente
        
        toast.error(`Error: ${responseData.message}`, {
          hideProgressBar: true,
          autoClose: 5000,
        });
      } else {
        // Manejar otros casos de error
        toast.error(`${responseData.message}`, {
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Error al comprar el carrito:', error);
      // Manejar cualquier otro error que pueda ocurrir durante la compra
      toast.error('Error en la compra', {
        hideProgressBar: true,
        autoClose: 5000,
      });
    }
  };

  const handleDelete = (slug) => {
    removeFromCart(slug);
  };




  return (
      <div className="w-full">
      <h2 className="w-full bg-amber-400 font-bold text-white text-center text-xs">
        Carrito de Compras
      </h2>
      <table className="w-full bg-white border border-gray-300 overflow-y-scroll text-center text-xs">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Miniatura</th>
            <th className="border border-gray-300 p-2">Slug</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Cantidad</th>
            <th className="border border-gray-300 p-2">Subtotal</th>
            <th className="border border-gray-300 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {cart && cart?.length > 0 ? (
            cart.map((cartItem, index) => (
              <tr key={index} className="hover:bg-amber-200">
                <td className="border border-gray-300 p-2">
                  <Image
                    width={50}
                    height={60}
                    src={cartItem.img}
                    alt={`Miniatura de ${cartItem.title}`}
                    className="w-12 h-12 object-cover rounded m-auto"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {cartItem.slug}
                </td>
                <td className="border border-gray-300 p-2">
                  $ {cartItem.price}
                </td>
                <td className="border border-gray-300 p-2">
                  {cartItem.quantity}
                </td>
                <td className="border border-gray-300 p-2">
                  $ {calculateSubtotal(cartItem.quantity, cartItem.price)}
                </td>
                <td className="border border-gray-300 p-2">
                  <Image
                    alt="delete icon"
                    src={deleteIcon}
                    width={40}
                    className="bg-amber-400 rounded-full p-1 m-auto hover:scale-105 duration-200 hover:text-gray-500 cursor-pointer"
                    onClick={() => handleDelete(cartItem.slug)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 p-4">
                El carrito se encuentra vacío
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {cart && cart?.length > 0 && (
        <div className="flex justify-end items-center mt-4 p-4">
          <div className="text-xl font-bold">Total: $ {calculateTotal()}</div>
          <button
            className="bg-amber-400 text-white py-1 px-3 rounded ml-4 hover:scale-105 duration-200 hover:text-gray-500"
            onClick={() => handleBuy()}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
