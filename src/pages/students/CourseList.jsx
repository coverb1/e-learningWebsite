import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Appcontext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'

const CourseList = () => {

  // here is the logic of searching
  // If user types something → show matching courses or If user types nothing → show all courses


  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()
  // I will store the courses I want to show here
  const [filteredCourse, setFilteredCourse] = useState([])

  // Run this code when:
  // courses change OR
  // search input changes”
  useEffect(() => {
    // Check if courses exist
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      // input ? (do filter) : (show all)
      // if user typed something (input exists)
      // Go through all courses
      // Keep only courses that match the search

      input ?

        setFilteredCourse(
          tempCourses.filter(
            item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )

        : setFilteredCourse(tempCourses)

    }
  }, [allCourses, input])

  return (
    <div className='relative md:px-36 px-6 pt-16'>

      {/* TOP SECTION */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>

        {/* LEFT SIDE */}
        <div>
          <h1 className='text-3xl md:text-4xl font-semibold text-gray-800'>
            Course List
          </h1>

          <p className='text-sm text-gray-500 mt-1'>
            <span
              className='text-blue-600 cursor-pointer hover:underline'
              onClick={() => navigate('/')}
            >
              Home
            </span>
            <span> / Course List</span>
          </p>
        </div>

        {/* RIGHT SIDE (SEARCH BAR) */}
        <div className='w-full md:w-[400px]'>
          <SearchBar data={input} />
        </div>
      </div>
      <div className='grid  md:grid-cols-4 sm:grid-cols- grid-cols-2  px-4 md:px-20   gap-4 my-20'>
        {filteredCourse.map((course, index) => <CourseCard key={index} course={course} />)}
      </div>
    </div>
  )
}

export default CourseList