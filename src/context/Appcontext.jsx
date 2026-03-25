import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext()


export const AppContextProvider = (prop) => {

    const currency = '$'
    const [allCourses, setAllCourses] = useState([])

    //fetch all courses

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
    })

    const value = {
        currency,
        allCourses
    }

    return (
        <AppContext.Provider value={value}>
            {prop.children}
        </AppContext.Provider>
    )
}
