import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { BiSupport } from "react-icons/bi";



const Problemas = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')

  const backdrops = [ "blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  return (

    <div className='absolute'>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
    <div className='absolute w-[60rem] h-[85%] -left-[145%] rounded-lg -top-[340%] bg-white z-10 shadow-2xl'>
      <img src="./imagenes/Logo.PNG" className='w-[20%] left-5 relative top-5' />
      <img src="./imagenes/FondoSaldo.png" className='z-0' alt="" />
      <h1 className='text-3xl text-primary -top-[750%] text-center relative'>
      
       ¿Tienes Problemas Para Ingresar?</h1> 

       <div className='relative -top-[705%] bg-white left-20 rounded-lg w-[85%] h-[175%]'><p className='relative top-5 text-center text-xl'>Si presentas problemas para ingresar al sistema debes comunicarte con el administrador. Ten en cuenta tu correo y una descripción de tu problema, es necesaria para poder ayudarte.</p></div>

    </div>
  
     <div className='flex flex-wrap gap-3 text-white capitalize rounded-lg bg-primary h-12 top-60 hover:bg-blue-600 w-32 relative left-[25%] z-20'>
     <Link
      to="/"
      ><p className='relative left-7 top-2 text-2xl'>Volver</p></Link>
     </div>
    
    


     <div className="flex flex-wrap z-10 gap-3">
    {backdrops.map((b) => (
      <Button  
        key={b}
        variant="flat"
        onPress={() => handleOpen(b)}
        className="capitalize  bg-Third shadow-2xl relative z-10"
      >
        <div className='relative z-10 top-14'>{b}</div>
        <p className='relative text-2xl text-white  right-5'>Ingresa Aquí</p><BiSupport className='relative text-white w-10 h-10 right-2' />

      </Button>

    ))}  
  </div>
  <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 text-center text-Third">Envia aqui tu  solicitud de ayuda:</ModalHeader>
          <ModalBody>
            <p> 
              Ingresa tu correo y la justificacion del problema que presentas para poder solucionarlo.
            </p>
     
           
            <form action="https://formsubmit.co/alexisdurango721@gmail.com" method="POST">
              <input className='bg-slate-50 w-[75%] h-[50px] left-12 shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4' type="email" placeholder="Ingrese su correo" name="Correo" required  />
              <br />
        <textarea placeholder="Explique aqui el problema que presenta" class="Opinion"      
         name="Problema" className='resize-none  w-[100%] h-[15rem] top-10 shadow-lg left-0 border-2 shadow-blue-500/40 rounded-lg relative text-center ' rows="10" cols="20"></textarea>
          

         <input className='bg-blue-500 z-30 relative text-white w-[25%] left-40 h-[3rem] rounded-lg hover:bg-blue-700 top-12 ' type="submit" value="Enviar" onPress={onClose}  required  />
          <input type="hidden" name='_next' value="http://localhost:3000/" />
          <input type="hidden" name='_captcha' value="false" />

            </form>
          </ModalBody>
          <br />
          <br />
        </>
      )}
    </ModalContent>
  </Modal>
  </div>
  )
}

export default Problemas
