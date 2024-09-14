// import { setPosts } from "@/redux/postSlice";
import { setStories } from "@/redux/storySlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const useGetAllStories = () => {
    const dispatch = useDispatch()
    const {stories} = useSelector(store=>store.story)
    useEffect(()=>{
        const fetchAllStories = async () => {
            try {
                const res = await axios.get('https://insta-clone-fvrx.onrender.com/api/v1/story/stories', {withCredentials:true});
                if(res.data.success){
                 dispatch(setStories(res.data.stories))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllStories()
    },[stories])
};

export default useGetAllStories;