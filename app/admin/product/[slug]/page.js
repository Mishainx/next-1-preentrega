import EditForm from "@/app/components/adminPanel/EditForm"

export default async function EditProduct({params}) {
  try{

    const {slug} = params
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${slug}`,
    {
        cache:"no-store"
    })
    let item;
    response.status != 200?
    item = null
    :    
    item = await response.json()


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
