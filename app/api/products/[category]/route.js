import { NextResponse } from "next/server";
import { collection,getDocs, query, where} from "firebase/firestore";
import { db } from "@/firebase/config";


export const GET = async (request,{params}) =>{
    try{
        const {category} = params
        let querySnapshot

        if (category.toLowerCase() === 'all') {
            // Si category es "all", traer toda la colección
            const productsRef = collection(db, 'products');
            querySnapshot = await getDocs(productsRef);
          } else {
            // Si category no es "all", filtrar por la categoría especificada
            const productsRef = collection(db, 'products');
            querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
          }   
        const docs = querySnapshot.docs.map(doc=>doc.data())
        return NextResponse.json(docs)
    }
    catch(error){
        console.log(error)
    }
}