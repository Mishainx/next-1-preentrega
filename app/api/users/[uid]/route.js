import { getDoc,doc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export const GET = async (request,{params}) =>{
    try{
      const {uid} = params

      const userRef = doc(db, "users",uid)
      const querySnapshot = await getDoc (userRef)
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        return NextResponse.json(data,{status:200});
      } else {
        return NextResponse.json("Usuario no encontrado.", { status: 404 });
      }
}
    catch(error){
        console.log(error)
    }
}