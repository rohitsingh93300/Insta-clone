import { Heart, MessageCircleCode } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const TopBar = () => {
    const { likeNotification } = useSelector(store => store.realTimeNotification)
    return (
        <div className='md:hidden fixed top-0 z-50 bg-black border-b  border-gray-800 w-full'>
            <div className='flex justify-between px-4 py-3 items-center '>
                <div>

                    <Link to={'/'}><img src="/Insta-Logo.png" className='w-32 pl-1'/></Link>
                </div>
                <div className='flex gap-4'>
                   
                    <Sheet>
                        <SheetTrigger className='relative'>
                        {
                          likeNotification.length > 0 && (<Button size="icon" className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-4 left-4">{likeNotification.length}</Button>)
                        }
                            <Heart size={'30'} className='cursor-pointer text-white' />
                            
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] bg-gray-950 text-white">
                            <div className='space-y-2'>
                                {
                                    likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                        likeNotification.map((notification) => {
                                            return (
                                                <div key={notification.userId} className='bg-gray-800 px-3 py-3 mt-5 rounded-lg flex items-center gap-2 my-2'>
                                                    <Avatar>
                                                        <AvatarImage src={notification?.userDetails?.profilePicture} />
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


                    <Link to={'/chat'}><MessageCircleCode size={'30'} className='cursor-pointer text-white' /></Link>
                </div>
            </div>

        </div>
    )
}

export default TopBar
