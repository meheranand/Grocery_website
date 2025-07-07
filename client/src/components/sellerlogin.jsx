import React,{useEffect, useState} from 'react'
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Sellerlogin = () => {
    const {isseller,setisseller,navigate,fetchseller}=useAppContext()
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("dma@123");
    const handlesubmit=async (event)=>{
        try {
          event.preventDefault();
          const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
            { email, password },
            { withCredentials: true }
          );
          if (data.success) {
            setisseller(true);
            navigate("/seller");
            toast.success(data.msg)
          }
          else{
            toast.error(data.msg)
          }
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
    }
    useEffect(()=>{
      fetchseller()
      if(isseller) navigate('/seller')
      
    })

    return !isseller && (
      <div className="fixed top-0 right-0 left-0 bottom-0 z-30 flex items-center justify-center">
        <form onSubmit={handlesubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller</span>{" "}
            Login
          </p>
          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="password"
              required
            />
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </form>
      </div>
    );
}

export default Sellerlogin