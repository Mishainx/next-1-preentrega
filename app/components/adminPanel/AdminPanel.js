"use client"
// components/AdminPanel.js
import React from 'react';
import Image from "next/image";
import editIcon from "@/public/assets/icons/edit-icon.svg";
import deleteIcon from "@/public/assets/icons/delete-icon.svg";
import Link from 'next/link';
import { useEffect,useState } from 'react';

import { toast } from "react-toastify";


const toastNotifySuccess = () => toast('Producto elimnado exitósamente', { hideProgressBar: true, autoClose: 2000, type: 'success' })
const toastNotifyError = () => toast('Error al eliminar el producto', { hideProgressBar: true, autoClose: 2000, type: 'success' })


const AdminPanel = async () => {

    const [products, setProducts] = useState([]);


    const handleDelete = async (slug) => {
      try {
        const response = await fetch(`https://${process.env.VERCEL_URL}/api/product/${slug}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          toastNotifySuccess();
          setProducts((prevProducts) => prevProducts.filter((product) => product.slug !== slug));

        } else {
          toastNotifyError();
          throw new Error(`Error al eliminar producto: ${response.status}`);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw new Error('Error interno del servidor');
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://${process.env.VERCEL_URL}/api/products`, { revalidate: 0 });
          if (response.ok) {
            const productsData = await response.json();
            setProducts(productsData);
          } else {
            throw new Error(`Error al obtener productos: ${response.status}`);
          }
        } catch (error) {
          console.error('Error al obtener productos:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="h-96 overflow-y-scroll max-w-full mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-4">Gestión de Productos</h2>
            <Link href="/admin/products/create">
                <button className="bg-green-500 text-white py-2 px-4 my-4 rounded mt-4  hover:scale-105 duration-300">
                    Agregar Producto
                </button>
            </Link>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Imagen</th>
                        <th className="border border-gray-300 p-2">Título del Producto</th>
                        <th className="border border-gray-300 p-2">Slug</th>
                        <th className="border border-gray-300 p-2">Precio</th>
                        <th className="border border-gray-300 p-2">Stock</th>
                        <th className="border border-gray-300 p-2">Categoría</th>
                        <th className="border border-gray-300 p-2"></th>
                        <th className="border border-gray-300 p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                <Image
                                    src={product.img}
                                    width={50}
                                    height={50}
                                    alt={`Miniatura de ${product.title}`}
                                    className="w-12 h-12 object-cover rounded m-auto"
                                />
                            </td>
                            <td className="border border-gray-300 p-2">{product.title}</td>
                            <td className="border border-gray-300 p-2">{product.slug}</td>
                            <td className="border border-gray-300 p-2">$ {product.price}</td>
                            <td className="border border-gray-300 p-2">{product.stock}</td>
                            <td className="border border-gray-300 p-2">{product.category}</td>
                            <td className="border border-gray-300 p-2">
                                <Link href={`/admin/product/${product.slug}`}>
                                    <Image
                                        alt="edit icon"
                                        src={editIcon}
                                        width={40}
                                        className="bg-amber-400  cursor-pointer rounded-full p-1 m-auto hover:scale-105 duration-200"
                                    />
                                </Link>
                            </td>
                            <td className="border border-gray-300 p-2">
                                <Image
                                    alt="delete icon"
                                    src={deleteIcon}
                                    width={40}
                                    onClick={()=>handleDelete(product.slug,setProducts)}
                                    className="bg-amber-400  cursor-pointer rounded-full p-1 m-auto hover:scale-105 duration-200 text-black"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;

