import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { useParams } from 'react-router-dom';

const Productdeatails = () => {
  const { product,navigate,addproduct } = useAppContext();
  const {id}=useParams()
  const p=product.find((val)=>val._id===id)
  const [thumbnail, setThumbnail] = useState(p.image[0]);
  // console.log(product)

  return (
    p && (
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
        {/* Breadcrumbs */}
        <p className="text-xs sm:text-sm sm:text-left">
          <span>Home</span> / <span>Products</span> / <span>{p.category}</span>{" "}
          /<span className="text-indigo-500"> {p.name}</span>
        </p>

        {/* Main Product Section */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-16 mt-6">
          {/* Image Section: Thumbnails + Big Image */}
          <div className="flex gap-4 sm:gap-6 w-full md:w-auto items-start justify-start">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 sm:gap-3 max-h-[300px] overflow-y-auto">
              {p.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border border-gray-300 rounded overflow-hidden w-16 sm:w-20 cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="border border-gray-300 rounded overflow-hidden w-48 sm:w-72 md:w-96">
              <img
                src={thumbnail}
                alt="Selected"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="text-sm w-full">
            {/* Title */}
            <h1 className="text-xl sm:text-3xl font-medium md:text-left">
              {p.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center justify-start md:justify-start gap-0.5 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  p.rating > i ? (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                    >
                      <path
                        d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                        fill="#615fff"
                      />
                    </svg>
                  ) : (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                    >
                      <path
                        d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                        fill="#615fff"
                        fillOpacity="0.35"
                      />
                    </svg>
                  )
                )}
              <p className="text-xs sm:text-sm ml-2">(5)</p>
            </div>

            {/* Pricing */}
            <div className="mt-4 sm:mt-6 md:text-left">
              <p className="text-gray-500/70 line-through text-sm sm:text-base">
                MRP: ${p.price}
              </p>
              <p className="text-xl sm:text-2xl font-medium text-indigo-500">
                MRP: ${p.offerprice}
              </p>
              <span className="text-gray-500/70 text-xs sm:text-base block">
                (inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-base font-medium mt-5">About Product</p>
            <ul className="list-disc ml-4 mt-1 text-gray-500/70 space-y-1">
              {p.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-10 w-full">
              <button
                onClick={() => addproduct()}
                className="w-full py-2.5 sm:py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition text-center"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="w-full py-2.5 sm:py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition text-center"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Productdeatails