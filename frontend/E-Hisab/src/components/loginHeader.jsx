import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function LoginHeader() {
  
  
  return (
   <>
     
      <div className='bg-gray-900  w-full h-screen self-center items-center justify-center flex'>
          <div>
          <div className='text-gray-400 text-7xl text-center mb-6 border-b-4 p-4 border-green-400'>E<span className='text-green-400'>-</span>H<span className='text-green-400'>is</span>ab</div>
                <div className='flex self-center justify-center mx-5  box-border w-30 h-10 '>
                    <NavLink to="/" className={({isActive})=>`text-gray-400  text-center  ${isActive?"border-b-4 border-green-400 text-lg ":" "}   mx-4`}>Register</NavLink>
                    <NavLink to="/login" className={({isActive})=>`text-gray-400  text-center  ${isActive?"border-b-4 border-green-400 text-lg":" "}  mx-4`}>Login</NavLink>
                </div>


                <Outlet/>
          </div>
      </div>
   </>
  );
}

export default LoginHeader;
