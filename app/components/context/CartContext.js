"use client"

import { createContext,useContext } from "react"
import { useState, useEffect } from "react"
import { useAuthContext } from "./AuthContext"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) =>{
    const {user} = useAuthContext()
    const [cart,setCart] = useState([])

    const getCart = async (id) => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/carts/${id}`,{cache: "no-cache"});
        const userCart = await response.json();
    
        if (userCart.items && userCart.items.length > 0) {
          const productPromises = userCart.items.map(async (cartItem) => {
            const productResponse = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${cartItem.product}`);
            const productData = await productResponse.json();
            return {
              ...productData, 
              quantity: cartItem.quantity, 
            };
          });
    
          const productsWithDetails = await Promise.all(productPromises);
    
          setCart({ items: productsWithDetails }); 
        } else {
          
          setCart({ items: [] }); 
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart({ items: [] }); 
      }
    };

    const isInCart = async (productSlug) => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/carts/${user.uid}`);
        const userCart = await response.json();

  
        if (userCart.items && userCart.items.length > 0) {
          const foundProduct = userCart.items.find((cartItem) => cartItem.product === productSlug);
          return foundProduct || null;
        }
  
        return null;
      } catch (error) {
        console.error('Error checking if product is in cart:', error);
        return null;
      }
    };
    

    const addToCart = async (uid,slug,quantity) =>{
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/carts/${user.uid}/products`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          product:slug,
          quantity:quantity
        })
      })
      const data = await response.json();
      console.log(await data);
      getCart(user.uid)
}

    
    const removeFromCart = async(productSlug) => {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/carts/${user.uid}/products`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          productSlug
        })
      })
      getCart(user.uid)
    };

    const buyCart = async () => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tickets/${user.uid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...cart,
          }),
        });
    
        if (response.status === 200) {
          // Realizamos la solicitud DELETE para vaciar el carrito
          const deleteResponse = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/carts/${user.uid}`, {
            method: 'DELETE',
          });
    
          if (deleteResponse.status === 200) {
            // Si la eliminación del carrito fue exitosa, actualizamos el estado del carrito
            await getCart(user.uid);
          }
          return response; // Devolvemos la respuesta de la solicitud POST de tickets
        }
      } catch (error) {
        console.error('Error en la función buyCart:', error);
        return { status: 500, message: 'Error interno del servidor' };
      }
    };

    const getTicket= async(tid) =>{
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tickets/${user.uid}/${tid}`)
      const ticketData = response.json()
      return ticketData
    }
    
    const getUserTicket= async() =>{
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tickets/${user.uid}`)
      const ticketsData = await response.json()
      return ticketsData
    }

    useEffect(() => {
      if (user) {
        getCart(user.uid);
      } else {
        setCart([]);
      }
    }, [user]);

    return(
        <CartContext.Provider
        value={{getCart,getTicket,isInCart,getUserTicket, addToCart,cart,removeFromCart, buyCart}}
        >
            {children}
        </CartContext.Provider>
    )

}