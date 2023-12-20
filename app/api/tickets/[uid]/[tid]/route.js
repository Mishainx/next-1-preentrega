import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export const GET = async (request, { params }) => {
  try {
    const { uid, tid } = params;

    // Verificar la existencia del ticket
    const ticketRef = doc(db, "tickets", tid);
    const ticketDoc = await getDoc(ticketRef);

    if (!ticketDoc.exists()) {
      return NextResponse.json({ message: 'El ticket no existe' }, { status: 404 });
    }

    // Verificar si el ticket pertenece al usuario
    if (ticketDoc.data().user !== uid) {
      return NextResponse.json({ message: 'Acceso no autorizado al ticket' }, { status: 403 });
    }

    // Devolver la información del ticket
    const ticketData = {
      id: ticketDoc.id,
      items: ticketDoc.data().items,
      total: ticketDoc.data().total,
      user: ticketDoc.data().user,
      date: ticketDoc.data().date.toDate(), // Convertir a formato de fecha JavaScript
    };

    return NextResponse.json({ ticket: ticketData }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el ticket:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
};