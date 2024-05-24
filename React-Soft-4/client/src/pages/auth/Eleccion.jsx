import React from 'react'
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";





const Eleccion = () => {


  const redirigir = () => {
   


  };
  return (
    
    <div className='overflow-hidden'>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <div  className='absolute  bg-white p-10 rounded-lg w-full md:w-[55%] h-[85%] left-[5%] top-[5%] z-20 shadow-lg shadow-slate-500 overflow-hidden'  >
        <img src="./imagenes/Logo.PNG" className='w-[200px] h-[50px]'/>
        <h1 className='relative -right-[55%] text-4xl -top-[50px] text-primary'>Menú de  elección</h1>
         <img src="./imagenes/coffe.svg" className='' />
      </div>


      <div className="Tercer_Cuadro absolute z-10 bg-white top-[15%] w-[30rem] h-[65%] left-[58%] rounded-lg transition-transform ease-in-out transform-gpu hover:z-20 hover:scale-110  [#c4c4c4]]  shadow-lg shadow-slate-500 overflow-hidden">
        <h1 className='text-center text-5xl p-5 text-primary'>Bienvenido</h1>
        <p className='text-center p-7 text-3xl text-Third' >¿Qué deseas hacer el día de hoy?</p>
    <div className='p-3 relative'>

     <div className='bg-primary w-[130px] h-[120px] rounded-lg relative text-center text-white left-16 hover:bg-Third'  >
     <Link 
      to="/saldo"
      ><p className='relative top-3'>Actualizar </p>
      <GrUpdate className='py-0 relative top-7  left-12 text-center content-center text-4xl'
      /></Link>
     </div>
<div className='relative bg-primary w-[130px] left-64 text-white rounded-lg h-[120px] -top-[120px] text-center hover:bg-Third'>
<Link
     to="/actualizar"
     ><p className='relative top-3'>Ver Saldo</p>
     <TbReportMoney className='relative w-[150px] -left-2 top-6 text-5xl'/></Link>
</div>

<div className='relative bg-primary hover:bg-orange-400 w-[25%] h-[3rem] left-44 text-white rounded-lg -top-[90px] text-center hover:scale-105 transition-all'>
<Link
     to="/"
     ><p className='relative text-center top-2 text-lg'>Volver</p>
     </Link>

</div>
</div>
        
      </div>
    </div>
  )
}

export default Eleccion
