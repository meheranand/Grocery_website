import React from 'react'
import { assets } from '../assets/assets'

const Mainbanner = () => {
  return (
    <div>
        <img src={assets.main_banner_bg} className='w-full hidden md:block py-5 rounded-md' alt="" />
        <img src={assets.main_banner_bg_sm} className='w-full md:hidden' alt="" />
    </div>
  )
}

export default Mainbanner