"use client"
import EditForm from "@/app/components/adminPanel/EditForm"

export default async function EditProduct({params}) {

  
    const {slug} = params
    const response = await fetch(`http://localhost:3000/api/product/${slug}`,
    {
        cache:"no-store"
    })
    let item;
    response.status != 200?
    item = null
    :    
    item = await response.json()

  return (
    <section>
        <EditForm item={item}/>
    </section>
  )
}
