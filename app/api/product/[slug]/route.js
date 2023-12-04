import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export const GET = async (request,{params}) =>{
    try{
        const {slug} = params

        const productRef = doc(db, "products", slug);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
            const data = productSnapshot.data();
            return NextResponse.json(data,{status:200});
          } else {
            return NextResponse.json("Producto no encontrado.", { status: 404 });
          }
    }
    catch(error){
        return NextResponse.error("Error al obtener producto.", { status: 500 })
    }
}
