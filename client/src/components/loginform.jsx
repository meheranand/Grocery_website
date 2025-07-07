import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";
import axios from "axios";
import toast from "react-hot-toast";

const Loginform = () => {
  const {setshowlogin,setUser,fetchuser,user,navigate}=useAppContext()
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      navigate("/"); // ✅ Navigate only after user is set
    }
  }, [user]);
  

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${state}`,
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(`${data.msg}`);
        fetchuser()
        setUser(data.user)
        console.log(user)
        setshowlogin(false);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  

return (
  <div
    onClick={() => setshowlogin(false)}
    className="fixed top-0 right-0 left-0 bottom-0 z-30 flex items-center justify-center bg-black/60"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex w-fit rounded-lg shadow-xl overflow-hidden h-[500px] bg-white"
    >
      {/* Image Section */}
      <div className="hidden sm:block h-full">
        <img
          src={assets.main_banner_bg_sm} // Replace with your image URL
          alt="auth"
          className="h-full w-[352px] object-cover"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handlesubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}
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
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-indigo-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-indigo-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  </div>
);
};

export default Loginform

