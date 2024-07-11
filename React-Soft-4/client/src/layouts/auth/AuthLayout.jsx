import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='max-h-screen flex items-center justify-center bg-gray-200 p-6 overflow-hidden'>
    <Outlet />
      
      <div className='relative -top-[20rem]  right-[32%]'>
        <div className="absolute w-[550px] h-[550px] -top-[280px] bg-tertiary rounded-full right-0  -left-[300px] z-0" ></div>
        <div className="absolute w-[400px] h-[400px] -top-[200px] bg-secondary rounded-full right-0  -left-[235px] "></div>
        <div className="absolute w-[300px] h-[300px] -top-[160px] bg-primary rounded-full -left-[200px]  "></div> 
        </div>

        <div className="relative -top-[30px] left-[30%]">

        <div className="relative w-[550px] h-[550px] top-[700px] bg-tertiary rounded-full -right-[340px]" ></div>
        <div className="relative w-[400px] h-[400px] top-[220px] bg-secondary rounded-full -right-[430px]"></div>
        <div className="relative w-[300px] h-[300px] -top-[120px] bg-primary  rounded-full  -right-[500px]"></div>    

        </div>

    </div>

  );
}

export default AuthLayout