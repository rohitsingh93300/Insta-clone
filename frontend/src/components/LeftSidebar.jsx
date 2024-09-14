import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setSelectedUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { setSelectedPost } from '@/redux/postSlice'
// import { setSelectedPost } from '@/redux/postSlice'

const LeftSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const { likeNotification } = useSelector(store => store.realTimeNotification)

    
    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://insta-clone-fvrx.onrender.com/api/v1/user/logout', { withCredentials: true })
            if (res.data?.success) {
                navigate('/login')
                toast.success(res.data?.message)
                dispatch(setAuthUser(null))
                dispatch(setSelectedPost(null))
                dispatch(setPosts([]));
                // dispatch(setSelectedUser([]))
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }
    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`)
        } else if (textType === "Home") {
            navigate('/')
        } else if (textType === "Messages") {
            navigate('/chat')
        } else if (textType === "Explore") {
            navigate('/explore')
        } else if (textType === "Notifications"){

        }
    }


    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ), text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ]

    return (
        <div className='bg-black hidden md:block fixed top-0 z-10 left-0 px-4 border-r border-gray-800 w-[16%] h-screen '>
            <div className='flex flex-col'>
                {/* < img src='/Logo.png' className='my-8 pl-3 w-40 '/> */}
                <img src="/Insta-Logo.png" className='w-40 mt-8 pl-3 ' />
                {/* <h1 className='my-8 pl-3 w-40 font-bold text-3xl text-white '>Logo</h1> */}
                <div className=''>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative text-white hover:bg-gray-800 cursor-pointer rounded-lg p-3 my-3'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                    {
                                        item.text === "Notifications" && (
                                            <Sheet>
                                                <SheetTrigger>
                                                    
                                                      <Button size="icon" className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                                                    
                                                    
                                                </SheetTrigger>
                                                <SheetContent className="w-[400px] sm:w-[540px] bg-black text-white">
                                                    <div className='space-y-2'>
                                                        {
                                                            likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                                likeNotification.map((notification) => {
                                                                    return (
                                                                        <div key={notification.userId} className='bg-gray-100 px-3 py-3 rounded-lg flex items-center gap-2 my-2'>
                                                                            <Avatar>
                                                                                <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                                <AvatarFallback>CN</AvatarFallback>
                                                                            </Avatar>
                                                                            <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </SheetContent>
                                            </Sheet>

                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen} />

        </div>
    )

}

export default LeftSidebar
