import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'
import CourseCard from './CourseCard'

const CourseSection = () => {

  const { allCourses } = useContext(AppContext)

  return (
    <div >
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <br />
      <p>Discover our  top-rated cross various categories.
        from coding and design to <br /> business and wellnes, oyr courses are crafted to deliver
        results
      </p>

      <div className='grid md:grid-cols-4 sm:grid-cols-1 grid-cols-2 px-4 md:px-20   gap-4 my-10'>
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link to={'/course-list/'} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded' onClick={() => scrollTo(0, 0)}>
        Show all course
      </Link>
    </div>
  )
}

export default CourseSection
