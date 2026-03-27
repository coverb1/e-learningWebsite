import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-800 md:px-36 text-36 w-full mt-10'>
<div className='flex flex-col md:flex-row items-start px-8
md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
  <div className='flex flex-col md:items-start items-center w-full'>
    <img src={assets.logo_dark} alt="" />
    <p className=' mt-6 text-center md:text-left text-sm text-white/80'>this is what we cal dummy data for just testing if things 
      works and if works we change them with the real data
    </p>
  </div>

  <div className='flex flex-col md:items-center w-full'>
    <h2 className='font-semibold text-white mb-5'>Company</h2>
    <ul className='flex md:flex-col w-full justify-center text-sm text-white/80
    md:space-y-2'>
      <li><a href="#">Home</a></li>
      <li><a href="#">About us</a></li>
      <li><a href="#">Contact us</a></li>
      <li><a href="#">Privacy policy</a></li>
    </ul>
  </div>
  <div className='hiddedn md:flex flex-col items-start w-full'>
<h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
<p className='text-sm text-white/80'>The latest news,Article,and Resources and, <br /> resources sent to yourin box weekly</p>
<div className='flex  items-center gap-2 pt-4'>
<input type="Email" placeholder='Enter your email' 
className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500
outline-none w-64 h-9 rounded px-2 text-sm' />
<button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
</div>
  </div>
</div>
      <p  className='py-4  text-center text-xs md:text-sm text-white/60'>Copy right mucyobruce 2026.All right Reseved</p>
    </footer>
  )
}

export default Footer