'use Client'
import { useState } from "react";

const Counter = ({quantity, setQuantity}) => {
  
    const handleIncrement = () => {
      setQuantity(quantity+1)
    };
  
    const handleDecrement = () => {
      if (quantity > 0) {
        setQuantity(quantity-1)
      }
    };
  
    return (
      <div className="flex items-center -mt-5 justify-center">
        <button
          onClick={handleDecrement}
          className="bg-amber-400 px-3 py-1 rounded-md mr-2"
        >
          -
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="bg-amber-400 px-3 py-1 rounded-md ml-2"
        >
          +
        </button>
      </div>
    );
  };
  
  export default Counter;