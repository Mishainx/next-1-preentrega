import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Counter = ({ quantity, setQuantity, stock }) => {
  const handleIncrement = () => {
    // Verificar si la cantidad ya es igual al stock disponible
    if (quantity < stock) {
      setQuantity(quantity + 1);
    } else {
      // Mostrar toast cuando se alcanza el tope del stock
      toast.warning("¡Alcanzaste el tope del stock disponible en el carrito!", {
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center -mt-5 justify-center">
      <button
        onClick={handleDecrement}
        className="bg-amber-400 px-3 py-1 rounded-md mr-2 hover:text-white"
      >
        -
      </button>
      <span className="font-bold">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="bg-amber-400 px-3 py-1 rounded-md ml-2 hover:text-white"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
