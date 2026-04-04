import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import "quill/dist/quill.snow.css";

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)

  const [chapter, setChapter] = useState([])
  const [showpopup, setShowPopup] = useState(false)

  // ✅ FIXED NAME
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    ispreviewFree: false
  })

  // ================= CHAPTER =================
  const handlerChapter = (action, chapterId) => {

    if (action === 'add') {
      const title = prompt('Enter Chapter Name:')
      if (!title) return

      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed: false
      }

      setChapter([...chapter, newChapter])
    }

    if (action === 'remove') {
      setChapter(chapter.filter(item => item.chapterId !== chapterId))
    }

    if (action === 'toggle') {
      setChapter(
        chapter.map(item =>
          item.chapterId === chapterId
            ? { ...item, collapsed: !item.collapsed }
            : item
        )
      )
    }
  }

  // ================= LECTURE =================
  const handlerLecture = (action, chapterId, lectureIndex) => {

    if (action === 'add') {
      setCurrentChapterId(chapterId)
      setShowPopup(true)
    }

    if (action === 'save') {

      const newLecture = {
        ...lectureDetails,
        lectureId: uniqid()
      }

      setChapter(
        chapter.map(item => {

          // ✅ FIXED VARIABLE NAME
          if (item.chapterId === currentChapterId) {
            return {
              ...item,
              chapterContent: [...item.chapterContent, newLecture]
            }
          }

          return item
        })
      )

      setShowPopup(false)

      setLectureDetails({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        ispreviewFree: false
      })
    }

    if (action === 'remove') {
      setChapter(
        chapter.map(item => {
          if (item.chapterId === chapterId) {
            const newContent = [...item.chapterContent]
            newContent.splice(lectureIndex, 1)

            return { ...item, chapterContent: newContent }
          }
          return item
        })
      )
    }

    if (action === 'cancel') {
      setShowPopup(false)
    }
  }

  // ================= QUILL =================
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const description = quillRef.current.root.innerHTML

    console.log({
      courseTitle,
      coursePrice,
      discount,
      description,
      chapter
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded-lg border flex flex-col gap-6">

        {/* TITLE */}
        <input
          placeholder="Course Title"
          value={courseTitle}
          onChange={e => setCourseTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        {/* DESCRIPTION */}
        <div ref={editorRef} className="border min-h-[150px] rounded p-2"></div>

        {/* PRICE */}
        <input
          type="number"
          value={coursePrice}
          onChange={e => setCoursePrice(Number(e.target.value))}
          className="border px-3 py-2 rounded w-32"
        />

        {/* DISCOUNT */}
        <input
          type="number"
          value={discount}
          onChange={e => setDiscount(Number(e.target.value))}
          className="border px-3 py-2 rounded w-32"
        />

        {/* ADD CHAPTER */}
        <button
          type="button"
          onClick={() => handlerChapter('add')}
          className="bg-black text-white px-4 py-2 rounded w-fit"
        >
          Add Chapter
        </button>

        {/* CHAPTERS */}
        {chapter.map((item, index) => (
          <div key={item.chapterId} className="border rounded">

            {/* HEADER */}
            <div className="flex justify-between items-center p-3 border-b">

              <div>
                <p className="font-medium">
                  {index + 1}. {item.chapterTitle}
                </p>

                {/* NUMBER OF LECTURES */}
                <p className="text-xs text-gray-500">
                  {item.chapterContent.length} Lectures
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlerLecture('add', item.chapterId)}
                  type="button"
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  Add Lecture
                </button>

                <button
                  onClick={() => handlerChapter('remove', item.chapterId)}
                  type="button"
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

            </div>

            {/* LECTURES */}
            <div className="p-3 flex flex-col gap-2">
              {item.chapterContent.map((lec, i) => (
                <div key={i} className="border p-2 rounded text-sm flex justify-between">

                  <div>
                    <p>{lec.lectureTitle}</p>
                    <p className="text-gray-500 text-xs">{lec.lectureDuration}</p>
                    <p className="text-blue-500 text-xs">{lec.lectureUrl}</p>

                    {/* ✅ FREE / PAID */}
                    <p className={`text-xs ${lec.ispreviewFree ? 'text-green-600' : 'text-red-500'}`}>
                      {lec.ispreviewFree ? 'Free' : 'Paid'}
                    </p>
                  </div>

                  <button
                    onClick={() => handlerLecture('remove', item.chapterId, i)}
                    className="text-red-500"
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

          </div>
        ))}

        <button className="bg-blue-600 text-white py-2 rounded">
          Submit
        </button>

      </form>

      {/* POPUP */}
      {showpopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-80 flex flex-col gap-3">

            <h2 className="font-semibold">Add Lecture</h2>

            <input
              placeholder="Lecture Title"
              value={lectureDetails.lectureTitle}
              onChange={e =>
                setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Duration (e.g 10:00)"
              value={lectureDetails.lectureDuration}
              onChange={e =>
                setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Video URL"
              value={lectureDetails.lectureUrl}
              onChange={e =>
                setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
              }
              className="border p-2 rounded"
            />

            {/* CHECKBOX */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={lectureDetails.ispreviewFree}
                onChange={e =>
                  setLectureDetails({
                    ...lectureDetails,
                    ispreviewFree: e.target.checked
                  })
                }
              />
              Preview Free
            </label>

            {/* BUTTONS */}
            <div className="flex gap-2">

              <button
                onClick={() => handlerLecture('save')}
                className="bg-black text-white py-2 w-full rounded"
              >
                Save
              </button>

              <button
                onClick={() => handlerLecture('cancel')}
                className="border py-2 w-full rounded"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AddCourse