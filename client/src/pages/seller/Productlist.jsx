import React, { useEffect } from 'react'
import { useAppContext } from './../../context/Appcontext';
import { useNavigate } from 'react-router-dom';
import Updateproduct from './updateproduct';
import axios from 'axios';
import toast from 'react-hot-toast';

const Productlist = () => {
    const {product,fetchproducts,navigate}=useAppContext()

    const togglestock=async(id,instock)=>{
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/stock`,
          { id, instock },
          { withCredentials: true }
        );
        if(data.success){
          fetchproducts()
          toast.success(data.msg)
        }
        else{
          toast.error(data.msg)
        }
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      fetchproducts()
    })
  return (
    <div className="py-10 flex flex-col no-scrollbar h-[95vh] overflow-y-scroll justify-between w-full">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {product.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    ${product.offerprice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onClick={()=>togglestock(product._id,!product.instock)}
                        defaultChecked={product.instock}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td><button onClick={()=>navigate(`/seller/updateproduct/${product._id}`)} className='btn btn bg-green-400 p-2 rounded text-black cursor-pointer'>Update</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productlist