import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/react'
import { AppContext } from '../../context/Appcontext'

const Navbar = () => {

  const {navigate,isEducator,setIsEducator}=useContext(AppContext)

  const{openSignIn}=useClerk()
  const {user}=useUser()

  //“Does the URL have /course-list inside it?
  const isCourseListPage = location.pathname.includes('/course-list')

  return (
    <div className={`flex  items-center justify-between 
    px-4 sm:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-700/10'} `}>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-28 lg:w-32 cursor-pointer' />

      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div>
{/* IF user exists (logged in)  show this content */}
{/* Show educator button and enrollment link ONLY when user is logged in */}
         { user && 
         <>
          <button onClick={()=>{navigate('/educator')}}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button>
          <Link to='/my-enrlloment'>|| My-enrlloment</Link>
          </>
          }
        </div>
        
       {
// IF user exists → show <UserButton />
// ELSE → show "Create Account" button
        user? <UserButton/> :
        <button onClick={()=>openSignIn()} 
        className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>}
      </div>

      {/* for phone screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-400'>
        <div>
   <button onClick={()=>{navigate('/educator')}}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button>
    <Link to='/my-enrlloment'>|| My-enrlloment</Link>
        </div>
        <button><img src={assets.user_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default Navbar