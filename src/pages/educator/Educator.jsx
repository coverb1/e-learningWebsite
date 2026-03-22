import React from 'react'
import { Outlet } from 'react-router-dom'

const Educator = () => {
  return (
    <div>
      <p>Educator Page</p>
      <div>
{<Outlet/>}
      </div>
    </div>
  )
}

export default Educator