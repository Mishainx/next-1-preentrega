import EditForm from "@/app/components/adminPanel/EditForm"


async function fetchProduct(slug) {
  try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${slug}`, {
          cache: "no-store"
      });

      if (response.ok) {
          return await response.json();
      } else {
          console.error(`Error en la solicitud: ${response.status}`);
          return null;
      }
  } catch (error) {
      console.error('Error en la obtención del producto:', error);
      return null;
  }
}

export default async function EditProduct({params}) {
  try{

    const {slug} = params
    const item = await fetchProduct(slug)

  }
  catch(error){
    throw error
  }

  return (
    <section>
        <EditForm item={item}/>
    </section>
  )
}
