import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigationbar from './Navigationbar'

function Root() {
  return (
    <div className='mt-5 p-0 container shadow' >
        <Navigationbar />
        <Outlet />
    </div>
  )
}

export default Root