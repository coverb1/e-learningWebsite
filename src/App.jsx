import React from 'react'
import { Route, Routes } from 'react-router-dom'
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


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        {/* <Route path='/course-list' element={<CourseList />} /> */}
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrlloment' element={<Myenrlloment />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        <Route path='/educator' element={<Educator/>}>
            <Route path='educator' element={<Dashboard/>} />
            <Route path='add-course' element={<AddCourse/>} />
            <Route path='my-courses' element={<Mycourse/>} />
            <Route path='student-enrlled' element={<StudentsEnrolled/>} />
        </Route>

      </Routes>
    </div>
  )
}

export default App