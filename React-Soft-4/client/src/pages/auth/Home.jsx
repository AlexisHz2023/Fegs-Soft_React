
import React from "react";
import Menu from "./Menu";
import { RxUpdate } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi";
import { IoMdInformationCircle } from "react-icons/io";
import { PiSealWarningFill } from "react-icons/pi";
import { MdOutlineManageHistory } from "react-icons/md";
import { link } from "@nextui-org/theme";







const Home = () => {
  return (
    <div>
     <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2 border-blue-400  absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <Menu />
        <div className="bg-white py-24 sm:py-32  top-80 relative z-0">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img src="./imagenes/Logo2.png" className="relative left-[40%] -top-64 " />
            <img src="./imagenes/HomeAdmin.svg" className="relative -top-96 left-28" />

            <div className="relative  rounded-2xl border-2  border-gray-100 -top-80 w-[60%] h-[60%] left-[20%] shadow-2xl">
              <div className="relative w-full h-[5rem] bg-Third rounded-t-xl">
                <PiSealWarningFill className="relative text-white w-16 h-16 left-[45%] top-2 animate-pulse duration-0" />
              </div>
              <p className="relative text-center px-14 py-8 -top-2">Tu perfil como administrador te otorga acceso privilegiado para gestionar recursos,
                optimizar los procesos y liderar el buen manejo de el fondo de empleados.
                Aprovecha estas ventajas para mejorar la seguridad que como administrador se te brinda.
              </p>
            </div>
              
              <div className="flex flex-wrap justify-center items-center -top-[15rem] relative">
            <div className=" group cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700 -left-[5%]  shadow-xl">
              <div className="w-56 h-72 bg-white text-gray-800">
                <div className="flex flex-row justify-between">
                 
                    <path className="" d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
              
                  <svg className="fill-current stroke-current w-8 h-8 p-2 m-1 bg-primary text-white rounded-full" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                    <path className="svg-stroke-primary" d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
                  </svg>
                </div>
              </div>
              <div className="relative -top-20">
                <img src="./imagenes/CuadroPrincipal.svg" className="relative z-0 left-10 w-[70%] h-[70%] -top-32 text-primary"/></div>
              <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span className="text-Third font-bold text-xs">Registrar</span>
                <span className="text-gray-800 font-bold text-3xl">Nuevos Usuarios</span>
                <p className="text-neutral-800">Tendras la posibilidad de registrar ha nuevos usuarios al sistema.</p>
              </div>
            </div>

            <div className=" group cursor-pointer group overflow-hidden text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700 left-[0%]  relative shadow-xl">
              <div className="w-56 h-72 bg-white text-gray-800">
                <div className="flex flex-row justify-between">
                    <path className="" d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
                  <svg className="fill-current stroke-current w-8 h-8 p-2 m-1 bg-primary text-white rounded-full" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                    <path className="svg-stroke-primary" d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
                  </svg>
                </div>
              </div>
              <div className="relative -top-20"><img src="./imagenes/Cuadro3.svg" className="relative z-0 left-14 w-28 h-24 -top-32 text-primary"/></div>
              <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span className="text-Third font-bold text-xs">Actualizar</span>
                <span className="text-gray-800 font-bold text-3xl">Información del Usuario</span>
                <p className="text-neutral-800">Puedes modificar informacion del usuario en cualquier momento.</p>
              </div>
            </div>


            <div className="group cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700 left-[5%] shadow-xl">
              <div className="w-56 h-72 bg-white text-gray-800">
                <div className="flex flex-row justify-between">
                  
                    <path className="" d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
          
                  <svg className="fill-current stroke-current w-8 h-8 p-2 m-1 bg-primary text-white rounded-full" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                    <path className="svg-stroke-primary" d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
                  </svg>
                </div>
              </div>
              <div className="relative -top-20"><img src="./imagenes/Cuadro2.svg" className="relative z-0 left-14 w-28 h-24 -top-32 text-primary"/></div>
              <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span className="text-Third font-bold text-xs">Informacion</span>
                <span className="text-gray-800 font-bold text-3xl">eliminar información</span>
                <p className="text-neutral-800">Puedes editar y eliminar informacion del usuario en cualquier momento.</p>
              </div>
            </div>


            <div className="group cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700 left-[10%]  shadow-xl">
              <div className="w-56 h-72 bg-white text-gray-800">
                <div className="flex flex-row justify-between">
                    <path className="" d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
                  <svg className="fill-current stroke-current w-8 h-8 p-2 m-1 rounded-full bg-primary text-white" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                    <path className="svg-stroke-primary" d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                    </path>
                  </svg>
                </div>
              </div>
              <div className="relative -top-20"><img src="./imagenes/Cuadro1.svg" className="relative z-0 left-14 w-28 h-24 -top-32 text-primary"/></div>
              <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                <span className="text-Third font-bold text-xs">Gestión</span>
                <span className="text-gray-800 font-bold text-3xl">Gestiona a los usuarios</span>
                <p className="text-neutral-800">Con Opciones para gestionar los procesos que quieren hacer los usuarios.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
