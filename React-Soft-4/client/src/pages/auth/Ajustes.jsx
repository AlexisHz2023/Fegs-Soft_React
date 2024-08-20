import Menu from "./Menu";
import {Input} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "./authcontext";





const Ajustes = () => {

  const { user } = useAuth();

  const [userData, setUserData] = useState({
    Nombre: '',
    Correo: '',
    Documento: '',
    rol: ''
});

useEffect(() => {
  axios.get('http://localhost:3001/usuarios')
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error:', error));
}, []);

  return (
    
    <div className='absolute bg-white py-4 top-10 w-[95%] left-[2%] border-2 border-blue-500 z-20 h-[90%] rounded-lg overflow-hidden'>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
        <Menu />
  
  <div className="profile-card w-[85%] rounded-md shadow-xl overflow-hidden z-[10] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group left-[10%] top-28"
>
  
  <div
    className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1"
  >
    <div>
      
    <p className="text-gray-400 text-4xl">Informacion del administrador</p>
      
    </div>
  </div>
  <div className="headings *:text-center *:leading-4">
    <p className="text-2xl  font-semibold text-Third py-5 ">{user.Nombre}</p>
    <p className="text-sm font-semibold text-primary">Esta es tu información</p>
  </div>
  <div className="w-full items-center justify-center flex">
    <ul
      className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3"
    >
      <li className="py-2">  
       
        
        <FaUser className="w-5 h-5 text-primary" />

       
        <Input
      isReadOnly
      type="text"
      id="name"
      name="name"
      label="Nombre"
      value={user.Nombre} readOnly
      variant="bordered"
      className="max-w-xs w-96"
    />
      </li>
      <li className="py-5">  
       
         
         <MdEmail className="w-5 h-5 text-primary" />

        
        <Input
        id="email"
        name="email"
      isReadOnly
      value={user.Correo}
      type="email"
      label="Email"
      variant="bordered"
      className="max-w-xs w-96"
    />
      </li>
      <li className="py-5">  
       
          <g data-name="Layer 2">
          <MdOutlineDocumentScanner className="w-5 h-5 text-primary" />

          </g>
      
        <Input
        id="Documento"
        name="Documento"
      isReadOnly
      type="text"
      value={user.Documento}
      label="Documento"
      variant="bordered"
      defaultValue="1045491338"
      className="max-w-xs w-96"
    />
      </li>
      
    </ul>
  </div>
  <hr
    className="w-full group-hover:h-5 h-3 bg-Third group-hover:transition-all group-hover:duration-300 transition-all duration-300"
  />
</div>
     
    </div>
  )
}

export default Ajustes
