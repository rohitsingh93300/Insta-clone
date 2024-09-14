import React from 'react'
import { Outlet } from 'react-router'
import LeftSidebar from './LeftSidebar'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

const MainLayout = () => {
  return (
    <div className='bg-black' > 
      <LeftSidebar/>
      <TopBar/>
      <BottomBar/>
      <div className='bg-black'>
        <Outlet className="bg-black" />
      </div>
    </div>
  )
}

export default MainLayout
