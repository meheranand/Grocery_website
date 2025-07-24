import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/Appcontext";

const Updateproduct = () => {
  const { id } = useParams(); // Get ID from route
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [offerprice, setofferprice] = useState("");
  const {navigate}=useAppContext()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
        );
        if (data.success) {
          const product = data.productdata;
          setname(product.name);
          setdescription(product.description.join("\n"));
          setcategory(product.category);
          setprice(product.price);
          setofferprice(product.offerprice);

          const filledImages = Array(4).fill(null);
          product.image.forEach((url, idx) => {
            filledImages[idx] = url;
          });
          setImages(filledImages);
          setImagePreviews(filledImages);
        }
      } catch (error) {
        toast.error("Failed to load product");
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const productdata = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerprice,
        existingImages: images.filter((img) => typeof img === "string"),
      };

      const formdata = new FormData();
      formdata.append("productdata", JSON.stringify(productdata));

      imagePreviews.forEach((img) => {
        if (img instanceof File) {
          formdata.append("images", img);
        }
      });
      console.log(formdata);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/update`,
        {id,productdata},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Product updated!");
        navigate('/seller/productlist')
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Update failed");
    }
  };

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
                      const file = e.target.files[0];
                      if (file) {
                        const newPreviews = [...imagePreviews];
                        const newImages = [...images];
                        newPreviews[index] = URL.createObjectURL(file);
                        newImages[index] = file;
                        setImagePreviews(newPreviews);
                        setImages(newImages);
                      }
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      images[index] instanceof File
                        ? imagePreviews[index]
                        : typeof images[index] === "string"
                        ? images[index]
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
          <label className="text-base font-medium">Product Name</label>
          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            onChange={(e) => setdescription(e.target.value)}
            value={description}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {[
              "Organic veggies",
              "Fresh Fruits",
              "Cold Drinks",
              "Instant Food",
              "Dairy Products",
              "Bakery & Breads",
              "Grains & Cereals",
            ].map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium">Product Price</label>
            <input
              onChange={(e) => setprice(e.target.value)}
              value={price}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium">Offer Price</label>
            <input
              onChange={(e) => setofferprice(e.target.value)}
              value={offerprice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Updateproduct;

