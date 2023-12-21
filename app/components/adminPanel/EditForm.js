"use client"

import { useState } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { categoryValidate, priceValidate, stockValidate, titleValidate,descriptionValidate } from "@/src/utils";

const toastNotifyError = () => toast('Error al actualizar el producto', { hideProgressBar: true, autoClose: 2000, type: 'error' })
const toastNotifyErrorForm= (error) => toast( ` Error al actualizar el producto: ${error} inválido ` , { hideProgressBar: true, autoClose: 2000, type: 'error' })

const handleImage = async(slug, file) =>{
    const storageRef = ref(storage,slug)
    const fileSnapshot = await uploadBytes(storageRef,file)
    const fileUrl = await getDownloadURL(fileSnapshot.ref)
    return fileUrl
}

const EditForm = ({ item }) => {
    const { title, description, stock, price, category, img } = item;
    const [values, setValues] = useState({ title, description, stock, price, category, img });
    const [file, setFile] = useState(null);
    const router = useRouter()

    const fieldsToValidate = [
        { name: "title", validator: titleValidate, errorMessage: "title" },
        { name: "price", validator: priceValidate, errorMessage: "price inválido" },
        { name: "stock", validator: stockValidate, errorMessage: "stock" },
        { name: "category", validator: categoryValidate, errorMessage: "category" },
        { name: "description", validator: descriptionValidate, errorMessage: "description" },
      ];

    
const updateProduct = async (slug, values,file,img) => {

    const updateFetch = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${slug}`, { 
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            title: values.title,
            description: values.description,
            stock: Number(values.stock),
            price: Number(values.price),
            category: values.category,
            img: file?await handleImage(slug,file):values.img
          }),
    });
    if(updateFetch.status == 200){
        Swal.fire({
            title: "Producto Actualizado!",
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

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const field of fieldsToValidate) {
            const isValid = field.validator(values[field.name]);
            if (!isValid) {
              toastNotifyErrorForm(field.errorMessage);
              return;
            }
          }

        await updateProduct(item.slug, values,file, img);
    };

    return (
        <div className="container mx-auto mt-6 max-w-lg">
            <form onSubmit={handleSubmit} className="my-12 bg-white p-2 rounded shadow-md">
                <div className="mb-2">
                    <label className="block text-xs font-bold mb-1">Nombre:</label>
                    <input
                        type="text"
                        value={values.title}
                        required
                        className="p-2 rounded w-full border border-blue-100 block my-4"
                        name="title"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-xs font-bold mb-1">Imagen:</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="p-2 rounded w-full border border-blue-100 block my-4"
                        name="file"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-xs font-bold mb-1">Precio:</label>
                    <input
                        type="number"
                        value={values.price}
                        required
                        className="p-2 rounded w-full border border-blue-100 block my-4"
                        name="price"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-xs font-bold mb-1">Stock:</label>
                    <input
                        type="number"
                        value={values.stock}
                        required
                        className="p-2 rounded w-full border border-blue-100 block my-4"
                        name="stock"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-xs font-bold mb-1">Categoría:</label>
                    <input
                        type="text"
                        value={values.category}
                        required
                        className="p-2 rounded w-full border border-blue-100 block my-4"
                        name="category"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-xs font-bold mb-1">Descripción:</label>
                    <textarea
                        value={values.description}
                        className="resize-none w-full h-24 p-2 rounded border block border-blue-100 my-4"
                        name="description"
                        onChange={handleChange}
                    />
                </div>

                <button className="bg-amber-400 text-white p-1 rounded hover:bg-amber-500 text-xs">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default EditForm;