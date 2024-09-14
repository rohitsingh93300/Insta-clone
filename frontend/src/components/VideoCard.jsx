import React from 'react'

const VideoCard = () => {
  return (
    <div>
      <video src='/reels.mp4'
      posterResizeMode = "cover"
      type="video/mp4"
      controls
      repeat
      paused={false}
      className='h-screen'
      />
      <h1 className='text-white'>Reels</h1>
    </div>
  )
}

export default VideoCard
