"use client"

import { createContext,useContext } from "react"
import { useState } from "react"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([])

    const addToCart = (item) =>{
        setCart([...cart,item])
    }

    const updateCartQuantity = (productSlug, newQuantity) => {
        setCart((prevCart) => {
          return prevCart.map((item) => {
            if (item.product.slug === productSlug) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
        });
      };

      const isInCart = async(slug) => {
        return cart.find((item) => item.product.slug === slug);
      };
    
    const removeFromCart = (productSlug) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.slug !== slug));
    };

    return(
        <CartContext.Provider
        value={{addToCart,updateCartQuantity,cart,isInCart,removeFromCart}}
        >
            {children}
        </CartContext.Provider>
    )

}