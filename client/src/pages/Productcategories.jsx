import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'
import { categories } from '../assets/assets'
import Productcard from '../components/productcard'

const Productcategories = () => {
    const {category}=useParams()
    const {product}=useAppContext()
    const searchcategory=categories.find((val)=>(
        val.path===category
    ))
    const filter=product.filter((val)=>(
        val.category===searchcategory.text
    ))
    console.log(searchcategory)
  return (
    <div className="mt-16 px-30 flex flex-col">
      {searchcategory && (
          <div className="flex flex-col items-end w-max">
            <p className="text-3xl font-medium uppercase">
              {searchcategory.text.toUpperCase()}
            </p>
            <div className="w-16 h-0.5 bg-green-500 rounded-full"></div>
          </div>
      )}
      {filter.length>0 ? (
        <div className="grid grid-cols-5 gap-8 mt-8">
        {filter.map((p, index) => (
          <Productcard key={index} product={p}></Productcard>
        ))}
      </div>
      ):
      (
        <div className='text-2xl font-medium text-primary'>No products found in this category</div>
      )}
    </div>
  );
}

export default Productcategories