import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
 import { useAuth } from "./authcontext";
  import { useNavigate } from 'react-router-dom';
import { GiConsoleController } from 'react-icons/gi';

const VerSaldo = () => {


  const { logout, user } = useAuth();
  const navigate = useNavigate();


  const [valoresList, setValores] = useState([]);

  console.log(user.id)
  console.log(user.Nombre)

  useEffect(() => {
    if (user && user.id) {
      getObligatorios(user.id);
    }
  }, [user]);

  const getObligatorios = () => {
    console.log("aqui")
    Axios.get(`http://localhost:3001/obligatorios/${user.id}`)
      .then((response) => {
        const valor = response.data.map((valores) => {
          console.log("paso aqui")
          return {
            ...valores,
          };
        });
        setValores(valor);
      })
      .catch((error) => {
        console.error("Error al obtener valores:", error);
      });
  };

  


  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });




  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Contenido del PDF", 10, 10 ,10); 
    doc.autoTable({ html: '#tabla' }); 
    doc.save("archivo.pdf");
  };


 {     
  return (
    <div className="absolted">
      <div className="bg-white w-[95%] z-20 h-[95%] border-2 border-blue-400 right-[2%] top-5 rounded-lg absolute overflow-hidden overflow-x-hidden print:hidden-scroll">
        <h1 className="relative text-center text-4xl top-20">
          Estado De Cuenta
        </h1>
        <h2 className="relative text-center text-2xl top-24">CEDULA:  </h2>
        <h2 className="relative text-center text-2xl top-28">NOMBRE:</h2>
        <h2 className="relative text-center text-2xl top-32">FINCA:</h2>
        <img className="relative w-60 left-14 max-w-full h-auto" src="./imagenes/Logo.PNG" alt="" />
        

        <table class="border-separate border-spacing-2 border border-slate-500 relative left-[20%] top-[14%] rounded-lg w-[30%]">
          <thead>
            <tr>
              <th class="border-none rounded border-slate-600 bg-orange-300 text-black ">Fecha</th>
              <th class="border-none border-slate-600 bg-orange-300 text-black rounded">Creditos</th>
              <th class="border-none border-slate-600  bg-orange-300 text-black rounded">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-none text-center border-slate-700 ">10/08/2023</td>
              <td class="border-none text-center border-slate-700 ...">Rotativo</td>
              <td class="border-none text-center border-slate-700 ...">$000</td>
            </tr>
            <tr>
              <td class="border-none text-center border-slate-700 ...">11/08/2023</td>
              <td class="border-none text-center border-slate-700 ...">SEC</td>
              <td class="border-none text-center border-slate-700 ...">000</td>
            </tr>
            <tr>
              <td class="border-none text-center border-slate-700 ...">12/08/2023</td>
              <td class="border-none text-center border-slate-700 ...">Novedades varias</td>
              <td class="border-none text-center border-slate-700 ...">$000</td>
            </tr>
            <tr>
              <td class="border-none text-center border-slate-700 ...">12/08/2023</td>
              <td class="border-none text-center border-slate-700 ...">Compra de cartera</td>
              <td class="border-none text-center border-slate-700 ...">$000</td>
            </tr>
            <tr>
              <td class="border-none text-center rounded border-slate-700 bg-blue-300 text-black">12/08/2023</td>
              <td class="border-none rounded text-center border-slate-700 bg-blue-300 text-black">Total ahorro voluntario</td>
              <td class="border-none text-center rounded border-slate-700 bg-blue-300 text-black">$000</td>
            </tr>
          </tbody>
        </table>

        <table class="border-separate border-spacing-2 border border-slate-500 relative left-[55%] -top-[15%] w-[30%] rounded-lg">
          <thead>
            <tr>
              <th class="border-none border-slate-600 bg-orange-300 text-black rounded">Fecha</th>
              <th class="border-none border-slate-600 bg-orange-300 text-black rounded">Ahorros Voluntarios</th>
              <th class="border-none border-slate-600 bg-orange-300 text-black rounded">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-none text-center border-slate-700 ...">10/08/2023</td>
              <td class="border border-none text-center border-slate-700 ...">A la vista</td>
              <td class="border border-none text-center border-slate-700 ...">$000</td>
            </tr>
            <tr>
              <td class="border border-none text-center border-slate-700 ...">11/08/2023</td>
              <td class="border border-none text-center border-slate-700 ...">Programado</td>
              <td class="border border-none text-center border-slate-700 ...">000</td>
            </tr>
            <tr>
              <td class="border border-none text-center border-slate-700 ...">12/08/2023</td>
              <td class="border border-none text-center border-slate-700 ...">Vacacional</td>
              <td class="border border-none text-center border-slate-700 ...">$000</td>
            </tr>
            <tr>
              <td class="border border-none text-center border-slate-700 ...">12/08/2023</td>
              <td class="border border-none text-center border-slate-700 ...">Previo de vivienda</td>
              <td class="border border-none text-center border-slate-700 ...">$000</td>
            </tr>
            <tr>
              <td class=" border-none text-center rounded border-slate-700 bg-blue-300 text-black">12/08/2023</td>
              <td class="border-none text-center rounded border-slate-700 bg-blue-300 text-black">Total</td>
              <td class="border-none text-center rounded border-slate-700 bg-blue-300 text-black">$000</td>
            </tr>
          </tbody>
        </table>
         <table class="border-separate border-spacing-2 border border-slate-500 left-[35%] -top-20 relative rounded-lg w-[30%]">
          <thead>
            <tr>
              <th class="border-none text-center border-slate-600 bg-orange-300 text-black rounded">Fecha</th>
              <th class="border-none text-center border-slate-600 bg-orange-300 text-black rounded">Ahorros Voluntario</th>
              <th class="border-none text-center border-slate-600 bg-orange-300 text-black rounded">Saldo</th>
            </tr>
          </thead>
          <tbody>
          {valoresList.map((val, key) => (
            <tr key={val.idobligatorio}>
              <tr>
              <td className="border border-none text-center border-slate-700 ...">10/08/2023</td>
              <td className="border border-none text-center border-slate-700 ...">Ahorros ordinarios</td>
              <td className="border border-none text-center border-slate-700 ...">{(val.ahorro_ordinario)}</td>
              </tr>
            <tr>
              <td className="border border-none text-center border-slate-700 ...">11/08/2023</td>
              <td className="border border-none text-center border-slate-700 ...">Ahorro permanente</td>
              <td className="border border-none text-center border-slate-700 ...">{val.ahorro_permanente}</td>
            </tr>
            <tr>
              <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">12/08/2023</td>
              <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">Total ahorros obligatorios</td>
              <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">{val.ahorro_ordinario+val.ahorro_permanente}</td>
            </tr>
            </tr>
            ))}
          </tbody>
        </table>
        <div className="relative -top-[89%] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-0 left-[86%] print:hidden">
        <Link onClick={handleLogout}
        className="relative py-3 px-6 bg-blue-400 hover:bg-orange-300 text-white  rounded-md border-blue-400 left-[70%] "
        to="/"
        >Volver</Link>
        </div>
      </div>
    </div>
  );
};
};


export default VerSaldo;
