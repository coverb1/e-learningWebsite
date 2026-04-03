import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/Appcontext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Course', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]

  if (!isEducator) return null

  return (
    <div className='md:w-64 w-16 min-h-screen border-r border-gray-300 bg-white flex flex-col py-4'>

      {
        menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator'}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col 
              md:justify-start justify-center 
              gap-3 py-3 md:px-6

              transition-all duration-200

              ${isActive
                ? 'bg-indigo-100 text-indigo-600 border-r-4 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-100 border-r-4 border-transparent hover:border-gray-300'
              }`
            }
          >
            <img src={item.icon} alt="" className='w-6 h-6' />
            <p className='md:block hidden'>{item.name}</p>
          </NavLink>
        ))
      }

    </div>
  )
}

export default Sidebar