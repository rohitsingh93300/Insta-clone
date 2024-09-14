import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 my-8 flex flex-col items-center p-4 md:p-0 md:pl-[20%] bg-black'>
      <Posts/>
    </div>
  )
}

export default Feed
