import { collection, getDocs,doc,setDoc } from "firebase/firestore";
import { db} from "@/firebase/config";
import { NextResponse } from "next/server";
import { auth } from "@/firebase/config"
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export const GET = async () =>{
    try{
      const productosRef = collection(db, "users")
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
      const {values} = await request.json()
      
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
    const userUid = userCredential.user.uid
    if(userCredential?.user?.email == values.email){
        delete values.password
        values.cart=userUid
        values.tickets=userUid
        values.role= values.email === "admin@mateyvenga.com"? "admin":"usuario"
        const docRefUser = doc(db,"users", userUid)
        await setDoc(docRefUser,{...values}).then(()=>console.log("Usuario creado"))
      
        const docRefCart = doc(db,"carts", userUid)
        await setDoc(docRefCart, { items: [] });

      return NextResponse.json({message:"usuario creado"},{status:201});
    }
    else{
        return NextResponse.json({message:"no se creo el usuario"},{status:400});

    }

    } catch (error) {
      console.log(error);
      throw error
    }
};