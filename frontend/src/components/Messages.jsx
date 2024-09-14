import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import useGetAllMessage from '@/hooks/useGetAllMessage'
import useGetRTM from '@/hooks/useGetRTM'

const Messages = ({ selectedUser }) => {
    useGetRTM()
    useGetAllMessage()
    const {user} = useSelector(store=>store.auth)
    const {messages} = useSelector(store=>store.chat)
    return (
        <div className='overflow-y-auto flex-1 p-4 h-screen bg-gray-950 '
        style={{ backgroundImage: "url('https://wallpapers.com/images/high/whatsapp-chat-flying-bird-vector-rfw64608p6ous6hs.webp')", backgroundSize:"cover", backgroundPosition:"center" }} //
        >
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='text-white'>{selectedUser?.firstname} {selectedUser?.lastname}</span>
                <Link to={`/profile/${selectedUser?._id}`}><Button className="h-8 my-2" variant='secondary'>view Profile</Button></Link>
                </div>
                
            </div>
            <div className='flex flex-col gap-3'>
                {

                messages?.map((msg)=>{
                    return (
                        <div className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 rounded-lg max-w-xs break break-words ${msg.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                {msg.message}
                            </div>
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}

export default Messages
