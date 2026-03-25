import React from 'react'
import { Link } from 'react-router-dom'

const CourseSection = () => {
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p>Discover our  top-rated cross various categories.
        from coding and design to business and wellnes, oyr courses are crafted to deliver
        results
      </p>
      <Link to={'/course-list/'} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded' onClick={()=>scrollTo(0,0)}>
      Show all course
      </Link>
    </div>
  )
}

export default CourseSection