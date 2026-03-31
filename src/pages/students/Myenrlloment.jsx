import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/Appcontext'

const Myenrlloment = () => {

  const { enrlloledCourse ,calculateCourseDuration} = useContext(AppContext)
  const [progressArray,setProgressArray]=useState([])

  return (
    <div className='md:px-36 px-4 pt-10'>
      <h1 className='text-2xl font-semibold mb-6'>My Enrollments</h1>

      <div className='overflow-x-auto'>
        <table className='w-full border border-gray-200 rounded-lg overflow-hidden'>

          <thead className='bg-gray-100 text-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-semibold'>Course</th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>Duration</th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>Completed</th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>Status</th>
            </tr>
          </thead>

          <tbody className='text-gray-700 text-sm'>
            {enrlloledCourse.map((course, index) => (
              <tr key={index}>
                <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-24' />
                  <div className='flex-1'>
                    <p className=' mb-1 max-sm:text-sm'> {course.courseTitle}</p>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
{calculateCourseDuration(course)}
                </td>
                <td className='px-4 max-sm:hidden'>
                  4/10 <span>Lectures</span>
                </td>
                <td className='px-4 py-3 max-sm:text-right'>
                  <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600
                  max-sm: text-xs text-white'>On Going</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Myenrlloment