import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()


export const AppContextProvider = (prop) => {

    const currency = '$'
    const [allCourses, setAllCourses] = useState([])
     const [isEducator, setIsEducator] = useState(true)
    const navigate=useNavigate()

    //fetch all courses

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

//function to calculate average rating
//we used course as parameter We want the function to work with any course, not just one.
//You have many courses (JavaScript, Python, Cybersecurity…)
//Each course has its own ratings

//ex: function greet(name) {
//console.log("Hello " + name)}
const calculateRating=(course)=>{
    if (course.courseRatings.length===0) {
        return 0
    }
    let totalRating=0
    course.courseRatings.forEach(rating=>{
        totalRating+=rating.rating
    })
    return totalRating / course.courseRatings.length //this calculates average rating
}

// function to claculate chapter  course chapter time

const calculateChapterTime=(chapter)=>{
    let time=0
    chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
    return humanizeDuration(time*60*100,{units:['h','m']})
}

//function to  calculate couse Duration
const calculateCourseDuration = (course) => {
  let time = 0;

  course.courseContent.forEach((chapter) => {
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
  });

  return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
};

//function of total lectures in the course

const calculateNoOfLectures=(course)=>{
let totalLecture=0
course.courseContent.forEach(chapter=>{
    if (Array.isArray(chapter.chapterContent)) {
        totalLecture+=chapter.chapterContent.length
    }
})
return totalLecture
}

    useEffect(() => {
        fetchAllCourses()
      
    })

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateNoOfLectures,
        calculateCourseDuration,
        calculateChapterTime
    }

    return (
        <AppContext.Provider value={value}>
            {prop.children}
        </AppContext.Provider>
    )
}
