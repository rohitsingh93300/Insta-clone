import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Signup = () => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""

    })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(store=>store.auth)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        console.log(input);
        try {
            setLoading(true)
            const res = await axios.post('https://insta-clone-fvrx.onrender.com/api/v1/user/register', input, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res?.data?.success){
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
           
            
        }finally {
            setLoading(false)
        }
        
    }
    useEffect(()=>{
        if(user){
          navigate("/");
        }
      },[])
    return (
        <div className='w-full '> 
            <div className='flex gap-10 items-center bg-gray-50 h-screen'>
                <div className='w-full h-screen bg-gray-600  hidden lg:block '>
                    <img src='/Signup.png' className='w-full' />
                    {/* <img src="/Logo.png" className='w-56 mb-3' />
                <p className='text-xl'>Share and discover moments with friends, where each photo and video provides a unique and temporary experience in social media..</p> */}
                </div>
                <div className="lg:w-1/2">

                    <form onSubmit={signupHandler} className='shadow-lg shadow-gray-400  flex flex-col gap-5 my-10 lg:mr-10 m-4 p-8'>
                        <div className='my-4 flex flex-col items-center '>
                            <img src="/Instagram-Logo.png" className='w-40' />
                            {/* <h1 className='font-bold text-4xl mb-2'>Logo</h1> */}
                            <p className='text-sm -mt-5'>Share and discover moments with friends.</p>
                        </div>
                        <div className='flex gap-5 items-center'>
                            <div className=''>
                                <Label>First Name</Label>
                                <Input
                                    type="text"
                                    name="firstname"
                                    value={input.firstname}
                                    onChange={changeEventHandler}
                                    placeholder="First name"
                                    className="focus-visible:ring-transparent"
                                />
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastname"
                                    value={input.lastname}
                                    onChange={changeEventHandler}
                                    placeholder="Last name"
                                    className="focus-visible:ring-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Userame</Label>
                            <Input
                                type="text"
                                name="username"
                                value={input.username}
                                onChange={changeEventHandler}
                                placeholder="Username"
                                className="focus-visible:ring-transparent"
                            />
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
                            loading ? <Button type='submit' className="bg-pink-700"><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> : <Button type='submit' className="bg-[#e1066a] hover:bg-pink-700">Signup</Button>
                        }
                    
                    <p>Already have an account? <Link className='text-pink-700' to='/login'>Login here</Link></p>

                    </form>
                </div>



            </div>
        </div>

    )
}

export default Signup
