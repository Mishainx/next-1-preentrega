import { doc, getDoc,deleteDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export const GET = async (request,{params}) =>{
    try{
        const {uid} = params

        const cartRef = doc(db, "carts", uid);
        const cartSnapshot = await getDoc(cartRef);
        if (cartSnapshot.exists()) {
            const data = cartSnapshot.data();
            return NextResponse.json(data,{status:200});
          } else {
            return NextResponse.json("Carrito no encontrado.", { status: 404 });
          }
    }
    catch(error){
        return NextResponse.error("Error al obtener producto.", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
  try {
    const { uid } = params;

    const cartRef = doc(db, 'carts', uid);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      // Actualizamos el campo "items" del documento a un array vacío
      await updateDoc(cartRef, { items: [] });

      return NextResponse.json({ message: 'Carrito vaciado correctamente' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const PUT = async (request,{params}) =>{
  try{
    const {slug} = params
    const body = await request.json()


      const productRef = doc(db, "products", slug);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
          await updateDoc(productRef,{
            title: body.title,
            description: body.description,
            stock: Number(body.stock),
            price: Number(body.price),
            category: body.category,
            img: body.img
          });
          return NextResponse.json({message:"producto actualizado correctamente"},{status:200});
        } else {
          return NextResponse.json({message:"producto no encontrado"},{status:404});
  }
}
  catch(error){
    return NextResponse.json({message:error},{status:500});
  }
}