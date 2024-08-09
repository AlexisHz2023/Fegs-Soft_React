import React from "react";
import { toast } from "react-toastify";





const Ejemplo = () => {
  const notify = () => toast("esta es la alerta");

  return (
    <div>
    <button onClick={notify}>Bienvenido</button>
    <toast />
  </div>
  )
}

export default Ejemplo
