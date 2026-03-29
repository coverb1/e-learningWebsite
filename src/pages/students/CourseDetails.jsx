import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'

const CourseDetails = () => {
  //using this Id we will find the particular course from all coursed 
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses } = useContext(AppContext)

  const { calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext)

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

          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <span className='font-medium'>{calculateRating(courseData)}</span>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} className='w-3.5 h-3.5' src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />
              ))}
            </div>
            <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? 'Ratings' : 'Rating'})</p>
            <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>
          <p>course by  <span className='text-blue-600 underline   '>Mucyo bruce</span></p>
          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (
                <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                    <div className='flex items-center gap-2'>
                      <img src={assets.down_arrow_icon} alt="" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent.length}Lecture-{calculateChapterTime(chapter)}</p>
                  </div>

                <div className='overflow-hidden transition-all duration-300 max-h-96'>
  <ul className='divide-y divide-gray-200'>
    {chapter.chapterContent.map((lecture, index) => (
      <li key={index} className='flex items-start gap-3 py-3 px-4 hover:bg-gray-50 transition'>

        {/* icon */}
        <img 
          src={assets.play_icon} 
          className='w-4 h-4 mt-1 flex-shrink-0' 
          alt="" 
        />

        {/* content */}
        <div className='flex-1'>
          <p className='text-sm md:text-base font-medium text-gray-800'>
            {lecture.lectureTitle}
          </p>

          <div className='flex items-center gap-3 text-xs text-gray-500 mt-1'>

            {/* preview */}
            {lecture.isPreviewFree && (
              <span className='text-green-600 font-medium'>
                Preview
              </span>
            )}

            {/* duration */}
            <span>
              {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                units: ['h', 'm']
              })}
            </span>

          </div>
        </div>

      </li>
    ))}
  </ul>
</div>

                </div>
              ))}
            </div>
          </div>
        </div>
        {/* right column */}
      </div>
    </>

  ) : <Loading />
}

export default CourseDetails