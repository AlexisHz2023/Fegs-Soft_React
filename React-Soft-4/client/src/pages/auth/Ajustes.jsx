import Menu from "./Menu";
import {Input} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import axios from 'axios';





const Ajustes = () => {

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
    <div className='absolute h-[90%] w-[95%] z-20 border-2 border-blue-400 rounded-lg bg-white'>
        <Menu />

  <div className="profile-card w-[85%] rounded-md shadow-xl overflow-hidden z-[10] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group left-[10%] top-28"
>
  <div
    className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1"
  >
    <div
      className="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-gray-200 after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-gray-200 before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300"
    >
      <svg
        className="size-36 z-40 border-4 border-gray-200 rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300"
        id="avatar"
        viewBox="0 0 61.8 61.8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g data-name="Layer 2">
          <g data-name="—ÎÓÈ 1">
            
            <circle fill="#FFFFFF" r="30.9" cy="30.9" cx="30.9"></circle>
            <path
              d="M52.797 52.701a30.896 30.896 0 0 1-44.08-.293l1.221-3.098 9.103-4.122c3.262 5.98 6.81 11.524 12.317 15.455A45.397 45.397 0 0 0 43.2 45.483l8.144 3.853z"
              fill-rule="evenodd"
              fill="#4484d4"
            ></path>
           
            <path
              d="M31.114 8.666c8.722 0 12.377 6.2 12.601 13.367.307 9.81-5.675 21.43-12.6 21.43-6.56 0-12.706-12.018-12.333-21.928.26-6.953 3.814-12.869 12.332-12.869z"
              fill-rule="evenodd"
              fill="#ffe8be"
            ></path>
           
           
            <path
              d="M24.765 42.431a14.125 14.125 0 0 0 6.463 5.236l-4.208 6.144-5.917-9.78z"
              fill-rule="evenodd"
              fill="#4484d4"
            ></path>
            <path
              d="M37.682 42.431a14.126 14.126 0 0 1-6.463 5.236l4.209 6.144 5.953-9.668z"
              fill-rule="evenodd"
              fill="#4484d4"
            ></path>
         
           
           
          </g>
        </g>
      </svg>
      <div
        className="absolute bg-tertiary z-10 size-[60%] w-full group-hover:size-[1%] group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"
      ></div>
    </div>
  </div>
  <div className="headings *:text-center *:leading-4">
    <p className="text-xl font-serif font-semibold text-Third">German Alexis</p>
    <p className="text-sm font-semibold text-primary">Administrador</p>
  </div>
  <div className="w-full items-center justify-center flex">
    <ul
      className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3"
    >
      <li className="py-2">  
       
        
        <FaUser className="w-5 h-5" />

       
        <Input
      isReadOnly
      type="text"
      id="name"
      name="name"
      label="Nombre"
      value={userData.Nombre} readOnly
      variant="bordered"
      className="max-w-xs w-64"
    />
      </li>
      <li className="py-2">  
       
         
         <MdEmail className="w-5 h-5" />

        
        <Input
        id="email"
        name="email"
      isReadOnly
      value={userData.Correo}
      type="email"
      label="Email"
      variant="bordered"
      defaultValue="alexisdurango721@gmail.com"
      className="max-w-xs w-64"
    />
      </li>
      <li className="py-2">  
       
          <g data-name="Layer 2">
          <MdOutlineDocumentScanner className="w-5 h-5" />

          </g>
      
        <Input
        id="Documento"
        name="Documento"
      isReadOnly
      type="text"
      value={userData.Documento}
      label="Documento"
      variant="bordered"
      defaultValue="1045491338"
      className="max-w-xs w-64"
    />
      </li>
      <li>
      
          <GrUserAdmin className="w-5 h-5" />


   
        <Input
      isReadOnly
      id="Rol"
      name="Rol"
      value={userData.rol}
      type="text"
      label="Rol"
      variant="bordered"
      defaultValue="administrador"
      className="max-w-xs w-64"
    />
      </li>
    </ul>
  </div>
  <hr
    className="w-full group-hover:h-5 h-3 bg-tertiary group-hover:transition-all group-hover:duration-300 transition-all duration-300"
  />
</div>
     
    </div>
  )
}

export default Ajustes
