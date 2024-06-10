import React, { useState } from "react";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { RiEyeLine, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Input} from "@nextui-org/react";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const variants = [ "underlined"];

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-center",
        theme: "light",
      });
      return;
    }
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres", {
        theme: "light",
        position: "top-center",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password
      });

      console.log(response.data)
      
      const rol = response.data.rol
      if (10>1) { // Suponiendo que el rol viene en la respuesta del backend
        if (rol === 1) {
          navigate("/Home");
        } else if (rol === 2) {
          navigate("/Asesora");
        }else if (rol === 3) {
          navigate("/VerSaldo");
        } else {
          // Si el rol no es ninguno de los esperados, manejarlo de acuerdo a tus necesidades
          toast.error("Rol de usuario desconocido", {
            theme: "light",
            position: "top-center",
          });
        }
      } else {
        toast.error("Credenciales incorrectas", {
          theme: "light",
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión", {
        theme: "light",
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <div className="absolute items-center justify-center bg-white p-10 top-[5%] rounded-l-lg w-full h-[85%] right-[60%] md:w-[500px] shadow-2xl z-10">
        <div className="mb-[310px]">
          <h1 className="text-3xl uppercase font-bold text-center top-10 text-primary relative">
            Iniciar sesión
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <div className="relative top-5">
            <MdOutlineEmail className="absolute -left-0 z-10 -translate-y-3/4 w-7 h-7 text-gray-500 -top-[320%]" />
            <div className="flex flex-col gap-4 -top-56 relative">
            {variants.map((variant) => (
        <div key={variant} className="flex w-[90%] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 left-10 relative"> 
          <Input 
          type="email" 
          variant={variant} 
          label="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ))}  
              
            </div>
            
          </div>

          <div className="relative top-5">
            <MdLockOutline className="absolute -left-0 z-10 -translate-y-3/4 w-7 h-7 text-gray-500 -top-[320%]" />
            <div className="flex flex-col gap-4 -top-56 relative">
            {variants.map((variant) => (
        <div key={variant} className="flex w-[90%] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 left-10 relative"> 
          <Input 
          type={showPassword ? "text" : "password"} 
          variant={variant} 
          label="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
              <RiEyeLine
                onClick={handleShowPassword}
                className="absolute right-2 -translate-y-3/4 text-gray-500 w-7 h-7 hover:text-Third hover:cursor-pointer top-10 "
              />
            ) : (
              <RiEyeOffFill
                onClick={handleShowPassword}
                className="absolute right-2 w-7 h-7 -translate-y-3/4 text-gray-500 hover:cursor-pointer hover:text-Third top-10"
              />
            )}
        </div>
      ))}  
              
            </div>
            
          </div>

          
          <div>
            <button
              onClick={handleSubmit}
              className="mt-6 bg-primary text-white w-full relative -top-44 py-2 px-6 rounded-lg hover:scale-105 transition-all"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className="text-center -top-[120px] relative">
          ¿Tienes Problemas para ingresar?{" "}
          <Link
            to="problemas"
            className="text-primary hover:text-Third font-medium"
          >
            Click Aqui
          </Link>
        </div>
        <p className="text-primary top-[90%] left-[40%] absolute text-sm text-center">
          ©Fegs-Soft2024
        </p>
      </div>
      <div className="absolute left-[40%] z-10 top-[5%] w-[55%] h-[85%] overflow-hidden bg-white rounded-r-lg">
        <img
          src="./imagenes/Logo.PNG"
          className="relative w-[20%] top-28 left-[30%] "
        />
        <img
          src="./imagenes/login.svg"
          className="relative top-32 z-20 w-[65%] left-20 "
        />
        <div className="relative -top-[16%] left-[95%]">
          <div className=" w-[120%] h-[675px] bg-dark-blue absolute -top-[280px] right-0 rounded-full -left-[300px] z-0"></div>
          <div className="absolute -top-[250px] w-[70%] h-[600px] right-0  -left-[200px] bg-dark1-blue rounded-full"></div>
          <div className="absolute -top-[160px] -left-[100px] w-[50%] h-[450px] bg-dark2-blue rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
