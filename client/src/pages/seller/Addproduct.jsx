import React, { useState } from 'react'
import { assets } from './../../assets/assets';
import { toast } from 'react-hot-toast';
import axios from 'axios'

const Addproduct = () => {
  const [files,setfiles]=useState([])
  const [name,setname]=useState('')
  const [description,setdescription]=useState('')
  const [category,setcategory]=useState('')
  const [price,setprice]=useState('')
  const [offerprice,setofferprice]=useState('')

  const handlesubmit=async(e)=>{
    try {
      e.preventDefault();
      const productdata={
        name:name,
        description:description.split('\n'),
        category:category,
        price:price,
        offerprice:offerprice
      }

      const formdata=new FormData()
      formdata.append('productdata',JSON.stringify(productdata))
      for(let i=0;i<files.length;i++){
        formdata.append('images',files[i])
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
        formdata,
        { withCredentials: true }
      );
      if(data.success){
        toast.success(data.msg)
        setname('')
        setdescription('')
        setcategory('')
        setprice('')
        setofferprice('')
        setfiles([])
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className="py-0 flex flex-col justify-between bg-white">
      <form onSubmit={handlesubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const updatedfiles = [...files];
                      updatedfiles[index] = e.target.files[0];
                      setfiles(updatedfiles);
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            onChange={(e) => setdescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {[
              { name: "Organic veggies" },
              { name: "Fresh Fruits" },
              { name: "Cold Drinks" },
              { name: "Instant Food" },
              { name: "Dairy Products" },
              { name: "Bakery & Breads" },
              { name: "Grains & Cereals" },
            ].map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setprice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setofferprice(e.target.value)}
              value={offerprice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <button className="cursor-pointer px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Addproduct