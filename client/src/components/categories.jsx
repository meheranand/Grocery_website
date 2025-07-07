import React from 'react'
import { assets,categories } from '../assets/assets'
import { useAppContext } from '../context/Appcontext';

const Categories = () => {
    const {navigate}=useAppContext()
  return (
    <div>
      <p className="text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4">
        {categories.map((val) => (
          <div
            key={val.path}
            className="group cursor-pointer flex flex-col justify-center items-center pb-4 rounded-lg gap-2"
            style={{ backgroundColor: val.bgColor }}
            onClick={() => navigate(`allproducts/${val.path}`)}
          >
            <img className="group-hover:scale-105 transition w-16 h-16 sm:w-20 sm:h-20" src={val.image} alt="" />
            <p className="font-medium text-sm sm:text-base">{val.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories