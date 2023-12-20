"use client"

import Image from 'next/image';
import userImage from '@/public/assets/icons/user-icon.svg';
import CartList from './CartList';
import TicketList from './TicketList';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';

const CartPanel = async() => {
  const { cart, buyCart, getTicket, removeFromCart } = useCartContext();
  const { user, userFind } = useAuthContext();
  const [showTickets, setShowTickets] = useState(false);

  const userData = await userFind(user.uid);

  return (
    <section className="w-full flex flex-col border-2 border-amber-400">
      <div className="w-full flex flex-row justify-end p-2">
        <button className="bg-amber-400 text-white py-1 px-3 rounded hover:scale-105 duration-200 hover:text-gray-500" onClick={() => setShowTickets(!showTickets)}>
        {showTickets ? 'Ver Carrito' : 'Ver Tickets'}
        </button>
      </div>
      <div className="w-full flex flex-row border-2 border-amber-400">
        <div className="w-44 flex flex-col justify-center items-center  border-r-2 border-amber-400">
          <Image alt="user icon" src={userImage} width={90} height={90} />
          <p>
            {userData.name} {userData.surname}
          </p>
          <p>{userData.email}</p>
          <p>{userData.telephone}</p>
        </div>
          <div className="w-full flex flex-col justify-center items-center border-amber-400">
            {showTickets ? <TicketList /> : <CartList cart={cart.items} removeFromCart={removeFromCart} buyCart={buyCart} getTicket={getTicket} />}
          </div>
      </div>
    </section>
  );
};

export default CartPanel;
