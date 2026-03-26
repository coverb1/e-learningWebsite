import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/Appcontext'
import { Link } from 'react-router-dom'


const CourseCard = ({ course }) => {

  const { currency, calculateRating } = useContext(AppContext)


  const finalPrice = (
    course.coursePrice - (course.discount * course.coursePrice / 100)
  ).toFixed(2)
  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'
    >
      <img
        className='w-full '
        src={course.courseThumbnail}
        alt=""
      />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>
          {course.courseTitle}
        </h3>
        <p>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <span className='font-medium'>{calculateRating(course)}</span>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} className='w-3.5 h-3.5' src={i < Math.floor(calculateRating(course))  ? assets.star : assets.star_blank} alt='' />
            ))}
          </div>
          <span className='text-gray-500'>{course.courseRatings.length}</span>
        </div>
        <p className='text-sm font-semibold mt-1 w-full text-left'>
          {currency}{finalPrice}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard