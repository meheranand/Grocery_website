import React from 'react'
import Productcard from './productcard'
import { dummyProducts } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';

const Bestseller = () => {
  const { product } = useAppContext(); // Change 'products' to match the actual property name in your context
  return (
    <div className="mt-10">
      <p className="text-3xl font-medium pb-4">Best Sellers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {[...Array(5)].map((_, i) => (
          <Productcard key={i} product={product[i]} />
        ))}
      </div>
    </div>
  );
}

export default Bestseller