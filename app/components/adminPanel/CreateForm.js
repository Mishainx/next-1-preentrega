
"use client"
import { useState } from "react";
import { getDownloadURL, uploadBytes,ref } from "firebase/storage";
import { storage } from "@/firebase/config";
import { toast } from "react-toastify";

const toastNotifySuccess = () => toast('Producto creado', { hideProgressBar: true, autoClose: 2000, type: 'success' })
const toastNotifyError = () => toast('Error al crear el producto', { hideProgressBar: true, autoClose: 2000, type: 'success' })

const CreateForm = () => {
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
    const image = await handleImage()


    const createProduct = await fetch("http://localhost:3000/api/products", {
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
      
      createProduct.status == 201?
      toastNotifySuccess()     
      :
      toastNotifyError()
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
