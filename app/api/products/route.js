import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextResponse } from "next/server";

export const GET = async () =>{
    try{
      const productosRef = collection(db, "products")
      const querySnapshot = await getDocs (productosRef)
      const docs = querySnapshot.docs. map (doc => doc.data())
      return NextResponse.json(docs)
    }
    catch(error){
        console.log(error)
    }
}


export const POST = async (request, params) => {
    try {
  
      return NextResponse.json("ok");
    } catch (error) {
      console.log(error);
    }
  };