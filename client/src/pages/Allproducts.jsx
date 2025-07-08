import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontext';
import Productcard from '../components/productcard';

const Allproducts = () => {
  const {product,search}=useAppContext()
  const [filter,setfilter]=useState([])
  useEffect(()=>{
    if(search.length>0){
      setfilter(product.filter(product=>product.name.toLowerCase().includes(search.toLowerCase())))
    }
    else{
      setfilter(product)
    }
  },[product,search])
  return (
    <div className="mt-16 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-30 flex flex-col">
      {/* Title and underline */}
      <div className="flex flex-col items-center sm:items-end w-full sm:w-max">
        <p className="text-2xl sm:text-3xl font-medium uppercase text-center sm:text-right">
          All products
        </p>
        <div className="w-16 h-0.5 bg-green-500 rounded-full mt-1" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mt-8 justify-items-center">
        {filter.map((p) => (
          <Productcard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Allproducts