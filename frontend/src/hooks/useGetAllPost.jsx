import { setPosts } from "@/redux/postSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const useGetAllPost = () => {
    const dispatch = useDispatch()
    const {posts} = useSelector(store=>store.post)
    useEffect(()=>{
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('https://insta-clone-fvrx.onrender.com/api/v1/post/all', {withCredentials:true});
                if(res.data.success){
                  dispatch(setPosts(res.data.posts))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllPost()
    },[posts])
};

export default useGetAllPost;