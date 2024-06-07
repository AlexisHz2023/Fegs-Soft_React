import React, { useState } from 'react'
import { ImExit } from "react-icons/im";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import Registro from './Registro';



const Menu = () => {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
      // Limpiar la sesión o token de autenticación (ejemplo: eliminar una cookie)
      // Aquí puedes agregar la lógica para limpiar la sesión
      // Por ejemplo, eliminando un token de autenticación almacenado en el almacenamiento local
      // localStorage.removeItem('token');
      
      // Redireccionar a la página de inicio de sesión
      history.push('/login');
  };

    return (
        <div className='bg-white py-5 fixed rounded-lg left-20 right-0 w-[90%] border-blue-400 top-7 shadow-md z-20 border-2 ' >
           <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        <button className='ml-4 relative text-blue-500 ' onClick={() => setOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg><Registro /><h1 className='fixed text-5xl top-10 text- left-[40%]'>Administrador</h1>  
        </button>

      
  
        
        <div className={`${open ? "w-80" : "w-14 bg-white" }  shadow-gray-700/50 shadow-lg z-20  bg-blue-500 border-2 border-primary   h-[75%]  rounded-xl fixed top-32 left-14 transition-all duration-300`}>
          <div className={`${!open && "hidden"} pt-3`}>
            <button className='ml-4 text-white z-20 mb-14' onClick={() => setOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 rounded-lg right-7 h-6 z-20 relative bg-primary ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className='bg-white relative h-28 rounded-lg   -top-[92px]'>
            <img src="./imagenes/adminLogo.PNG" className='w-20  h10 relative left-10 top-7' /> 
            <h1 className='text-primary left-40 text-3xl relative'>Menú</h1>

            </div>

            
           
   
            <div className='text-center text-white text-xl hover:bg-blue-400 cursor-pointer py-0.5 -top-14 relative mb-2 '><IoMdHome className='relative w-10 h-10 left-12 top-4'/><Link
            to="/Home"
            ><p className='relative -top-4'>Inicio</p>
            </Link></div>
            <div className='text-center text-white text-xl hover:bg-blue-400 cursor-pointer py-0.5 -top-14 relative mb-2'><FaUsersGear  className='relative w-10 h-10 left-12 top-4'/><Link
            to="/Admin"
            ><p className='relative -top-4'>Usuarios</p></Link></div>
            <div className='text-center text-white text-xl hover:bg-blue-400 cursor-pointer py-0.5 -top-14 relative  mb-2'><IoSettingsOutline className='relative w-10 h-10 left-12 top-4'/><Link
            to="/Ajustes"
            ><p className='relative -top-4'>Ajustes</p>
            </Link></div>
           
            <div className='text-center text-white text-xl hover:bg-blue-400 cursor-pointer py-0.5 mb-2 -top-14 relative'><ImExit className='relative w-10 h-10 left-12 top-4'/><Link 
            to="/"
            ><p onClick={handleLogout} className='relative -top-4'>Salir</p></Link></div>

  
            
          </div>
        </div>
         </div>

    )
  }

export default Menu
