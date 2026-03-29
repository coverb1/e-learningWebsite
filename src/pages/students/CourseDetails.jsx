import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'

const CourseDetails = () => {
  //using this Id we will find the particular course from all coursed 
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses } = useContext(AppContext)
  const { calculateRating } = useContext(AppContext)

  //function to fetch individual courseData

  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    console.log(findCourse)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [id, allCourses])



  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36
    px-8 md:pt-30 pt-20 text-left'>

        <div className='absolute top-0 left-0  h-section-height w-full -z-1 bg-gradient-to-b from-cyan-100/70'>

        </div>

        {/* left column */}
        <div className='max-w-xl text-gray-500 z-10'>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            {courseData.courseTitle}
          </h1>
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

          {/* reveiw rating */}

          <div className='flex items-center space-x-2'>
            <span className='font-medium'>{calculateRating(courseData)}</span>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} className='w-3.5 h-3.5' src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />
              ))}
            </div>
            <span className='text-gray-500'>{courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? 'Ratings' : 'Rating'}</span>
          </div>

        </div>
        {/* right column */}
      </div>
    </>

  ) : <Loading />
}

export default CourseDetails