import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Appcontext'

const Mycourse = () => {

  const { allCourses, currency } = useContext(AppContext)
  const [courses, setcourses] = useState(null)

  const fetchEducatorCourses = async () => {
    setcourses(allCourses)
  }

  useEffect(() => {
    fetchEducatorCourses()
  }, [allCourses])

  return courses ? (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>

      <div className='w-full max-w-6xl mx-auto'>

        {/* Title */}
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          My Courses
        </h2>

        {/* Table Container */}
        <div className='bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200'>

          <table className='w-full'>

            {/* Header */}
            <thead className='bg-gray-100 text-gray-700 text-sm uppercase'>
              <tr>
                <th className='px-6 py-4 text-left'>Course</th>
                <th className='px-6 py-4 text-left'>Earnings</th>
                <th className='px-6 py-4 text-left'>Students</th>
                <th className='px-6 py-4 text-left'>Published</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className='text-gray-600 text-sm'>

              {courses.map((course) => (
                <tr
                  key={course._id}
                  className='border-t hover:bg-gray-50 transition duration-200'
                >

                  {/* Course */}
                  <td className='px-6 py-4 flex items-center gap-4'>
                    <img
                      src={course.courseThumbnail}
                      alt=""
                      className='w-16 h-10 object-cover rounded-md'
                    />
                    <span className='font-medium text-gray-800'>
                      {course.courseTitle}
                    </span>
                  </td>

                  {/* Earnings */}
                  <td className='px-6 py-4 font-semibold text-green-600'>
                    {currency}
                    {Math.floor(course.enrolledStudents.length * (course.coursePrice / 100))}
                  </td>

                  {/* Students */}
                  <td className='px-6 py-4'>
                    {course.enrolledStudents.length}
                  </td>

                  {/* Date */}
                  <td className='px-6 py-4 text-gray-500'>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  ) : (
    <div className='flex items-center justify-center h-screen text-gray-500'>
      Loading...
    </div>
  )
}

export default Mycourse