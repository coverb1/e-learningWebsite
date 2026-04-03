import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapter, setChapter] = useState([])
  const [showpopup, setShowPopup] = useState([])
  const [currentchapterId, setCurrentChapterId] = useState(null)


  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      ispreviewFree: false
    }
  )

  useEffect(() => {
    // Create the Quill editor only if it does not already exist, and the page element is ready
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-4 pb-8'>
      <form >
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text"
            placeholder='type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCourse

//  import uniqid from 'uniqid' It creates a unique ID (a special number or text that is different every time).
// import Quill from 'quill  It gives you a text editor like: It lets users:'
// editorRef → points to the HTML div
// quillRef → stores the Quill editor