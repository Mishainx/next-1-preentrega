
"use client"
import { useState } from "react";
import { getDownloadURL, uploadBytes,ref } from "firebase/storage";
import { storage } from "@/firebase/config";
import { toast } from "react-toastify";
import { categoryValidate, priceValidate, slugValidate, stockValidate, titleValidate,descriptionValidate } from "@/src/utils";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


const CreateForm = () => {
  const router = useRouter()
  const toastNotifyError = () => toast('Error al crear el producto', { hideProgressBar: true, autoClose: 2000, type: 'success' })
  const toastNotifyErrorForm= (error) => toast( ` Error al crear el producto: ${error} inválido ` , { hideProgressBar: true, autoClose: 2000, type: 'success' })
  const [values, setValues] = useState({
    title: "",
    description: "",
    inStock: 0,
    price: 0,
    type: "",
    slug: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = async() =>{
    const storageRef = ref(storage,values.slug)
    const fileSnapshot = await uploadBytes(storageRef,file)
    const fileUrl = await getDownloadURL(fileSnapshot.ref)
    return fileUrl
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = [
      { name: "title", validator: titleValidate, errorMessage: "title" },
      { name: "slug", validator: slugValidate, errorMessage: "slug" },
      { name: "price", validator: priceValidate, errorMessage: "price inválido" },
      { name: "inStock", validator: stockValidate, errorMessage: "stock" },
      { name: "type", validator: categoryValidate, errorMessage: "category" },
      { name: "description", validator: descriptionValidate, errorMessage: "description" },
    ];
    
    for (const field of fieldsToValidate) {
      const isValid = field.validator(values[field.name]);
      if (!isValid) {
        toastNotifyErrorForm(field.errorMessage);
        return;
      }
    }

    const image = await handleImage()

    const createProduct = await fetch( `http://${process.env.VERCEL_URL}/api/products `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          stock: values.inStock,
          price: values.price,
          category: values.type,
          slug: values.slug,
          img: image
        }),
      });
      
      if(createProduct.status == 201){
        Swal.fire({
          title: "Producto Creado!",
          confirmButtonText: 'ok',
        }).then((result)=>{
          if (result.isConfirmed) {
            router.push("/admin");
          }
        })

      }
      else{
        toastNotifyError()
      }
};

  return (
    <div className="container mx-auto mt-6 max-w-md">
      <form onSubmit={handleSubmit} className="my-4 bg-white p-2 rounded shadow-md">
        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Slug:</label>
          <input
            type="text"
            value={values.slug}
            required
            className="p-1 rounded w-full border border-blue-100 text-xs"
            name="slug"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Imagen:</label>
          <input
            type="file"
            required
            allowMultiple={false}
            onChange={(e) => setFile(e.target.files[0])}
            className="p-1 rounded w-full border border-blue-100 text-xs"
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Nombre:</label>
          <input
            type="text"
            value={values.title}
            required
            className="p-1 rounded w-full border border-blue-100 text-xs"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Precio:</label>
          <input
            type="number"
            value={values.price}
            required
            className="p-1 rounded w-full border border-blue-100 text-xs"
            name="price"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Stock:</label>
          <input
            type="number"
            value={values.inStock}
            required
            className="p-1 rounded w-full border border-blue-100 text-xs"
            name="inStock"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Categoría:</label>
          <input
            type="text"
            value={values.type}
            required
            className="p-1 rounded w-full border border-blue-100 text-xs"
            name="type"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold mb-1">Descripción:</label>
          <textarea
            value={values.description}
            className="resize-none w-full h-16 p-1 rounded border border-blue-100 text-xs"
            name="description"
            onChange={handleChange}
          />
        </div>

        <button  className="bg-amber-400 text-white p-1 rounded hover:bg-amber-500 text-xs">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
