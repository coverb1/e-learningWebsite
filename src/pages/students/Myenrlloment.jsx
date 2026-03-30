import React, { useContext } from 'react'
import { AppContext } from '../../context/Appcontext'

const Myenrlloment = () => {

const {enrlloledCourse}=useContext(AppContext)

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

          <tbody className='text-gray-600 text-sm'>
            {enrlloledCourse.map((course,index)=>(
              <tr key={index}>
<td>
  <img src={course} alt="" />
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