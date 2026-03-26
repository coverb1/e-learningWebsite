import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()


export const AppContextProvider = (prop) => {

    const currency = '$'
    const [allCourses, setAllCourses] = useState([])
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
}

    useEffect(() => {
        fetchAllCourses()
      
    })

    const value = {
        currency,
        allCourses,
        navigate
    }

    return (
        <AppContext.Provider value={value}>
            {prop.children}
        </AppContext.Provider>
    )
}
