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
    // console.log(searchcategory)
  return (
    <div className="mt-16 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-30 flex flex-col">
      {searchcategory && (
        <div className="flex flex-col items-center sm:items-end w-full sm:w-max">
          <p className="text-2xl sm:text-3xl font-medium uppercase text-center sm:text-right">
            {searchcategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-green-500 rounded-full mt-1" />
        </div>
      )}

      {filter.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mt-8 justify-items-center">
          {filter.map((p, index) => (
            <Productcard key={index} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-xl sm:text-2xl font-medium text-primary text-center mt-10">
          No products found in this category
        </div>
      )}
    </div>
  );
}

export default Productcategories