import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts } from '@/redux/postSlice'

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("")
    const { selectedPost, posts } = useSelector(store => store.post)
    const [comment, setComment] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedPost) {
            setComment(selectedPost.comments)
        }
    }, [selectedPost])

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText("")
        }
    }

    const sendMessageHandler = async () => {
        try {
            const res = await axios.post(`https://insta-clone-fvrx.onrender.com/api/v1/post/${selectedPost?._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData))
                toast.success(res.data.message)
                setText("")
            }
        } catch (error) {

        }
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex-col rounded-lg bg-gray-950">
                <div className='flex flex-col md:flex-row md:flex-1'>

                    <div className='flex items-center justify-between md:hidden p-4'>
                        <div className='flex gap-3 items-center'>

                            <Link>
                                <Avatar>
                                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <Link className='font-semibold text-xs text-white'>{selectedPost?.author?.username}</Link>
                                {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                            </div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <MoreHorizontal className='cursor-pointer text-white' />
                            </DialogTrigger>
                            <DialogContent className="flex flex-col items-center text-sm text-center">
                                <div className='cursor-pointer w-full text-[#ed4956] font-bold'>
                                    Unfollow
                                </div>
                                <div className='cursor-pointer w-full'>Add to favouraite</div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className='md:w-1/2'>
                        <img className='w-full h-full object-cover rounded-lg' src={selectedPost?.image}

                        />

                    </div>
                    <div className='w-1/2 md:flex flex-col justify-between hidden'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex gap-3 items-center'>

                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.author?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs text-white'>{selectedPost?.author?.username}</Link>
                                    {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer text-white' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className='cursor-pointer w-full text-[#ed4956] font-bold'>
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full'>Add to favouraite</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {
                                comment.map((comment) => <Comment key={comment?._id} comment={comment} />)
                            }
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input value={text} onChange={changeEventHandler} type="text" placeholder='Add a comment...' className='w-full bg-gray-800 text-white outline-none border border-gray-300 p-2 rounded' />
                                <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
                            </div>
                        </div>
                    </div>
                    <div className='md:hidden'>
                         <h1 className='px-4 py-3 font-semibold md:hidden text-white'>Comments</h1>
                        <hr className='text-gray-900'/>
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {
                                comment.map((comment) => <Comment key={comment?._id} comment={comment} />)
                            }
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input value={text} onChange={changeEventHandler} type="text" placeholder='Add a comment...' className='w-full text-white bg-gray-800 outline-none border border-gray-300 p-2 rounded' />
                                <Button disabled={!text.trim()} onClick={sendMessageHandler}  className="bg-blue-500 text-white">Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>


        </Dialog>
    )
}

export default CommentDialog
