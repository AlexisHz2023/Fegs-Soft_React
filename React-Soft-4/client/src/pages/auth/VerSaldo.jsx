import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
 import { useAuth } from "./authcontext";
  import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';


const VerSaldo = () => {


  const { logout, user } = useAuth();
  const navigate = useNavigate();


  const [valoresList, setValores] = useState([]);
  const [voluList, setVolu] = useState([]);
  const [crediList, setCredi] = useState([]);

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

  useEffect(() => {
    if (user && user.id) {
      getVoluntarios(user.id);
    }
  }, [user]);

  const getVoluntarios = () => {
    console.log("aqui")
    Axios.get(`http://localhost:3001/voluntarios/${user.id}`)
      .then((response) => {
        const voluntarios = response.data.map((valoVolu) => {
          console.log("paso aqui")
          return {
            ...valoVolu,
          };
        });
        setVolu(voluntarios);
      })
      .catch((error) => {
        console.error("Error al obtener valores:", error);
      });
  };

  useEffect(() => {
    if (user && user.id) {
      getCreditos(user.id);
    }
  }, [user]);

  const getCreditos = () => {
    console.log("aqui")
    Axios.get(`http://localhost:3001/creditos/${user.id}`)
      .then((response) => {
        const creditos = response.data.map((valoCredi) => {
          console.log("paso aqui")
          return {
            ...valoCredi,
          };
        });
        setCredi(creditos);
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
        <h1 className="relative text-center text-4xl top-10">
          Estado De Cuenta
        </h1>
        <h2 className="relative text-center text-2xl top-14">CEDULA: {user.Documento} </h2>
        <h2 className="relative text-center text-2xl top-16">NOMBRE: {user.Nombre}</h2>
        <img className="relative w-60 left-14 max-w-full h-auto" src="./imagenes/Logo.PNG" alt="" />
        

        <table className="border-separate border-spacing-2 border border-slate-500 absolute left-[20%] top-[24%] rounded-lg w-[30%]">
    <thead>
      <tr>
        <th className="border-none rounded border-slate-600 bg-orange-300 text-black">Fecha</th>
        <th className="border-none border-slate-600 bg-orange-300 text-black rounded">Créditos</th>
        <th className="border-none border-slate-600 bg-orange-300 text-black rounded">Monto</th>
      </tr>
    </thead>
    <tbody>
      {crediList.map((val, key) => (
        <React.Fragment key={val.idcreditos}>
          <tr>
            <td className="border-none text-center border-slate-700">11/08/2023</td>
            <td className="border-none text-center border-slate-700">Rotativo</td>
            <td className="border-none text-center border-slate-700">{val.rotativo}</td>
          </tr>
          <tr>
            <td className="border-none text-center border-slate-700">11/08/2023</td>
            <td className="border-none text-center border-slate-700">SEC</td>
            <td className="border-none text-center border-slate-700">{val.sec}</td>
          </tr>
          <tr>
            <td className="border-none text-center border-slate-700">12/08/2023</td>
            <td className="border-none text-center border-slate-700">Novedades varias</td>
            <td className="border-none text-center border-slate-700">{val.novedades_varias}</td>
          </tr>
          <tr>
            <td className="border-none text-center border-slate-700">12/08/2023</td>
            <td className="border-none text-center border-slate-700">Compra de cartera</td>
            <td className="border-none text-center border-slate-700">{val.compra_cartera}</td>
          </tr>
          <tr>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">12/08/2023</td>
            <td className="border-none rounded text-center border-slate-700 bg-blue-300 text-black">Capacidad crediticia</td>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black"></td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>

  <table className="border-separate border-spacing-2 border border-slate-500 absolute left-[55%] top-[25%] w-[30%] rounded-lg">
    <thead>
      <tr>
        <th className="border-none border-slate-600 bg-orange-300 text-black rounded">Fecha</th>
        <th className="border-none border-slate-600 bg-orange-300 text-black rounded">Ahorros Voluntarios</th>
        <th className="border-none border-slate-600 bg-orange-300 text-black rounded">Monto</th>
      </tr>
    </thead>
    <tbody>
      {voluList.map((val, key) => (
        <React.Fragment key={val.idahorros}>
          <tr>
            <td className="border border-none text-center border-slate-700">10/08/2023</td>
            <td className="border border-none text-center border-slate-700">A la vista</td>
            <td className="border border-none text-center border-slate-700">{val.vista}</td>
          </tr>
          <tr>
            <td className="border border-none text-center border-slate-700">11/08/2023</td>
            <td className="border border-none text-center border-slate-700">Programado</td>
            <td className="border border-none text-center border-slate-700">{val.programado}</td>
          </tr>
          <tr>
            <td className="border border-none text-center border-slate-700">12/08/2023</td>
            <td className="border border-none text-center border-slate-700">Vacacional</td>
            <td className="border border-none text-center border-slate-700">{val.vacacional}</td>
          </tr>
          <tr>
            <td className="border border-none text-center border-slate-700">12/08/2023</td>
            <td className="border border-none text-center border-slate-700">Previo de vivienda</td>
            <td className="border border-none text-center border-slate-700">{val.previo_vivienda}</td>
          </tr>
          <tr>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">12/08/2023</td>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">Total</td>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">
              {val.vista + val.programado + val.vacacional + val.previo_vivienda}
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
  <table className="border-separate border-spacing-2 border border-slate-500 left-[35%] top-[65%] absolute rounded-lg w-[30%]">
    <thead>
      <tr>
        <th className="border-none text-center border-slate-600 bg-orange-300 text-black rounded">Fecha</th>
        <th className="border-none text-center border-slate-600 bg-orange-300 text-black rounded">Ahorros Obligatorio</th>
        <th className="border-none text-center border-slate-600 bg-orange-300 text-black rounded">Saldo</th>
      </tr>
    </thead>
    <tbody>
      {valoresList.map((val, key) => (
        <React.Fragment key={val.idobligatorio}>
          <tr>
            <td className="border border-none text-center border-slate-700">{val.fecha}</td>
            <td className="border border-none text-center border-slate-700">Ahorros ordinarios</td>
            <td className="border border-none text-center border-slate-700">{val.ahorro_ordinario}</td>
          </tr>
          <tr>
            <td className="border border-none text-center border-slate-700">{val.fecha}</td>
            <td className="border border-none text-center border-slate-700">Ahorro permanente</td>
            <td className="border border-none text-center border-slate-700">{val.ahorro_permanente}</td>
          </tr>
          <tr>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">{val.fecha}</td>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">Total ahorros obligatorios</td>
            <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">
              {val.ahorro_ordinario + val.ahorro_permanente}
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
  <div className="relative -top-[15%] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 w-auto left-[70%] print:hidden">
    <Link
      onClick={handleLogout}
      className="relative py-3 z-10 px-6 bg-blue-400 hover:bg-orange-300 text-white rounded-md border-blue-400 left-[20%]"
      to="/"
    >
      Volver
    </Link>
  </div>
      </div>
    </div>
  );
};
};


export default VerSaldo;
