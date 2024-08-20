import { Link } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from './authcontext';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { AiFillBell } from "react-icons/ai";
import {Badge, Button} from "@nextui-org/react";
import { FaMoneyBillTransfer } from "react-icons/fa6";




const MenuAsesora = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  const { logout } = useAuth();
  const navigate = useNavigate();

   const toggleMenu = () => {
     setIsOpen(!isOpen);
   };


   const handleLogout = () => {
    logout();
    navigate("/");
    
  }

  return (
   <div className="relative">
   <nav className="fixed top-10 z-50 w-[90%] h-20 px-11 right-[5%] shadow-md rounded-lg border-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
     <div className="px-3 py-3 lg:px-5 lg:pl-3">
       <div className="flex items-center justify-between">
         <div className="flex items-center justify-start rtl:justify-end">
           <button 
             onClick={toggleMenu}
             aria-controls="logo-sidebar"
             type="button"
             className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
           >
             <span className="sr-only">Open sidebar</span>
             <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
             </svg>
           </button>
           <Link to="/asesora" className="flex ms-2 md:me-24">
             <img src="./imagenes/adminLogo.PNG" className="h-10 me-3 relative -top-2 right-8" alt="FlowBite Logo" />
             <span className="self-center text-xl font-semibold sm:text-3xl whitespace -top-1 relative text-primary">Bienvenido!</span>
           </Link>
           

           <div className='flex items-center text-primary gap-4 z-10 fixed  left-[35%] rounded-lg px-9 py-3 top-12'>
        <Dropdown placement="bottom-start">
          <DropdownTrigger className='bg-primary '>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                color: "primary",
                src: "",
              }}
              className="transition-transform "
              description={user.Correo}
              name={user.Nombre}
            />
          
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Registrado Como</p>
              <p className="font-bold">@{user.Correo}</p>
            </DropdownItem>
            
           
            
          </DropdownMenu>
        </Dropdown>
      </div>





           <div className="relative  -left-[20%] -top-1  text-primary  py-2 px-10  rounded-lg">
      <Badge content="99+" shape="circle" color="danger">
      <Button
        radius="full"
        isIconOnly
        aria-label="more than 99 notifications"
        variant="light"
        className="realtive left-10 z-40 "
      >
        <AiFillBell  className="w-10 h-10 text-primary left-0 relative z-40 "/>
      </Button>
    </Badge>
        
      
      <Dropdown placement="bottom-start ">
          <DropdownTrigger className='bg-primary py-30 relative ' >
            <User
              
              className="transition-transform "
              name="Notificaciones"
              
              
            />
          
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Actualizate de informacion</p>
              <p className="font-bold">{user.Nombre}!</p>
            </DropdownItem>
          
            
           
            <DropdownItem key="system">No tienes notificaciones</DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
        </div>
         </div>
       </div>
     </div>
   </nav>
   <aside 
     id="logo-sidebar" 
     className={`fixed top-28 border-primary rounded-2xl left-[3%] z-40 w-64 h-[70%] pt-20 transition-transform ${
       isOpen ? 'translate-x-0' : '-translate-x-full'
     } bg-white border-r sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} 
     aria-label="Sidebar"
   >
     <div className="h-full px-3 pb-4 relative overflow-y-auto bg-white dark:bg-gray-800">
       <ul className="space-y-2 font-medium">
         <li>
           <Link to="/asesora" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
               <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
               <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
             </svg>
             <span className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Inicio</span>
           </Link>
         </li>
         <li>
           <Link to="/asociado" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
               <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
             </svg>
             <span className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Asociados</span>
           </Link>
         </li>
         <li>
           <Link to="/Beneficios" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
               <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
             </svg>
             <span className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Beneficios</span>
           </Link>
         </li>
         <li>
           <Link to="/Movimientos" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <svg className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
             <FaMoneyBillTransfer />
             </svg>
             <span className="block px-1 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Movimientos</span>
           </Link>
         </li>
         <li>
           <Link to="/"
           onClick={handleLogout}
           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
             <span 
             className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Salir</span>
           </Link>
         </li>
         
       </ul>
     </div>
   </aside>
 </div>
    
  



   
  );
};

export default MenuAsesora;