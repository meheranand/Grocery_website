import { createContext,useState,useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from 'react-hot-toast';
import axios  from 'axios';


export const AppContext=createContext()
export const AppContextProvider=({children})=>{
    const navigate=useNavigate();
    const [user,setUser]=useState(null)
    const [userid,setuserid]=useState('')
    const [isseller,setisseller]=useState(false)
    const [showlogin,setshowlogin]=useState(false)
    const [product,setproduct]=useState({})
    const [cartitem,setcartitem]=useState({})
    const [search, setsearch] = useState({});

    const fetchseller=async()=>{
      try {
        const { data } = await axios.get("api/seller/is-auth");
        if (data.success) {
          setisseller(true);
        } else {
          setisseller(false);
        }
      } catch (error) {
        console.log(error.message)
        setisseller(false)
      }
    }

    const fetchuser=async()=>{
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/is-auth`,
          { withCredentials: true }
        );
        if (data.success) {
        console.log(data.user);
          setUser(data.user);
          setuserid(data.user._id)
          console.log(userid)
          setcartitem(data.user.cartitems);
        }
      } catch (error) {
        console.log(error.message)
        setUser(null)
        
      }
    }

    const fetchproducts=async ()=>{
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/list`,
          { withCredentials: true }
        );
        if(data.success){
          setproduct(data.list)
        }
        else{
          toast.error('Error occured wile adding Product')
        }
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      fetchuser()
      fetchseller()
      fetchproducts()
    },[])

    useEffect(() => {
      console.log("🚀 user state updated in context:", cartitem);
    }, [cartitem]);    

    useEffect(()=>{
      const backendcart=async ()=>{
        try {
          const { data } = axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
            { userid,cartitem },
            { withCredentials: true }
          );
          if(!data.success){
            toast.error(data.msg)
          }
        } catch (error) {
          console.log(error.message)
          // toast.error(error.message)
        }
      }
      if (user) {
        backendcart();
      }

    },[cartitem,user])

    //add to cart
    const addproduct=(itemid)=>{
      let cartdata=structuredClone(cartitem)
      if(cartdata[itemid]) cartdata[itemid]+=1
      else cartdata[itemid]=1
      setcartitem(cartdata)
      toast.success("Item Added to Cart")
    }
    
    //update cart 
    const updatecart=(itemid,quantity)=>{
      let cartdata=structuredClone(cartitem)
      cartdata[itemid]=quantity
      setcartitem(cartdata)
      toast.success("Cart Updated")
    }

    //remove product from cart
    const removeproduct=(itemid)=>{
      let cartdata=structuredClone(cartitem)
      if(cartdata[itemid]){
        cartdata[itemid] -= 1;
        if(cartdata[itemid]===0){
          delete cartdata[itemid]
        }
      }
      setcartitem(cartdata)
      toast.success("Removed from Cart")
    }

    //Cart count
    const cartcount=()=>{
      let res=0
      for(const item in cartitem){
        res+=cartitem[item]
      }
      return res
    }

    //Cart Amount
    const cartamount=()=>{
      let res=0
      for(const items in cartitem){
        let productinfo=product.find((p)=>p._id===items)
        if(cartitem[items]>0){
          res+=productinfo.offerPrice * cartitem[items]
        }
      }
      return Math.floor(res*100)/100
    }

    //delete product from cart
    const deleteFromCart = (id) => {
      const cart=structuredClone(cartitem)
      delete cart[id];
      setcartitem(cart)
    };

    const value = {
      navigate,
      user,
      setUser,
      setisseller,
      isseller,
      showlogin,
      setshowlogin,
      product,
      cartitem,
      updatecart,
      addproduct,
      removeproduct,
      search,
      setsearch,
      cartcount,
      cartamount,
      deleteFromCart,
      axios,
      fetchseller,
      fetchproducts,
      fetchuser
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
  return useContext(AppContext);
};