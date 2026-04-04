import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import "quill/dist/quill.snow.css";

const AddCourse = () => {

  // Quill editor
  const quillRef = useRef(null)
  const editorRef = useRef(null)

  // States
  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapter, setChapter] = useState([])
  const [showpopup, setShowPopup] = useState([])
  const [currentchapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    ispreviewFree: false
  })

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">

      <form className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-6">

        {/* Title */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">Course Title</p>
          <input
            type="text"
            value={courseTitle}
            onChange={e => setCourseTitle(e.target.value)}
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">Course Description</p>
          <div
            ref={editorRef}
            className="bg-white border border-gray-300 rounded-md min-h-[150px] p-2"
          ></div>
        </div>

        {/* Price + Thumbnail */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">

          {/* Price */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Course Price</p>
            <input
              type="number"
              value={coursePrice}
              onChange={e => setCoursePrice(Number(e.target.value))}
              placeholder="0"
              className="w-32 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Course Thumbnail</p>

            <label
              htmlFor="ThumbnailImage"
              className="flex items-center gap-3 cursor-pointer border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
            >
              <img
                src={assets.file_upload_icon}
                alt="upload"
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-600">
                Choose Image
              </span>
            </label>

            <input type="file" id="ThumbnailImage" onChange={e => setImage(e.target.files[0])} accept="image/*" hidden />

            {/* Preview */}
            {/* If image exists → show it */}
            {/* If no image → show nothing */}
            {/* URL.createObjectURL(image) This creates a temporary link for the image */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-20 h-20 object-cover rounded border border-gray-300"
              />
            )}
          </div>
        </div>

      </form>
    </div>
  )
}

export default AddCourse

// import uniqid from 'uniqid' It creates a unique ID (a special number or text that is different every time).
// import Quill from 'quill It gives you a text editor like: It lets users:'
// editorRef → points to the HTML div
// quillRef → stores the Quill editor make a goood and clearn tailiwind do not add animation or movement only taiwilnd but proffessional one


