import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'

const CourseDetails = () => {
//using this Id we will find the particular course from all coursed 
const {id}=useParams()
const [courseData,setCourseData]=useState(null)
const {allCourses}=useContext(AppContext)

//function to fetch individual courseData

const fetchCourseData=async()=>{
 const findCourse= allCourses.find(course=>course._id===id)
 console.log(findCourse)
 setCourseData(findCourse)
}

useEffect(()=>{
fetchCourseData()
},[id,allCourses])



  return (
    <div>

    </div>
  )
}

export default CourseDetails