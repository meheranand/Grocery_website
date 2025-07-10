import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = ({product}) => {
    const [open, setOpen] = React.useState(false);
    const {user,setUser,setshowlogin,navigate,cartitem,search,setsearch,cartcount,cartamount}=useAppContext()
    const logout=async()=>{
      try {
        const result = window.confirm("Are you sure you want to Logout");
        if (result) {
          alert("You clicked OK");
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
            { withCredentials: true }
          );
          if(data.success){
            setUser(null);
            toast.success(data.msg)
          }
        } else {
          alert("You clicked Cancel");
        }
        navigate("/");
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        
      }
    }
    // useEffect(()=>{
    //   if(search.lenght>0){
    //     navigate("/allproducts")
    //   }
    // },[search])
    // console.log(cartamount(),cartitem)
  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="shadow flex items-center justify-between px-6 md:px-10 lg:px-10 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <NavLink>
          <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <button
            onClick={() => navigate("/seller")}
            className="text-xs font-medium rounded-4xl border px-2.5 py-1 cursor-pointer hover:bg-gray-300 text-gray-500 border-gray-200 "
          >
            Seller Dashboard
          </button>
          <NavLink to="/" className="text-shadow-black hover:text-gray-600">
            Home
          </NavLink>
          <NavLink
            to="/allproducts"
            className="text-shadow-black hover:text-gray-600"
          >
            All products
          </NavLink>

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => {
                setsearch(e.target.value);
                navigate("/allproducts");
              }}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                clip-rule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className='hover:scale-110 transition'
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <button className="absolute -top-2 -right-4 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              {cartcount()}
            </button>
          </div>

          {!user ? (
            <button
              onClick={() => setshowlogin(true)}
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10" alt="" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white rounded-md w-30 border border-gray-400">
                <li
                  onClick={() => navigate("/myorders")}
                  className="cursor-pointer ps-4 hover:bg-green-100 py-1"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="cursor-pointer ps-4 hover:bg-green-100 py-1"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {open && (
          <div
            className={`${
              open ? "flex" : "hidden"
            } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
          >
            <NavLink
              to="/"
              className="text-shadow-black hover:text-gray-600"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/allproducts"
              className="text-shadow-black hover:text-gray-600"
              onClick={() => setOpen(false)}
            >
              All products
            </NavLink>
            {user && (
              <NavLink
                to="/"
                className="text-shadow-black hover:text-gray-600"
                onClick={() => setOpen(false)}
              >
                My Orders
              </NavLink>
            )}
            <NavLink
              to="/"
              className="text-shadow-black hover:text-gray-600"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </NavLink>
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setshowlogin(true);
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar