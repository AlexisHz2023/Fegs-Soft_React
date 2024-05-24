import React from 'react';
import { Button } from '@nextui-org/button'; // Importa el componente Button adecuadamente
import { Link } from "react-router-dom";
import {Image} from "@nextui-org/react";


const Error404 = () => {
  return (
    <div className='bg-gradient-to-b from-white to-gray-300'>
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Contenedor de la imagen principal */}
      <div className="mb-8"> {/* Margen inferior para separar la imagen del contenido siguiente */}
        <img
          src="./Imagenes/Logo.PNG"
          alt="Logo"
          className="max-w-full h-auto"
        />
      </div>

      {/* Contenedor de la imagen de error 404 y el botón */}
      {/* <div className="flex flex-col items-center">
        <img
          src="./Imagenes/404-drib23.gif"
          alt="ERROR 404"
          className="rounded-lg shadow-lg mb-4"
        /> */}
<div className="flex flex-col items-center">
  <Image
      isZoomed
      width={900}
      alt="ERROR 404"
      src="./Imagenes/404-drib23.gif"
      className="rounded-lg shadow-lg mb-4"
      />
      </div>

        {/* Botón debajo de la imagen de error */}
        <Link to="/Problemas">
        <Button className="transition ease-in-out delay-150 bg-blue-400 hover:-translate-y-1 hover:scale-110 hover:bg-Third duration-300">
          Regresar
        </Button>
        </Link>
      </div>
    // </div>
  );
};

export default Error404;