import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';

const Productcard = ({product}) => {
  const [count, setCount] = React.useState(0);
  const { cartitem, updatecart, addproduct, removeproduct,navigate } = useAppContext();

//   const product = {
//     name: "Casual Shoes",
//     category: "Sports",
//     price: 100,
//    pofferPrice: 80,
//     rating: 4,
//     image:
//       "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
//   };

  return (
    product && (
      <div
        onClick={() =>
          navigate(`/allproducts/${product.category}/${product._id}`)
        }
        className="group cursor-pointer border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
      >
        <div className="cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  srcset=""
                />
              ))}
            <p>(5)</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-indigo-500">
              ${product.offerprice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                ${product.price}
              </span>
            </p>
            <div
              className="text-indigo-500"
              onClick={(e) => e.stopPropagation()}
            >
              {!cartitem[product._id] ? (
                <button
                  disabled={product.instock === false}
                  className={
                    product.instock === false
                      ? "flex items-center justify-center gap-1 bg-gray-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium disabled:cursor-not-allowed"
                      : "flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
                  }
                  onClick={() => addproduct(product._id)}
                >
                  {product.instock === false ? null : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                        stroke="#615fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                  {product.instock === false ? "Out of stock" : "Add"}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                  <button
                    onClick={() => removeproduct(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartitem[product._id]}
                  </span>
                  <button
                    onClick={() => addproduct(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Productcard