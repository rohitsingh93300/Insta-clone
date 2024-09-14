import { Home, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CreatePost from './CreatePost'
// import Home from './Home'

const BottomBar = () => {
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const bottomBarHandler = (textType) => {
        if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`)
        } else if (textType === "Home") {
            navigate('/')
        } else if (textType === "Explore") {
            navigate('/reels')
        } else if (textType === "Search"){
            navigate('/explore')
        }
    }

    const bottomBarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <PlusSquare />, text: "Create" },
        { icon: <TrendingUp />, text: "Explore" },

        {
            icon: (
                <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ), text: "Profile"
        },


    ]


    return (
        <div className='md:hidden fixed z-50 bottom-0 border-t border-gray-800 bg-black w-full px-5 py-3'>
            <div className='flex justify-between'>
                {
                    bottomBarItems.map((item, index) => {
                        return (
                            <div key={index} onClick={() => bottomBarHandler(item.text)} className="w-7 h-7 text-white">{item.icon}</div>
                        )
                    })
                }
            </div>
            <CreatePost open={open} setOpen={setOpen}/>
        </div>
    )
}

export default BottomBar
