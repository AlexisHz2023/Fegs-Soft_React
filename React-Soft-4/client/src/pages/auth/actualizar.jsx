import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Actualizar = () => {
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([tipoDocumento, numeroDocumento].includes("")) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-center",
        theme: "light",
      });
      return;
    }

    if (tipoDocumento === "") {
      toast.error("Seleccione el tipo de documento", {
        position: "top-center",
        theme: "light",
      });
      return;
    }

    if (numeroDocumento.length < 10) {
      toast.warning("El número de documento debe tener al menos 10 dígitos", {
        theme: "light",
        position: "top-center"

      });
      return;
    }

    console.log("Toda la funcionalidad del login");
    navigate("/versaldo");
    
  };

  return (
    <div className='flex flex-col font-sans absolute w-[60%] bg-white h-[70%] rounded-xl right-[20%] shadow-lg shadow-gray-500/40 overflow-hidden '> 
        <img className='text-center absolute left-[25px] top-[20px] w-[18%] h-[10%]' src='../imagenes/Logo.png' alt="Logo"></img>
        
        <p className='text-center py-20 font-sans text-Third text-5xl'>Ingrese Sus Datos</p>

        <div className='text-center -top-[5%] relative'>
          <form onSubmit={handleSubmit} action='/submit' method='post'>
            <label></label>
            <br></br>
            <select
              className='bg-primary text-white w-[330px] h-[50px] rounded-lg'
              id="tipoDocumento"
              name="tipoDocumento"
              required
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option value="" disabled>Seleccione Tipo Documento</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ti">Tarjeta de Identidad</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="extranjeria">Cédula de Extranjería</option>
            </select>
            <br></br>
            <br />
            <label></label>
            <input
              className='bg-slate-50 w-[400px] h-[50px] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4 '
              type="number"
              placeholder='Numero De Documento'
              id="numeroDocumento"
              name="numeroDocumento"
              required
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
            />
          </form>
        </div>
        
        

        <button
          onClick={handleSubmit}
          className="bg-primary text-white w-[15%] h-14 left-[50%] relative top-[5%] py-4  rounded-lg hover:scale-105 transition-all hover:bg-orange-400"
        >
          Ingresar
        </button>
         
         <div className='relative z-20 left-[35%] h-14  -top-7 text-center text-white rounded-lg w-32 bg-primary hover:scale-105 transition-all hover:bg-Third'>
          <Link 
          className='relative text-center  py-4 px-6 '
          to="/eleccion"
          ><p className='-top-2 relative'>Volver</p>
          </Link>
          
         </div>
        
       
         <div className="top-3  relative">
      <svg
    preserveAspectRatio="none"
    viewBox="0 0 1200 120"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fill: '#F3B05F', width: '100%', height: 105, transform: 'rotate(180deg) scaleX(-1)' }}
  >
    <path
    d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
    opacity=".25"
  />
    <path
      d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
      opacity=".5"
    />
    <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
  </svg>
      </div>
     
      

    </div>
  )
}

export default Actualizar;