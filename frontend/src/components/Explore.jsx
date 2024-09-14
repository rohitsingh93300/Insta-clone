import { Heart, MessageCircle, Search } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Explore = () => {
    const {posts} = useSelector(store=>store.post)
  return (
    <div className='flex flex-col pt-20 pb-20 md:max-w-5xl w-full justify-center mx-auto md:pl-20 bg-black h-full md:h-full overflow-y-auto'>
      <div className='relative '>
      <input type="text" placeholder='Search' className='text-white bg-gray-800 h-10 rounded-lg pl-10 mb-3 mx-2 w-[374px] md:w-[920px] ' />
      <Search className='text-white absolute left-4 bottom-5'/>
      </div>
      <div className='grid pb-10 grid-cols-3 '>

      {
        posts?.map((post)=> {
            return <div key={post?._id}  className='relative group cursor-pointer'>
            <img  src={post?.image} alt='postimage' className='rounded-sm  w-full aspect-square object-cover' />
            <div  className='absolute inset-0 flex items-center justify-center aspect-square bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className='flex items-center text-white space-x-4'>
                <button className='flex items-center gap-2'>
                  <Heart fill='white' />
                  <span>{post?.likes?.length}</span>
                </button>
                <button className='flex items-center gap-2 '>
                  <MessageCircle fill='white' />
                  <span>{post?.comments?.length}</span>
                </button>
              </div>
            </div>
          </div>
        })
      }
      </div>
    </div>
  )
}

export default Explore



