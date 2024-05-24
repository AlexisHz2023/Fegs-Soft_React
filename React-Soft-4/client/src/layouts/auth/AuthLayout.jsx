import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='max-h-screen flex items-center justify-center bg-gray-200 p-6 overflow-hidden'>
    <Outlet />
      
      <div className='relative -top-[20rem] -left-[31%]'>

        <div className=" w-[550px] h-[550px] bg-tertiary absolute -top-[280px] right-0 rounded-full -left-[300px] z-0" ></div>
        <div className="absolute -top-[200px] w-[400px] h-[400px] right-0  -left-[235px] bg-secondary rounded-full"></div>
        <div className="absolute -top-[160px] -left-[200px] w-[300px] h-[300px] bg-primary rounded-full"></div> 
        </div>

        <div className="relative -top-[30px] left-[450px]">

        <div className="w-[600px] h-[600px] bg-tertiary rounded-full overflow-visible relative bottom-0 -right-[350px] top-[600px]" ></div>
        <div className=" w-[450px] h-[450px] bg-secondary rounded-full relative bottom-0 -right-[430px] top-[5rem]">

        </div>
        <div className="absolute w-[290px] h-[290px] top-[48rem] left-[33rem]  bg-primary rounded-full"></div>    
   

    </div>






    </div>

  );
}

export default AuthLayout
