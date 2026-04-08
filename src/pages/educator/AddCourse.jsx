import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import "quill/dist/quill.snow.css";

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [chapter, setChapter] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [showChapterPopup, setShowChapterPopup] = useState(false)
  const [chapterTitle, setChapterTitle] = useState('')

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    ispreviewFree: false
  })

  const imageInputRef = useRef(null)

  // ================= THUMBNAIL =================
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  // ================= CHAPTER =================
  const handlerChapter = (action, chapterId) => {

    if (action === 'add') {
      setShowChapterPopup(true)
      return
    }

    if (action === 'saveChapter') {
      if (!chapterTitle.trim()) return
      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: chapterTitle.trim(),
        chapterContent: [],
        collapsed: false
      }
      setChapter([...chapter, newChapter])
      setChapterTitle('')
      setShowChapterPopup(false)
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
          if (item.chapterId === currentChapterId) {
            return { ...item, chapterContent: [...item.chapterContent, newLecture] }
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
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault()
    const description = quillRef.current.root.innerHTML
    console.log({ courseTitle, coursePrice, discount, image, description, chapter })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded-lg border flex flex-col gap-6">

        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Course Title</label>
          <input
            placeholder="Enter course title"
            value={courseTitle}
            onChange={e => setCourseTitle(e.target.value)}
            className="border px-3 py-2 rounded-lg outline-none focus:border-gray-400 text-sm"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Course Description</label>
          <div ref={editorRef} className="border min-h-[150px] rounded-lg p-2 text-sm"></div>
        </div>

        {/* THUMBNAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Course Thumbnail</label>

          {!imagePreview ? (
            <div
              onClick={() => imageInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all"
              style={{ minHeight: '180px' }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16l4-4a3 3 0 014 0l4 4m-4-4v8M13 8a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Click to upload thumbnail</p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP — max 5MB</p>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border" style={{ maxHeight: '260px' }}>
              <img
                src={imagePreview}
                alt="Course thumbnail"
                className="w-full object-cover"
                style={{ maxHeight: '260px' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
                <button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded-lg font-medium shadow"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* PRICE & DISCOUNT — side by side */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-40">
            <label className="text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              placeholder="0"
              value={coursePrice}
              onChange={e => setCoursePrice(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg outline-none focus:border-gray-400 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1 w-40">
            <label className="text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              placeholder="0"
              value={discount}
              onChange={e => setDiscount(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg outline-none focus:border-gray-400 text-sm"
            />
          </div>
        </div>

        {/* ADD CHAPTER BUTTON */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Course Curriculum</label>
            <button
              type="button"
              onClick={() => handlerChapter('add')}
              className="bg-black text-white px-4 py-1.5 rounded-lg text-sm"
            >
              + Add Chapter
            </button>
          </div>

          {/* CHAPTERS LIST */}
          {chapter.length === 0 && (
            <div className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-400 py-8">
              No chapters yet. Click "Add Chapter" to get started.
            </div>
          )}

          {chapter.map((item, index) => (
            <div key={item.chapterId} className="border rounded-xl overflow-hidden">

              {/* CHAPTER HEADER */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
                <div>
                  <p className="font-medium text-sm">
                    {index + 1}. {item.chapterTitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.chapterContent.length} {item.chapterContent.length === 1 ? 'Lecture' : 'Lectures'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlerLecture('add', item.chapterId)}
                    type="button"
                    className="bg-white border px-3 py-1 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                  >
                    + Add Lecture
                  </button>
                  <button
                    onClick={() => handlerChapter('remove', item.chapterId)}
                    type="button"
                    className="text-red-400 text-xs hover:text-red-600 px-2"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* LECTURES LIST */}
              {item.chapterContent.length > 0 && (
                <div className="p-3 flex flex-col gap-2">
                  {item.chapterContent.map((lec, i) => (
                    <div key={i} className="flex justify-between items-center border rounded-lg px-3 py-2 text-sm bg-white">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-sm">{lec.lectureTitle}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs">{lec.lectureDuration}</span>
                          {lec.lectureUrl && (
                            <a href={lec.lectureUrl} target="_blank" rel="noreferrer" className="text-blue-500 text-xs truncate max-w-[180px]">
                              {lec.lectureUrl}
                            </a>
                          )}
                          <span className={`text-xs font-medium ${lec.ispreviewFree ? 'text-green-600' : 'text-gray-400'}`}>
                            {lec.ispreviewFree ? '● Free preview' : '● Paid'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlerLecture('remove', item.chapterId, i)}
                        className="text-red-400 hover:text-red-600 text-xs ml-4 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <button type="submit" className="bg-blue-600 text-white py-2.5 rounded-lg font-medium mt-2">
          Publish Course
        </button>

      </form>

      {/* ── ADD CHAPTER POPUP ── */}
      {showChapterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 flex flex-col gap-4 shadow-lg">

            <div className="flex justify-between items-center">
              <h2 className="font-medium text-base">Add chapter</h2>
              <button
                type="button"
                onClick={() => { setShowChapterPopup(false); setChapterTitle('') }}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >✕</button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Chapter title</label>
              <input
                autoFocus
                placeholder="e.g. Introduction to React"
                value={chapterTitle}
                onChange={e => setChapterTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlerChapter('saveChapter')}
                className="border px-3 py-2 rounded-lg text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => { setShowChapterPopup(false); setChapterTitle('') }}
                className="flex-1 border py-2 rounded-lg text-sm hover:bg-gray-50"
              >Cancel</button>
              <button
                type="button"
                onClick={() => handlerChapter('saveChapter')}
                className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium"
              >Add chapter</button>
            </div>

          </div>
        </div>
      )}

      {/* ── ADD LECTURE POPUP ── */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 flex flex-col gap-3 shadow-lg">

            <div className="flex justify-between items-center">
              <h2 className="font-medium text-base">Add lecture</h2>
              <button
                type="button"
                onClick={() => handlerLecture('cancel')}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >✕</button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Lecture title</label>
              <input
                autoFocus
                placeholder="e.g. What is React?"
                value={lectureDetails.lectureTitle}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                className="border px-3 py-2 rounded-lg text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Duration</label>
              <input
                placeholder="e.g. 10:00"
                value={lectureDetails.lectureDuration}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                className="border px-3 py-2 rounded-lg text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Video URL</label>
              <input
                placeholder="https://..."
                value={lectureDetails.lectureUrl}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                className="border px-3 py-2 rounded-lg text-sm outline-none focus:border-gray-400"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={lectureDetails.ispreviewFree}
                onChange={e => setLectureDetails({ ...lectureDetails, ispreviewFree: e.target.checked })}
              />
              Free preview
            </label>

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => handlerLecture('cancel')}
                className="flex-1 border py-2 rounded-lg text-sm hover:bg-gray-50"
              >Cancel</button>
              <button
                type="button"
                onClick={() => handlerLecture('save')}
                className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium"
              >Save</button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AddCourse