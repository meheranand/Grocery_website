import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/Appcontext';
import { ErrorIcon, toast } from "react-hot-toast";
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';

const Sellerlayout = () => {
    const {setisseller,navigate,isseller}=useAppContext()
    const dashboardicon = (
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
        />
      </svg>
    );

    const overviewicon = (
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
        />
      </svg>
    );

    const chaticon = (
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        />
      </svg>
    );

    const sidebarLinks = [
      { name: "Add Product", path: "/seller", icon: dashboardicon },
      { name: "Product List", path: "/seller/productlist", icon: overviewicon },
      { name: "Orders", path: "/seller/orders", icon: chaticon },
    ];

    const logout=async()=>{
      try {
        const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/seller/logout`)
        if(data.success){
          console.log(data)
          setisseller(false);
          navigate("/");
          toast.success(data.msg);
        }
        else{
          toast.error(data.msg)
        }
      } catch (error) {
        console.log(error.message)
        toast.error(data.msg)
      }
    }

    return (
      isseller && (
        <>
          <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
            <a>
              <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
            </a>
            <div className="flex items-center gap-5 text-gray-500">
              <p>Hi! Admin</p>
              <button
                onClick={logout}
                className="border rounded-full text-sm px-4 py-1 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
          <div className='flex'>
            <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
              {sidebarLinks.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  end={item.path === "/seller"}
                  className={({
                    isActive,
                  }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
                >
                  {item.icon}
                  <p className="md:block hidden text-center">{item.name}</p>
                </NavLink>
              ))}
            </div>
            <div className='w-full'>
              <Outlet></Outlet>
            </div>
          </div>
        </>
      )
    );
}

export default Sellerlayout