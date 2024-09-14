import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Messages from './Messages'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SmileIcon } from 'lucide-react'

const Chat = ({ selectedUser, sendMessageHandler, textMessage, setTextMessage }) => {
    const [showEmoji, setShowEmoji] = useState(false)
    // Handle emoji selection
    const addEmoji = (emoji) => {
        setTextMessage(textMessage + emoji.native);
        setShowEmoji(false)
    };
    return (
        <section className='md:flex-1 border-l border-l-gray-800 lg:flex flex-col h-full hidden'>
            <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-800 sticky top-0 bg-gray-950 z-10'>
                <Avatar>
                    <AvatarImage src={selectedUser?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <span className='text-white'>{selectedUser?.username}</span>
                </div>
            </div>
            <Messages selectedUser={selectedUser} />
            <div className='flex items-center p-4 border-t border-t-gray-800 bg-gray-950'>
                <span onClick={() => setShowEmoji(!showEmoji)} className='mr-2 text-white'><SmileIcon /></span>
                {
                    showEmoji && <div className='absolute bottom-20 left-50'>

                        <Picker data={data} onEmojiSelect={addEmoji} />

                    </div>
                }
                <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent bg-gray-800 text-white' placeholder="Messages..." />
                <Button onClick={() => sendMessageHandler(selectedUser?._id)} className="bg-blue-500 hover:bg-blue-600">Send</Button>
            </div>
        </section>
    )
}

export default Chat
