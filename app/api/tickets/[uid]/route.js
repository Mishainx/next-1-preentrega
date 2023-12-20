import { doc, getDoc,getDocs, addDoc,query,where, collection, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";


export const GET = async (request, { params }) => {
  try {
    const { uid } = params;
    const ticketsRef = collection(db, 'tickets');
    const querySnapshot = await getDocs(query(ticketsRef, where('user', '==', uid)));

    if (!querySnapshot.empty) {
      const ticketsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Formatear la fecha en cada ticket
        const formattedDate = new Date(data.date.seconds * 1000).toLocaleString();
        return { id: doc.id, ...data, date: formattedDate };
      });

      return NextResponse.json(ticketsData, { status: 200 });
    } else {
      return NextResponse.json("No se encontraron tickets para el usuario especificado.", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error al obtener tickets.", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  try {
    const { uid } = params;
    const cartData = await request.json();

    // Verificar la existencia del carrito
    const cartRef = doc(db, "carts", uid);
    const cartDoc = await getDoc(cartRef);

    if (!cartDoc.exists()) {
      return NextResponse.json({ message: 'El carrito no existe' }, { status: 404 });
    }

    // Verificar stock de cada producto en el carrito
    const productsCollectionRef = collection(db, "products");
    const itemsWithInsufficientStock = [];

    for (const item of cartData.items) {
      const productDocRef = doc(productsCollectionRef, item.slug);
      const productDoc = await getDoc(productDocRef);

      if (!productDoc.exists() || productDoc.data().stock < item.quantity) {
        itemsWithInsufficientStock.push(item.slug);
      }
    }
    
    if (itemsWithInsufficientStock.length > 0) {
      return NextResponse.json({
        message: `Stock insuficiente para los productos: ${itemsWithInsufficientStock.join(', ')}`,
      }, { status: 400 });
    }

    // Calcular el total del carrito
    const cartTotal = cartData.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Crear el ticket en la colección "tickets"
    const ticketCollectionRef = collection(db, "tickets");
    const ticketData = {
      items: cartData.items.map(item => ({
        slug: item.slug,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      total: cartTotal,
      user: uid,
      date: new Date(),
    };

    const newTicketRef = await addDoc(ticketCollectionRef, ticketData);

    for (const item of cartData.items) {
      const productDocRef = doc(productsCollectionRef, item.slug);
      const productDoc = await getDoc(productDocRef);
    
      if (productDoc.exists()) {
        const currentStock = productDoc.data().stock;
        const newStock = Math.max(currentStock - item.quantity, 0);
    
        await updateDoc(productDocRef, {
          stock: newStock,
        });
      } else {
        console.warn(`Product not found: ${item.slug}`);
      }
    }

    return NextResponse.json(
      { message: 'Ticket creado con éxito', ticketId: newTicketRef.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al agregar elemento al carrito:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
};
