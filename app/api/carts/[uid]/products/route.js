import { doc, getDoc,setDoc,deleteDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export const POST = async (request, { params }) => {
  try {
    const { uid } = params;
    const { product, quantity } = await request.json();

    const cartRef = doc(db, 'carts', uid);
    const productRef = doc(db, 'products', product);


    const [cartSnapshot, productSnapshot] = await Promise.all([
      getDoc(cartRef),
      getDoc(productRef),
    ]);

    const cartData = cartSnapshot.data();
    const productData = productSnapshot.data();

    if (!cartData) {
      return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 });
    }

    if (!productData) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    // Comprobar si hay suficiente stock para la cantidad solicitada
    if (productData.stock < quantity) {
      return NextResponse.json({ message: 'Stock insuficiente' }, { status: 400 });
    }

    let updatedCart; 

    const existingProductIndex = cartData.items.findIndex((item) => item.product === product);


    if (existingProductIndex !== -1) {
      // Verificar el stock disponible para el producto específico
      if (productData.stock < updatedCart.items[existingProductIndex].quantity + quantity) {
        return NextResponse.json(
          { message: `La cantidad total de ${productData.name} en el carrito supera el stock disponible` },
          { status: 400 }
        );
      }

      updatedCart = {
        ...cartData,
        items: cartData.items.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        }),
      };
    } else {
      // Verificar el stock disponible para el nuevo producto
      if (productData.stock < quantity) {
        return NextResponse.json(
          { message: `La cantidad total de ${productData.name} en el carrito supera el stock disponible` },
          { status: 400 }
        );
      }


      updatedCart = {
        ...cartData,
        items: [...cartData.items, { product, quantity }],
      };
    }

    if (1==1) {
      return NextResponse.json({ message: "hasta acá" }, { status: 404 });
    }

    await setDoc(cartRef, updatedCart);

    return NextResponse.json(
      { message: 'Elemento agregado al carrito', updatedCart: updatedCart },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error interno del servidor', error }, { status: 500 });
  }
};

  export const DELETE = async (request, { params }) => {
    try {
      const { uid } = params;
      const { productSlug } = await request.json();

      const cartRef = doc(db, "carts", uid);
      const cartSnapshot = await getDoc(cartRef);
  
      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        const updatedItems = cartData.items.filter((item) => item.product !== productSlug);
  
        const updatedCart = {
          ...cartData,
          items: updatedItems,
        };
  
        await setDoc(cartRef, updatedCart);
  
        return NextResponse.json({ message: "Producto eliminado correctamente del carrito" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Carrito no encontrado" }, { status: 404 });
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
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