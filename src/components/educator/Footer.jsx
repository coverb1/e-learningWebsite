import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='w-full border-t bg-white px-6 md:px-10 py-6 flex md:flex-row flex-col-reverse items-center justify-between gap-4'>
      
      {/* Left side */}
      <div className='flex items-center gap-4'>
        <img src={assets.logo} alt="logo" className='w-20' />

        <div className='hidden md:block h-6 w-px bg-gray-400'></div>

        <p className='text-sm text-gray-600 text-center md:text-left'>
          Copyright © MucyoBruce 2026. All rights reserved
        </p>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-4'>
        <a href="#" className='hover:scale-110 transition'>
          <img src={assets.facebook_icon} alt="facebook" className='w-5 h-5' />
        </a>

        <a href="#" className='hover:scale-110 transition'>
          <img src={assets.twitter_icon} alt="twitter" className='w-5 h-5' />
        </a>

        <a href="#" className='hover:scale-110 transition'>
          <img src={assets.instagram_icon} alt="instagram" className='w-5 h-5' />
        </a>
      </div>

    </footer>
  )
}

export default Footer