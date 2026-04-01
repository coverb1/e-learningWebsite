import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

const Player = () => {

  const { enrlloledCourse, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)



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

  //fetch courseData

  const fetchCourseData = () => {
    const findCourse = enrlloledCourse.find(course => course._id === courseId)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [enrlloledCourse])

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col md:flex-row gap-10 md:px-36'>

        {/* leftside */}
        <div className='w-full md:w-2/3'>
          <h2 className='text-xl font-semibold'> Course Structure</h2>

          <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, index) => (

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
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          className='w-4 h-4 mt-1'
                          alt=""
                        />

                        {/* content */}
                        <div className='flex-1'>
                          <p className='text-sm md:text-base font-medium text-gray-800'>
                            {lecture.lectureTitle}
                          </p>

                          <div className='flex items-center gap-3 text-xs text-gray-500 mt-1'>

                            {/* Show Watch button if video exists */}
                            {lecture.lectureUrl && (
                              <span onClick={() => setPlayerData(
                                {
                                  // Take ALL data from lecture and copy it

                                  ...lecture, chapter: index + 1, lecture: i + 1
                                }
                              )} className='text-green-600 font-medium cursor-pointer '>
                                Watch
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
 
 <div className='flex flex-row items-center gap-2 py-3 mt-10'>
  <h1 className='text-xl font-bold'>Rating this course</h1>
  <Rating initialRating={0}/>

 </div>

        </div>

        {/* Right side */}
        <div className='w-full md:w-1/3 md:mt-10'>
        {
          playerData ? (
            <div>
              {/* cut into many parts then pop so take the last part */}
               <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
               <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter} . {playerData.lecture} {playerData.lectureTitle}</p>
                <button className='text-blue-600'>{false ?'completed':'Mark completed'}</button>
               </div>
            </div>
          )
          : <img  src={courseData ? courseData.courseThumbnail : ''} alt="" />
        }
         
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default Player