import React  from 'react';
import { FaCircleArrowDown } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";
import { MdImportExport } from "react-icons/md";
import { TbDatabaseImport } from "react-icons/tb";









const Saldo = () => {
  

  return (
    <div className='h-screen w-screen absolute z-10 '>
     
      <div className='bg-white w-[80rem] h-[35rem] right-40 border-2 rounded-lg border-orange-300 shadow-2xl text-center top-20 z-10 absolute overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-200   scroll-smooth overflow-x-hidden '>
        <img className='relative w-52 h-14 left-7 top-4' src="./imagenes/Logo.PNG" alt="Nuestro logo" />
        <img className='relative w-[125%] h-[125%] top-72 left-5 z-10' src="./imagenes/FondoSaldo.png" alt="" />
        <h1 className='text-4xl -top-[120%] z-20 relative text-primary '>Actualización De Cuentas</h1>

    

        <div className='relative -top-[50%] z-20 left-[15%] rounded-lg w-[25%] h-[60%] border-2 border-blue-300 hover:border-none  transition ease-in-out delay-150 bg-gray-50 hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
        <ul class="list-inside ... top-10 relative">
        <MdImportExport className='bg-orange-500 text-white rounded-full w-14 h-14 left-32 -top-5 relative' />

        <li><ImCheckmark  className='text-orange-500 left-2 top-5 relative' />5 cups chopped Porcini mushrooms</li>
        <li><ImCheckmark  className='text-orange-500 left-2 top-5 relative' />5 cups chopped Porcini mushrooms</li>
        <li><ImCheckmark  className='text-orange-500 left-2 top-5 relative' />5 cups chopped Porcini mushrooms</li>

       </ul>
        <button className='ring ring-blue-400 w-28 h-14 left-0 top-20 bg-blue-400 text-white rounded-lg ring-offset-4 relative right-60 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 z-20 hover:bg-blue-500 hover:text-2xl  duration-300'>Exportar</button></div>
         
        <div className='relative -top-[110%] z-20 left-[60%] rounded-lg w-[25%] h-[60%] border-2 border-blue-300 hover:border-none transition ease-in-out delay-150 bg-gray-50 hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
        <ul class="list-inside ... top-10 relative">
        <TbDatabaseImport   className='bg-orange-500 text-white rounded-full w-14 h-14 left-32 -top-5  relative' />

        <li><ImCheckmark  className='text-orange-500 left-2 top-5 relative' />5 cups chopped Porcini mushrooms</li>
        <li><ImCheckmark  className='text-orange-500 left-2 top-5 relative' />5 cups chopped Porcini mushrooms</li>
        <li><ImCheckmark  className='text-orange-500 left-2 top-5 relative' />5 cups chopped Porcini mushrooms</li>

       </ul>
        <button className='ring ring-blue-400 w-28 h-14 left-0 top-20 bg-blue-400 text-white rounded-lg ring-offset-4 relative right-60 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 z-20 hover:bg-blue-500 hover:text-2xl  duration-300'>Importar</button></div>

       

     
    </div>

    </div>
  )
}

export default Saldo;
