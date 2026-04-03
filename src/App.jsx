import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/Home'
import CourseList from './pages/students/CourseList'
import CourseDetails from './pages/students/CourseDetails'
import Myenrlloment from './pages/students/Myenrlloment'
import Player from './pages/students/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import Mycourse from './pages/educator/Mycourse'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";

const App = () => {

  //Is the current URL inside /educator?
  //Is this URL part of /educator routes?
const isEducatorRouter=useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      {/* means if no educator url found show him navbar */}
{!isEducatorRouter&& <Navbar />}
      <Routes>
        {/* when user open show HOme */}
        <Route path='/' element={<Home />} />
        {/* Route for all courses  */}
        <Route path='/course-list' element={<CourseList />} />
     {/* route for seacrhing */}
        <Route path='/course-list/:input' element={<CourseList />} />
        {/* this will show all course details */}
        <Route path='/course/:id' element={<CourseDetails />} />
        {/* courses the user joined */}
        <Route path='/my-enrlloment' element={<Myenrlloment />} />
        {/* route that helps to show video user clicked */}
        <Route path='/player/:courseId' element={<Player />} />
        {/* route for loading */}
        <Route path='/loading/:path' element={<Loading />} />

{/* This is a main layout page */}
{/* <Outlet /> is a space where child pages appear */}
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<Mycourse />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App