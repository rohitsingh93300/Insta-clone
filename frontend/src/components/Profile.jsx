import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Bookmark, Grid, Heart, MessageCircle, Save, Tag, Video, VideoIcon, VideotapeIcon } from 'lucide-react';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import axios from 'axios';
import { toast } from 'sonner';
import { setAuthUser, setUserProfile } from '@/redux/authSlice';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate()
  useGetUserProfile(userId);
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = user?.following?.includes(userProfile?._id);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const followHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${userId}`, {user:user._id}, { withCredentials: true })
      if (res.data.success) {
        let updatedUserData;
        let updatedUserProfile;

        if(isFollowing){
          
          updatedUserData = {
            ...user,
            following: user?.following?.filter((id)=> id !== userId)
        };
           updatedUserProfile = {
            ...userProfile,
             followers: userProfile.followers.filter((id) => id !== user?._id)
           };
        }else {
          updatedUserData = {
            ...user,
            following: [...user?.following, userId]
          };

           updatedUserProfile = {
            ...userProfile,
             followers: [...userProfile.followers, user?._id]
           };
        }
       dispatch(setAuthUser(updatedUserData));
       dispatch(setUserProfile(updatedUserProfile))
        toast.success(res.data.message)

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }



  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='flex md:max-w-5xl w-full justify-center mx-auto md:pl-10 bg-black h-screen md:h-full'>
      <div className='flex flex-col gap-5 md:gap-20 md:p-8 md:mt-0 mt-20'>
        <div className='grid md:grid-cols-2 grid-cols-3'>
          <section className='flex flex-col items-center justify-center'>
            <Avatar className='md:h-32 md:w-32 h-20 w-20'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-semibold text-sm md:hidden text-white'>{userProfile?.firstname} {userProfile?.lastname}</h1>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span className='hidden md:block text-white'>{userProfile?.username}</span>
                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8 hidden md:block'>Edit profile</Button></Link>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8 hidden md:block'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8 hidden md:block'>Ad tools</Button>
                    </>
                  ) : (
                    isFollowing ? (
                      <>
                        <Button onClick={followHandler} variant='secondary' className='h-8 hidden md:block'>Unfollow</Button>
                        <Button variant='secondary' className='h-8 hidden md:block'>Message</Button>
                      </>
                    ) : (
                      <Button onClick={followHandler} className='bg-[#0095F6] hover:bg-[#3192d2] h-8 hidden md:block'>Follow</Button>
                    )
                  )
                }
              </div>
              <div className='flex items-center gap-4 text-center pl-5 text-white'>
                <p><span className='font-semibold '>{userProfile?.posts?.length} </span>posts</p>
                <p><span className='font-semibold'>{userProfile?.followers?.length} </span>followers</p>
                <p><span className='font-semibold'>{userProfile?.following?.length} </span>following</p>
              </div>
              <div className='md:flex flex-col gap-1 hidden text-white'>
                <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                <Badge className='w-fit' variant='secondary'><AtSign className='w-4' /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
                <span>💻Learning to code</span>
                <span>🧑‍💻Turing code into fun</span>
                <span>🤝DM for collaboration</span>
              </div>
            </div>
          </section>
        </div>
        <div className='px-4 flex flex-col gap-4 md:hidden text-white'>
          <span className='font-semibold md:hidden'>{userProfile?.bio || 'bio here...'}</span>
          {/* <span>💻Learning to code</span>
        <span>🧑‍💻Turing code into fun</span>
        <span>🤝DM for collaboration</span> */}
          {
            isLoggedInUserProfile ? (
              <>
                <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8 md:hidden '>Edit profile</Button></Link>
                <Button variant='secondary' className='hover:bg-gray-200 h-8 hidden '>View archive</Button>
                <Button variant='secondary' className='hover:bg-gray-200 h-8 hidden '>Ad tools</Button>
              </>
            ) : (
              isFollowing ? (
                <div className='w-full flex gap-4'>
                  <Button onClick={followHandler} variant='secondary' className='h-8 md:hidden'>Unfollow</Button>
                  <Button onClick={()=>navigate(`/mobchat/${userProfile?._id}`)} variant='secondary' className='h-8 md:hidden'>Message</Button>
                </div>
              ) : (
                <Button onClick={followHandler} className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
              )
            )
          }
        </div>

        <div className='border-t border-t-gray-700 text-white'>
          <div className='flex items-center justify-center gap-7 md:gap-10 text-sm mb-2'>
            <span className={`py-3 flex items-center gap-1 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              <Grid /> POSTS
            </span>
            <span className={`py-3 flex items-center gap-1 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
              <Bookmark /> SAVED
            </span>
            <span className='py-3 flex items-center gap-1 cursor-pointer'><Video /> REELS</span>
            <span className='py-3 flex items-center gap-1 cursor-pointer'><Tag />TAGS</span>
          </div>
          <div className='grid grid-cols-3 gap-1 pb-4 bg-black '>
            
            {
             displayedPost? displayedPost?.map((post) => {
                return (
                  <div key={post?._id} className='relative group cursor-pointer'>
                    <img src={post?.image} alt='postimage' className='rounded-sm  w-full aspect-square object-cover' />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
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
                )
              }) : (
                <div className='h-[500px] bg-black'></div>
              )
              
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile