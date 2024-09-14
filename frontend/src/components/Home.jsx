import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
import useGetAllStories from '@/hooks/useGetAllStories'

const Home = () => {
    useGetAllPost()
    useGetAllStories()
    useGetSuggestedUsers()
    return (
        <div className='flex bg-black'>
            <div className='flex-grow bg-black'>
                <Feed />
                <Outlet />
            </div>
            <RightSidebar />
        </div>
    )
}

export default Home
