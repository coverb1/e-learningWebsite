import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {

  const navigate = useNavigate()
  const [input, setinput] = useState(data ? data : '')

  const onsearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }

  return (
    <div>
      <form onSubmit={onsearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
        <img alt="" className='md:w-auto w-10 px-3' />

        <input src={assets.search_icon} onChange={e => setinput(e.target.value)} value={input} type="text" placeholder='Search for courses ' className='w-full h-full outline-none
        text-gray-500/80' />
        <button type='submit' className='bg-blue-500 rounded text-white md:px-10
        px-7 md:py-3 py-2 mx-1 '>Search</button>
      </form>
    </div>
  )
}

export default SearchBar