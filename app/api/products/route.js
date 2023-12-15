import { collection, getDocs,doc,setDoc } from "firebase/firestore";
import { db} from "@/firebase/config";
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


export const POST = async (request) => {
    try {
      const values = await request.json()
      const docRef = doc(db,"products", values.slug)
      setDoc(docRef,{...values}).then(()=>console.log("producto agregado"))
      
      return NextResponse.json({message:"producto agregado"},{status:201});
    } catch (error) {
      console.log(error);
      throw error
    }
};