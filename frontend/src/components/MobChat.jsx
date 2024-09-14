import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Messages from './Messages'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowLeftIcon, Send, SmileIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '@/redux/chatSlice'
import axios from 'axios'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const MobChat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [textMessage, setTextMessage] = useState("")
  const [showEmoji, setShowEmoji] = useState(false)

  const { selectedUser } = useSelector(store => store.auth)
  const { messages } = useSelector(store => store.chat)
  console.log("selectedUser", selectedUser);


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
  // Handle emoji selection
  const addEmoji = (emoji) => {
    setTextMessage(textMessage + emoji.native);
    setShowEmoji(false)
  };
  return (
    <div className='mt-16 md:hidden overflow-y-auto '>
      <section className='md:flex-1 md:border-l border-l-gray-300 lg:flex flex-col h-full  '>
        <div className='flex gap-3 items-center px-3 py-3 border-b border-gray-800 fixed z-50 top-0 bg-gray-950 w-full'>
          <ArrowLeftIcon onClick={() => navigate('/chat')} className='text-white'/>
          <Avatar>
            <AvatarImage src={selectedUser?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-white'>{selectedUser?.username}</span>
          </div>
        </div>
        <Messages selectedUser={selectedUser} />
        <div className='flex items-center fixed bottom-0 z-50 w-full p-4 border-t bg-gray-950  border-gray-800'>
          <span onClick={() => setShowEmoji(!showEmoji)} className='mr-2 text-white'><SmileIcon /></span>
          {
            showEmoji && <div className='absolute bottom-20 left-0'>

              <Picker data={data} onEmojiSelect={addEmoji} />

            </div>
          }

          <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='text-white flex-1 mr-2 focus-visible:ring-transparent bg-gray-800 ' placeholder="Messages..." />
          <Button variant={'secondary'} onClick={() => sendMessageHandler(selectedUser?._id)} className="bg-blue-500 text-white"><Send width={23}/></Button>
        </div>
      </section>
    </div>
  )
}

export default MobChat
