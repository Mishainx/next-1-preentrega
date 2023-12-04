import editIcon from "@/public/assets/icons/edit-icon.svg"
import deleteIcon from "@/public/assets/icons/delete-icon.svg"
import Image from "next/image"

const AdminProducts = () => {

    const products = mockData

    return (
        <div>
        <h2 className="w-full bg-amber-400  font-bold text-white text-center text-xs ">Listado de productos</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Miniatura</th>
              <th className="border border-gray-300 p-2">Nombre del Producto</th>
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
                    <Image
                    alt="edit icon"
                    src={editIcon}
                    width={40}
                    className="bg-amber-400 rounded-full p-1 m-auto"
                    >
                    </Image>

                </td>
                <td className="border border-gray-300 p-2">
                  <Image
                    alt="delete icon"
                    src={deleteIcon}
                    width={40}
                    className="bg-amber-400 rounded-full p-1 m-auto"
                    >
                    </Image>                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default AdminProducts