'use Client'
import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
  
    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleDecrement = () => {
      if (count > 0) {
        setCount(count - 1);
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
        <span className="font-bold">{count}</span>
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