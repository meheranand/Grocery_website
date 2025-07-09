import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/Appcontext'
import Loginform from './components/loginform'
import Allproducts from './pages/Allproducts'
import Productcategories from './pages/Productcategories'
import Productdeatails from './pages/Productdeatails'
import Cart from './pages/Cart'
import Sellerlogin from './components/sellerlogin'
import Sellerlayout from './pages/seller/Sellerlayout'
import Addproduct from './pages/seller/Addproduct'
import Productlist from './pages/seller/Productlist'
import Orders from "./pages/seller/Orders"
import Updateproduct from './pages/seller/updateproduct'

const App = () => {
  const {product,showlogin,isseller} = useAppContext()
  return (
    <div>
      {isseller ? null : <Navbar product={product}></Navbar>}
      {showlogin ? <Loginform></Loginform> : null}
      <Toaster></Toaster>
      <div>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/allproducts"
            element={<Allproducts></Allproducts>}
          ></Route>
          <Route
            path="/allproducts/:category"
            element={<Productcategories></Productcategories>}
          ></Route>
          <Route
            path="/allproducts/:category/:id"
            element={<Productdeatails></Productdeatails>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route
            path="/seller"
            element={
              isseller ? (
                <Sellerlayout></Sellerlayout>
              ) : (
                <Sellerlogin></Sellerlogin>
              )
            }
          >
            <Route
              index
              element={isseller ? <Addproduct></Addproduct> : null}
            ></Route>
            <Route
              path="productlist"
              element={<Productlist></Productlist>}
            ></Route>
            <Route path="orders" element={<Orders></Orders>}></Route>
            <Route path="updateproduct/:id" element={<Updateproduct></Updateproduct>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App
