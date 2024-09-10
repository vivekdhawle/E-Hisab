import { useState } from 'react';
import { logine,logoute } from '../store/authSlice';
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router';

function Login() {
  const [username,setUsername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const formData=new FormData()
    formData.append("username",username)
 
    formData.append("email",email)
    formData.append("password",password)

    try {
      const response = await fetch("api/v1/users/login", {
        method: "POST",
        body: formData,
      });
  
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      if(result.message=="user logged in"){
        const userData={
          _id:result.data.user._id,
          username:username,
          email:email,
          password:password,
         
        }
        dispatch(logoute())
        dispatch(logine({userData}))
        navigate("/main/retrive")
      }
      // Handle the result data
      console.log(result);

      
  
      // You can set this result to state or perform other actions
      // Example: setUser(result.user);
  
    } catch (error) {
      // Handle errors (e.g., network issues or server errors)
      console.error("Error:", error);
    }

  }
  
  return (
   <>
     
     
        <form onSubmit={(e)=>{handleSubmit(e)}} className="flex flex-col mt-20 gap-5 text-white">
            
            <span className='flex flex-row gap-5'>
            <span className='flex flex-col gap-5'>
            <label htmlFor="">Username  :</label>
            
            <label htmlFor="email">Email  :</label>
            <label htmlFor="password">Password  :</label>
            </span>

            <span className='flex flex-col gap-5 ml-4'>
            <input type="text" id='username' name='username' className='text-center px-2 border-2 rounded-lg border-green-400 bg-gray-900 focus:border-slate-100  outline-none box-border ' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" id='email' name='email' className=' text-center px-2 border-2 rounded-lg border-green-400 bg-gray-900 focus:border-slate-100  outline-none 'value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input type="text" id='password' name='password' className='text-center px-2 border-2 rounded-lg border-green-400 bg-gray-900 focus:border-slate-100   outline-none 'value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </span>
            </span>

               
            <button type='submit' className='m-11 text-2xl bg-green-400 rounded-2xl pt-1 pb-1 w-36 hover:scale-110 box-border h-10 relative left-10'>Login</button>
        </form>
          
   </>
  );
}

export default Login;
