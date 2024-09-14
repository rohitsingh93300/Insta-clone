import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { setSelectedUser } from '@/redux/authSlice'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { MessageCircleCode } from 'lucide-react'
import Messages from './Messages'
import axios from 'axios'
import { setMessages } from '@/redux/chatSlice'
// import MobChat from './MobChat'
import { useNavigate } from 'react-router'
import Chat from './Chat'

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("")
    const navigate = useNavigate()
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth)
    const { onlineUsers, messages } = useSelector(store => store.chat)

    // const isOnline = false;
    const dispatch = useDispatch()

    const sendMessageHandler = async (recieverId) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/message/send/${recieverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]))
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);

        }
    }

    // useEffect(() => {
    //     return () => {
    //         dispatch(setSelectedUser(null))
    //     }
    // },[])

    return (
        <div className='md:flex md:ml-[16%] h-screen '>
            <section className='w-full md:w-1/4 my-8 hidden md:block'>
                <h1 className='font-semibold mb-4 px-3 text-xl text-white'>{user?.username}</h1>
                <hr className='mb-4 border-gray-800 hidden md:block' />

                <div className='overflow-y-auto h-[80vh] bg-gray-950'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id)
                            return (
                                <div onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-800 rounded-lg cursor-pointer'>
                                    <Avatar className="w-14 h-14">
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium text-white'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>{isOnline ? 'online' : 'offline'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section className='w-full md:w-1/4 my-8 md:hidden bg-gray-950 h-screen'>
                <h1 className='font-semibold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300 hidden md:block' />

                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id)
                            return (
                                <div onClick={() => {dispatch(setSelectedUser(suggestedUser)); navigate(`/mobchat/${suggestedUser?._id}`)}} className='flex gap-3 items-center p-3 hover:bg-gray-800 cursor-pointer'>
                                    <Avatar className="w-14 h-14">
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium text-white'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>{isOnline ? 'online' : 'offline'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                selectedUser ? (
                    <Chat selectedUser={selectedUser} sendMessageHandler={sendMessageHandler} setTextMessage={setTextMessage} textMessage={textMessage}/>
                ) : (
                    <div className='md:flex hidden flex-col flex-1 border-l border-l-gray-300 items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium text-xl'>Your Messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    )
}
// export { sendMessageHandler}
export default ChatPage
