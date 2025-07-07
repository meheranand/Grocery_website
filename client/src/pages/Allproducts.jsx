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
    <div className="mt-16 px-30 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-3xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-green-500 rounded-full"></div>
      </div>
      <div className="grid grid-cols-5 gap-8 mt-8">
        {filter.map((p) => (
          <Productcard product={p}></Productcard>
        ))}
      </div>
    </div>
  );
}

export default Allproducts