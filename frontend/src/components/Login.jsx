import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""

    })
   const [loading, setLoading] = useState(false)
   const {user} = useSelector(store=>store.auth)
   const navigate = useNavigate()
   const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        console.log(input);
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setAuthUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }finally{
            setLoading(false)
        }
        
    }

    useEffect(()=>{
      if(user){
        navigate("/");
      }
    },[])
    return (
        <div className='w-full'> 
            <div className='flex gap-10 items-center bg-gray-50 h-screen'>
                <div className='w-full h-screen bg-gray-600 hidden lg:block '>
                    <img src='/Signup.png' className='w-full' />
                    {/* <img src="/Logo.png" className='w-56 mb-3' />
                <p className='text-xl'>Share and discover moments with friends, where each photo and video provides a unique and temporary experience in social media..</p> */}
                </div>
                <div className="lg:w-1/2 w-full">

                    <form onSubmit={signupHandler} className='shadow-lg shadow-gray-400 flex flex-col gap-5 my-10 lg:mr-10 m-4 p-8'>
                        <div className='my-4 flex flex-col items-center '>
                            <img src="/Instagram-Logo.png" className='w-40' />
                            {/* <h1 className='font-bold text-4xl mb-2'>Logo</h1> */}
                            <p className='text-sm -mt-4 '>Share and discover moments with friends.</p>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="Email"
                                className="focus-visible:ring-transparent"
                            />
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Password"
                                className="focus-visible:ring-transparent"
                            />
                        </div>
                        {
                            loading ? <Button type='submit' className="bg-pink-700"><Loader2 className='mr-2 w-4 h-4 animate-spin'/> please wait</Button> : <Button type='submit' className="bg-[#e1066a] hover:bg-pink-700">Login</Button>
                        }


                    <p>Don't have an account? <Link className='text-pink-700' to='/signup'>SignUp here</Link></p>
                    </form>
                </div>



            </div>
        </div>

    )
}

export default Login
