import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrlled, setisAlreadyEnrlled] = useState(true)
  const [playerData, setPlayerData] = useState(null)

  const { allCourses, calculateRating, calculateChapterTime, currency, calculateNoOfLectures, calculateCourseDuration } = useContext(AppContext)

  // ✅ fetch course
  const fetchCourseData = () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  // ✅ run when id or courses change
  useEffect(() => {
    fetchCourseData()
  }, [id,allCourses])

  // ✅ toggle accordion
  // const toggleSection = (index) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }))
  // }

  const toggleSection = (index) => {
    setOpenSections((prev) => {
      let newState = { ...prev }

      if (newState[index] === true) {
        newState[index] = false
      } else {
        newState[index] = true
      }

      return newState
    })
  }

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

        {/* background */}
        <div className='absolute top-0 left-0 h-section-height w-full -z-10 bg-gradient-to-b from-cyan-100/70'></div>

        {/* LEFT COLUMN */}
        <div className='max-w-xl text-gray-500 z-10'>

          {/* title */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            {courseData.courseTitle}
          </h1>

          {/* description */}
          <p
            className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200)
            }}
          ></p>

          {/* rating */}
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <span className='font-medium'>{calculateRating(courseData)}</span>

            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className='w-3.5 h-3.5'
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt=''
                />
              ))}
            </div>

            <p className='text-blue-600'>
              ({courseData.courseRatings.length}{' '}
              {courseData.courseRatings.length > 1 ? 'Ratings' : 'Rating'})
            </p>

            <p>
              {courseData.enrolledStudents.length}{' '}
              {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
            </p>
          </div>

          <p>
            course by <span className='text-blue-600 underline'>Mucyo Bruce</span>
          </p>

          {/* COURSE STRUCTURE */}
          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>

            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (

                <div
                  key={index}
                  className='border border-gray-300 bg-white mb-2 rounded'
                >

                  {/* header */}
                  <div
                    onClick={() => toggleSection(index)}
                    className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                  >
                    <div className='flex items-center gap-2'>
                      <img
                        src={assets.down_arrow_icon}
                        className={`transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                        alt=""
                      />
                      <p className='font-medium md:text-base text-sm'>
                        {chapter.chapterTitle}
                      </p>
                    </div>

                    <p className='text-sm'>
                      {chapter.chapterContent.length} Lectures -{' '}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'
                      }`}
                  >
                    <ul className='divide-y divide-gray-200'>

                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className='flex items-start gap-3 py-3 px-4 hover:bg-gray-50 transition'
                        >

                          {/* icon */}
                          <img
                            src={assets.play_icon}
                            className='w-4 h-4 mt-1'
                            alt=""
                          />

                          {/* content */}
                          <div className='flex-1'>
                            <p className='text-sm md:text-base font-medium text-gray-800'>
                              {lecture.lectureTitle}
                            </p>

                            <div className='flex items-center gap-3 text-xs text-gray-500 mt-1'>

                              {/* When user clicks Preview: */}
                              {/* 4. Getting the YouTube video ID */}
                              {lecture.isPreviewFree && (
                                <span  onClick={() => setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()
                                })} className='text-green-600 font-medium cursor-pointer '>
                                  Preview
                                </span>
                              )}

                              <span>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ['h', 'm'] }
                                )}
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

          <div className='py-10 px-4 md:px-8 bg-white rounded-xl shadow-sm border border-gray-100'>

            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
              Course Description
            </h3>

            <div
              className='prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
              }}
            ></div>

          </div>

        </div>

        {/* RIGHT COLUMN (you can add video / price later) */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden w-80">

          {
            playerData ?
              <YouTube videoId={playerData.videoId} opts={{
                playerVars: {
                  autoplay: 1
                }
              }} iframeClassName='w-full aspect-video' />
              : <img
                src={courseData.courseThumbnail}
                alt=""
                className="w-full h-48 object-cover"
              />

          }

          {/* Image */}

          {/* Content */}
          <div className="p-4">

            <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg w-fit">
              <img
                className="w-4 h-4"
                src={assets.time_left_clock_icon}
                alt=""
              />

              <p className="text-red-500 text-sm"><span className="font-semibold">5 days</span> left at this price</p>
            </div>

            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className='md:text-ld text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>
              <p className='md:text-lg text-gray-500'>{courseData.discount}%off</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 md:pt-4 text-gray-600 text-sm">

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <img className="w-4 h-4" src={assets.star} alt="" />
                <p className="font-medium text-gray-800">
                  {calculateRating(courseData)}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

              {/* Duration */}
              <div className="flex items-center gap-1.5">
                <img className="w-4 h-4" src={assets.time_clock_icon} alt="" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

              {/* Lessons */}
              <div className="flex items-center gap-1.5">
                <img className="w-4 h-4" src={assets.lesson_icon} alt="" />
                <p>
                  <span className="font-medium text-gray-800">
                    {calculateNoOfLectures(courseData)}
                  </span>{" "}
                  lessons
                </p>
              </div>

              <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>
                {isAlreadyEnrlled ? 'Already Enrolled' : 'Enroll Now'}</button>

              <div className="pt-6 flex flex-col items-start">

                {/* Title */}
                <p className="text-lg md:text-xl font-semibold text-gray-800">
                  What is in this course
                </p>

                {/* List */}
                <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-600">

                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    <p>Lifetime access with free updates</p>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    <p>Step by step, hands-on project guidance</p>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    <p>Download resources and source code</p>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    <p>Lifetime access with free updates</p>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    <p>Certificate of completion</p>
                  </li>

                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default CourseDetails