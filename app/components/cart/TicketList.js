import { useEffect, useState } from 'react';
import { useCartContext } from "../context/CartContext";

const TicketList = () => {
  const { getUserTicket } = useCartContext();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getUserTicket();
        setTickets(response);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [getUserTicket]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr className="bg-amber-400">
            <th className="p-2">Ticket ID</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Items</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-amber-200">
              <td className="p-2">{ticket.id}</td>
              <td className="p-2">{ticket.date}</td>
              <td className="p-2">
                <ul className="pl-4">
                  {ticket.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity} x {item.slug} - ${item.subtotal}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2">$ {ticket.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;